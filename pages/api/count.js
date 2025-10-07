import axios from "axios";
import * as cheerio from "cheerio";

export default async function handler(req, res) {
  const { username } = req.query;

  if (!username) {
    return res.status(400).json({ error: "Username is required" });
  }

  try {
    // Clean username (remove @)
    const cleanUser = username.replace("@", "");

    // Fetch public Nitter search page
    const url = `https://nitter.net/${cleanUser}/search?f=tweets&q=Gmonad+OR+Monad`;
    const response = await axios.get(url, { timeout: 10000 });

    // Load HTML and count tweets
    const $ = cheerio.load(response.data);
    const tweets = $(".timeline-item");
    const count = tweets.length;

    res.status(200).json({ count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Could not fetch data" });
  }
}
