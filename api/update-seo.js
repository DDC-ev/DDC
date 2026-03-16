export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { meta_tags } = req.body;

  console.log("Received meta tags:", meta_tags);

  return res.status(200).json({
    success: true,
    message: "SEO tags received",
    meta: meta_tags
  });

}