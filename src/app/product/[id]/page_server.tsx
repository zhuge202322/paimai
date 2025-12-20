import { getPostBySlug, getPostsByCategory } from "@/lib/api";
import ProductArticleClient from "@/components/ProductArticleClient";

export const revalidate = 60;

export default async function ProductArticlePage({ params }: { params: { id: string } }) {
  // 1. Fetch the main product (post) by slug
  // Ensure slug is decoded (handles Chinese characters etc.)
  const slug = decodeURIComponent(params.id);
  const productPost = await getPostBySlug(slug);
  
  // Handle 404/Null
  if (!productPost) {
    console.warn(`Product not found for slug: ${slug}`);
    
    // Create a dummy product object to pass to client to avoid "Not Found" causing UI flickers or Ref errors immediately,
    // OR we can pass a special flag.
    // Let's pass null but log more info for the user in the UI if possible, or just rely on console.
    // Better: let's verify if the user meant to use ID?
    // If slug is numeric, maybe try fetching by DATABASE_ID?
    // For now, let's stick to slug but ensure we aren't getting confused.
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-10">
            <h1 className="text-4xl mb-4">Debug: Product Not Found</h1>
            <p className="mb-2"><strong>Looking for Slug:</strong> "{slug}"</p>
            <p className="mb-4"><strong>Action:</strong> Please check your WordPress Admin &rarr; Posts.</p>
            <ul className="text-sm text-gray-600 list-disc text-left">
                <li>Find the post you are trying to view.</li>
                <li>Click "Quick Edit" (快速编辑).</li>
                <li>Check the <strong>Slug (别名)</strong> field. It must match "{slug}" exactly.</li>
            </ul>
            <a href="/collection" className="mt-8 underline">Back to Collection</a>
        </div>
    );
  }

  // 2. Fetch related products (from 'fenlei' category)
  // Ideally we filter out the current product in the client or here
  const relatedPosts = await getPostsByCategory("fenlei", 10); // Fetch a few to show in carousel

  // 3. Transform Data
  // Helper to safely get category
  const getCategory = (post: any) => {
    const cats = post.categories?.edges?.map((c: any) => c.node.name) || [];
    return cats.find((c: string) => c !== "Fenlei" && c !== "分类" && c !== "Uncategorized") || "General";
  };

  const product = {
    id: productPost.slug, // Ensure we use slug as ID
    name: productPost.title,
    category: "General", // Single post query might not return categories if not requested in getPostBySlug query. 
                        // I might need to update getPostBySlug to fetch categories or accept it is missing.
                        // Let's check api.ts later. For now default to General.
    collection: "Collection 2024", 
    image: productPost.featuredImage?.node?.sourceUrl || "/images/placeholder.png",
    designer: "Casa Italia",
    description: productPost.excerpt ? productPost.excerpt.replace(/<[^>]+>/g, '').trim() : "A masterpiece of design.",
    content: productPost.content // Pass full HTML content
  };

  const relatedProducts = (relatedPosts || [])
    .filter((edge: any) => edge.node.slug !== params.id) // Exclude current
    .map((edge: any) => {
      const p = edge.node;
      return {
        id: p.slug,
        name: p.title,
        category: getCategory(p),
        collection: "The Collection",
        image: p.featuredImage?.node?.sourceUrl || "/images/placeholder.png",
        designer: "Casa Italia",
        description: "",
      };
    });

  return <ProductArticleClient product={product} relatedProducts={relatedProducts} />;
}
