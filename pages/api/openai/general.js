import { Configuration, OpenAIApi } from "openai";
// console.log("api exec");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { prompt } = req.body;

  const completion = await openai.createCompletion({
    model: "gpt-3.5-turbo",
    // model: "text-curie-001",
    // model: "text-ada-001",

    prompt: "hello",
    temperature: 0.7,
    max_tokens: 1500,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}
