import express from "express";
import * as dotenv from "dotenv";
import { Configuration, OpenAIApi } from "openai";

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

router.route("/").get((req, res) => {
  res.send("Hello from DALL-E!");
});

// get the image
router.route("/dalle").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // generate image
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    // getting an image from response
    const image = aiResponse.data.data[0].b64_json;

    // sending image back to frontend
    res.status(200).json({ photo: image });
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.error.message);
  }
});

// get text data
router.route("/chatgpt").post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // generate image
    const aiResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt,
      max_tokens: 2048,
    });
    res.status(200).json(aiResponse.data.choices[0].text);
  } catch (err) {
    console.log(err);
    res.status(500).send(err?.response.data.error.message);
  }
});

export default router;
