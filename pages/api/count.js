export default async function handler(req, res) {
  // Fake data (replace later with Twitter API if you want)
  const randomCount = Math.floor(Math.random() * 1000);
  res.status(200).json({ count: randomCount });
}
