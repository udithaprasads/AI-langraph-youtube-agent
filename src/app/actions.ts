"use server";

import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { createReactAgent } from "@langchain/langgraph/prebuilt";
import { ChatOllama } from "@langchain/ollama";

export async function transcribe(videoUrl: string) {
  //   const agent = createReactAgent({
  //     llm: new ChatOllama({
  //       model: "deepseek-r1:7b",
  //       temperature: 0,
  //       format: "json",
  //     }),
  //     tools: [],
  //   });

  const agent = createReactAgent({
    llm: new ChatOllama({ model: "llama3.2", temperature: 0, format: "json" }),
    tools: [],
  });

  const response = await agent.invoke({
    messages: [
      new SystemMessage(`
            You're a YouTube transcription agent.
        
            You should retrieve the video id for a given YouTube url.
            Use any tool at your disposal if needed.

            Return output in the following structure:

            {
                "videoId": "ID of the video"
            }
        `),
      new HumanMessage(`Here is the YouTube URL: ${videoUrl}.`),
    ],
  });
  
  return response.messages[response.messages.length - 1].content;
}
