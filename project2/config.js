import { Groq } from "groq-sdk";
import {tavily} from "@tavily/core"


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});



const tvly = tavily({ apiKey: process.env.TAVILY_API_KEY });

export {groq,tvly}