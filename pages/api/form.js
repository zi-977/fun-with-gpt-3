import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// api endpoint for handling form input
export default async function handler(req, res) {
  const prompt = req.body.prompt;
  console.log("body.prompt", req.body)
  console.log("prompt", req.body.prompt)

  if (!prompt) {
    return res.status(400).json({ msg: 'Text not found. Please fill out the prompt field ' });
  }

  const response = await openai.createCompletion("text-curie-001", {
    prompt: prompt,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  });

  res.status(200).json({ response: response.data.choices[0].text });
}
