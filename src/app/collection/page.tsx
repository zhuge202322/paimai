import CollectionClient from "@/components/CollectionClient";
import { getPostsByCategory } from "@/lib/api";

export const revalidate = 60; // Revalidate every minute

export default async function CollectionPage() {
  // Fetch products from the "fenlei" category
  const posts = await getPostsByCategory("fenlei", 100);

  // Transform WP posts to the Product interface expected by CollectionClient
  const products = (posts || []).map((edge: any) => {
    const p = edge.node;
    
    // Find a category that is NOT "fenlei" or "分类" to use as the display category
    const categories = p.categories?.edges?.map((c: any) => c.node.name) || [];
    const displayCategory = categories.find((c: string) => c !== "Fenlei" && c !== "分类" && c !== "Uncategorized") || "General";

    return {
      id: p.slug, // Use slug as ID
      name: p.title,
      category: displayCategory,
      collection: "The " + displayCategory + " Collection",
      image: p.featuredImage?.node?.sourceUrl || "/images/placeholder.png", 
      designer: "Casa Italia", // Default designer
    };
  });

  return <CollectionClient initialProducts={products} />;
}
