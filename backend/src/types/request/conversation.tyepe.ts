import { Request } from "express";

interface ConversationRequest extends Request {
  body: {
    query: string;
  };
}

export type { ConversationRequest };
