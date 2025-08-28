import { groq, tvly } from "./config.js";
import { aboutSystem, bot } from "./constant.js";

async function chat(prompt) {
  const completions = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: aboutSystem,
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    tools: [
      {
        type: "function",
        function: {
          name: "webSearch",
          description: "Search the lastest information on the internet",
          parameters: {
            type: "object",
            properties: {
              query: {
                type: "string",
                description: "The search query to perform search on.",
              },
            },
            required: ["query"],
          },
        },
      },
    ],
    tool_choice: "auto",
  });
    console.log(`You: ${prompt}`);

  const toolCalls = completions.choices[0].message.tool_calls;

  if (!toolCalls){
    console.log(`${bot}: ${completions.choices[0].message.content}`);
  }

  for (const tool of toolCalls) {
    const toolName = tool.function.name;
    const toolParams = JSON.parse(tool.function.arguments);

    if (toolName == "webSearch") {
      const response = await webSearch({ query: toolParams?.query });
      console.log(`${bot}: ${response}`);
    }
  }
}

async function webSearch({ query }) {
    try {
        const response = await tvly.search(query);
        if (!response) {
        throw new Error("Empty response from Tavily");
        }
        const resultsArray = [...response.results].map(res=>res.content);
        const [answer] = resultsArray;
        return answer;
    } catch (error) {
        console.error(error.message);
    }
}

chat("when was Iphone 16 launched ? ");