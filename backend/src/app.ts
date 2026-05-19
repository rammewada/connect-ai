import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response } from "express";
import { tavily, TavilySearchResponse } from "@tavily/core";

import { ConversationRequest } from "#types/index.js";
import { GoogleGenAI } from "@google/genai";
import { PROPT_TEMPLATE, SYSTEM_PROMPT } from "#prompt.js";

const app = express();
app.use(express.json());
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is healthy and running",
    status: "ok",
  });
});

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY,
});

app.post("/conversation", async (req: ConversationRequest, res: Response) => {
  try {
    // Step 1: Get the query from the user

    const query = req.body.query;

    //TODO: Step 2: Make sure user has access/credits to hit the query
    //TODO: Step 3: Check if we have web search index for a similar query

    // Step 4: Web search to gather sources

    const client = tavily({ apiKey: process.env.TAVILY_API_KEY });
    const webSearchResponse = await client.search(query, {
      searchDepth: "advanced",
      includeImages: true,
      country: "india",
      includeFavicon: true,
      //   startDate: "2026-04-01",
      //   endDate: "2026-05-18",
    });

    const webSearchResult = webSearchResponse.results;
    const webSearchResultFiltered = {
      images: webSearchResponse.images,
      result: webSearchResponse.results.map((item) => {
        return { title: item.title, url: item.url, favicon: item.favicon };
      }),
    };

    // Step 5:  Do some context engineeering on the prompt + web search responses
    const prompt = PROPT_TEMPLATE.replace(
      "{{WEB_SEARCH_RESULTS}}",
      JSON.stringify(webSearchResult),
    ).replace("{{USER_QUERY}}", query);

    // Step 6: Hit the llm with the prompt and get the response
    const response = await ai.models.generateContentStream({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
      },
    });

    // Step 7: Also stream back the sources and the follow up questions (which we can get from the another prallel LLM call)
    res.header("Cache-Controle", "no-cache");
    res.header("Context-Type", "text/event-stream");

    for await (const chunk of response) {
      res.write(chunk.text);
    }

    res.write("\n-----------------------SOURCE-----------------------\n");

    console.log(webSearchResultFiltered);
    res.write(JSON.stringify(webSearchResultFiltered));

    res.end();
  } catch (error: any) {
    console.error("Error processing conversation:", error);
    res.status(500).json({
      message: "An error occurred while processing the conversation",
      status: "error",
    });
  }
});

export default app;
