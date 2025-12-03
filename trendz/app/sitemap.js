const server = process.env.NEXT_PUBLIC_API_URL; 
const siteUrl = "https://trendz.ng";

export default async function sitemap() {
  let posts = [];
  try {
    const res = await fetch(`${server}/api/sitemap_id`);
    posts = await res.json();
  } catch (error) {
    console.error("❌ Failed to fetch posts for sitemap:", error);
  }

  // Dynamically generated links (must link to frontend pages)
  const dynamicUrls = posts.map((post) => ({
    url: `${siteUrl}/news/${post.id}`, // 👈 actual page URL
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Static pages
  const staticUrls = [
    "",
    "/about",
    "/hotels",
    "/news",
    "/flight",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly",
    priority: 1.0,
  }));

  return [...staticUrls, ...dynamicUrls];
}
