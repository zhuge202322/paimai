import type { Metadata, ResolvingMetadata } from "next";
import { getPostBySlug, getPostsByCategory } from "@/lib/api";
import ProductArticleClient from "@/components/ProductArticleClient";

export const revalidate = 60;

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> },
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;
  const slug = decodeURIComponent(id);
  const productPost = await getPostBySlug(slug);

  if (!productPost) {
    return {
      title: "Product Not Found",
    };
  }

  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: productPost.title,
    description: productPost.excerpt ? productPost.excerpt.replace(/<[^>]+>/g, '').trim() : `Discover ${productPost.title} at Casa Italia.`,
    openGraph: {
      title: productPost.title,
      description: productPost.excerpt ? productPost.excerpt.replace(/<[^>]+>/g, '').trim() : undefined,
      images: [
        productPost.featuredImage?.node?.sourceUrl || "/images/placeholder.png",
        ...previousImages,
      ],
    },
  };
}

export default async function ProductArticlePage({ params }: { params: Promise<{ id: string }> }) {
  // 1. Fetch the main product (post) by slug
  const { id } = await params;
  // Ensure slug is decoded (handles Chinese characters etc.)
  const slug = decodeURIComponent(id);
  const productPost = await getPostBySlug(slug);
  
  // Handle 404/Null
  if (!productPost) {
    console.warn(`Product not found for slug: ${slug}`);
    
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-white text-black p-10 font-sans">
            <h1 className="text-4xl mb-4 text-red-600 font-bold">Debug: Product Not Found</h1>
            <div className="bg-gray-100 p-6 rounded-lg max-w-2xl w-full">
                <p className="mb-2 text-lg"><strong>Looking for Slug:</strong> "{slug}"</p>
                <hr className="my-4 border-gray-300"/>
                <p className="mb-4"><strong>Action Required:</strong></p>
                <ul className="list-disc pl-5 space-y-2 text-gray-700">
                    <li>Go to WordPress Admin &rarr; Posts.</li>
                    <li>Find the post you want to display.</li>
                    <li>Click "Quick Edit" (快速编辑).</li>
                    <li>Ensure the <strong>Slug (别名)</strong> field matches <code>{slug}</code> exactly.</li>
                    <li>Ensure the post status is <strong>Published (已发布)</strong>.</li>
                </ul>
                <div className="mt-6 text-sm text-gray-500">
                    Technical: The GraphQL query <code>{`posts(where: { name: "${slug}" })`}</code> returned no results.
                </div>
            </div>
            <a href="/collection" className="mt-8 px-6 py-3 bg-black text-white rounded hover:bg-gray-800 transition-colors">Back to Collection</a>
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
    category: "General", 
    collection: "Collection 2024", 
    image: productPost.featuredImage?.node?.sourceUrl || "/images/placeholder.png",
    designer: "Casa Italia",
    description: productPost.excerpt ? productPost.excerpt.replace(/<[^>]+>/g, '').trim() : "A masterpiece of design.",
    content: productPost.content // Pass full HTML content
  };

  const relatedProducts = (relatedPosts || [])
    .filter((edge: any) => edge.node.slug !== id) // Exclude current
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
