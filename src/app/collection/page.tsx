import CollectionHighlights from "@/components/CollectionHighlights";
import { getPostsByCategory } from "@/lib/api";

export default async function CollectionPage() {
  let products = [];
  try {
    // Fetch posts from "chanpin" category
    products = await getPostsByCategory("chanpin", 20);
  } catch (error) {
    console.error("Failed to fetch collection products", error);
  }

  return (
    <main className="min-h-screen bg-stone-50 pt-20">
      <CollectionHighlights products={products} />
    </main>
  );
}
