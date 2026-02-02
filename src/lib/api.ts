const API_URL = typeof window === 'undefined'
  ? (process.env.NEXT_PUBLIC_WORDPRESS_API_URL || "http://45.145.229.20:6124/graphql")
  : "/graphql";

async function fetchAPI(query: string, { variables }: { variables?: any } = {}) {
  const headers = { 'Content-Type': 'application/json' };

  // if (!API_URL) {
  //   throw new Error('NEXT_PUBLIC_WORDPRESS_API_URL is not defined in .env.local');
  // }

  // 这里的 fetch 是 Next.js 内置的，支持服务端缓存和静态生成
  const res = await fetch(API_URL, {
    method: 'POST',
    headers,
    body: JSON.stringify({ query, variables }),
    // cache: 'no-store' // 开发阶段可以开启这个，确保数据实时更新。生产环境建议去掉或用 revalidate
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error('Failed to fetch API');
  }
  return json.data;
}

// 获取所有产品（其实就是所有文章）
export async function getAllProducts() {
  const data = await fetchAPI(`
    query AllProducts {
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            slug
            excerpt
            content
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
          }
        }
      }
    }
  `);
  return data?.posts?.edges;
}

export async function getPostBySlug(slug: string) {
  const data = await fetchAPI(
    `
    query PostBySlug($slug: String!) {
      posts(where: { name: $slug }) {
        edges {
          node {
            title
            excerpt
            content
            slug
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        slug: slug
      }
    }
  );
  return data?.posts?.edges?.[0]?.node;
}

export async function getPostsByCategory(categoryName: string, count: number = 4) {
  const data = await fetchAPI(
    `
    query PostsByCategory($categoryName: String!, $count: Int!) {
      posts(first: $count, where: { categoryName: $categoryName, orderby: { field: DATE, order: DESC } }) {
        edges {
          node {
            id
            title
            slug
            excerpt
            content
            categories {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            featuredImage {
              node {
                sourceUrl
                altText
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        categoryName,
        count
      }
    }
  );
  return data?.posts?.edges;
}

export async function getCertificate(certId: string) {
  // Try to find by slug (certificate number usually maps to slug)
  const data = await fetchAPI(
    `
    query GetCertificate($slug: String!) {
      posts(where: { name: $slug, categoryName: "zhengshu" }) {
        edges {
          node {
            title
            content
            featuredImage {
              node {
                sourceUrl
              }
            }
          }
        }
      }
    }
  `,
    {
      variables: {
        slug: certId.toLowerCase()
      }
    }
  );
  return data?.posts?.edges?.[0]?.node;
}

export async function getVisionaries() {
  const data = await fetchAPI(
    `
    query GetVisionariesPost {
      post(id: "visionaries-gallery", idType: SLUG) {
        content
      }
    }
  `
  );

  const content = data?.post?.content || "";
  
  // Extract all <img> tags to process them one by one
  const imgTags = content.match(/<img[^>]+>/g) || [];

  return imgTags.map((imgTag: string, index: number) => {
      // Extract src
      const srcMatch = imgTag.match(/src\s*=\s*["']([^"']+)["']/);
      let src = srcMatch ? srcMatch[1] : "";
      
      // Fix relative URLs if needed
      if (src.startsWith('/')) {
        src = `${process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/graphql', '')}${src}`;
      }

      // Extract alt for Name
      const altMatch = imgTag.match(/alt\s*=\s*["']([^"']+)["']/);
      const alt = altMatch ? altMatch[1] : `Visionary ${index + 1}`;

      return {
          name: alt, // Use Alt text as Name
          title: "Master Designer", // Static title since we only have images
          image: {
            node: {
              sourceUrl: src
            }
          }
      };
  });
}
