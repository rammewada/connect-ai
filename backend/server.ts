import express, { Request, Response } from "express";

const app = express();

app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Server is healthy and running",
    status: "ok",
  });
});

app.listen(8080, () => {
  console.log("Our app is running on port  8080");
});
