import {Groq} from "groq-sdk"
import { aboutBot } from "./contant.js"
const groq = new Groq({
    apiKey:process.env.GROQ_API_KEY
})

async function chat(prompt) {
    const completions  =  await groq.chat.completions.create({
        model:"llama-3.3-70b-versatile",
        max_completion_tokens:300,
        temperature:0, 
        messages:[
            {
                role:"system",
                content:aboutBot, 
            },
            {
                role:"user",
                content:prompt
            }
        ]
    })
    console.log(completions.choices[0].message);
}

chat("Give me 5 jokes");