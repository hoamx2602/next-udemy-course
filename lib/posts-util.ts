import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { TPost } from "@/types/posts/post.type";

const postsDirectory = path.join(process.cwd(), "posts");

export const getPostData = (postIdentifier: string) => {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData: TPost = {
    slug: postSlug,
    content,
    date: data.date,
    isFeatured: data.isFeatured,
    title: data.title,
    excerpt: data.excerpt,
    image: data.image,
  };

  return postData;
};

export function getAllPosts() {
  const postFiles = fs.readdirSync(postsDirectory);

  const allPosts = postFiles.map((postFile) => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) => {
    return postA.date > postB.date ? -1 : 1;
  });
  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}
