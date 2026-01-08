import ProjectsClient from "@/components/ProjectsClient";
import { getPostsByCategory } from "@/lib/api";

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ProjectsPage() {
  // Fetch products from the "anli" category (Projects/Case Studies)
  const posts = await getPostsByCategory("anli", 100);

  // Transform WP posts to the Product interface expected by ProjectsClient
  const products = (posts || []).map((edge: any) => {
    const p = edge.node;
    
    // Find a category that is NOT "anli" or "案例" to use as the display category (e.g. Hotel, Office)
    const categories = p.categories?.edges?.map((c: any) => c.node.name) || [];
    const displayCategory = categories.find((c: string) => c.toLowerCase() !== "anli" && c !== "案例" && c !== "Uncategorized") || "General";

    return {
      id: p.slug, // Use slug as ID
      name: p.title,
      category: displayCategory,
      collection: "The " + displayCategory + " Project",
      image: p.featuredImage?.node?.sourceUrl || "/images/placeholder.png", 
      // designer field removed
    };
  });

  return <ProjectsClient initialProducts={products} />;
}
