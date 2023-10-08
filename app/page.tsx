import { Fragment } from "react";
import Hero from "./components/home-page/hero";
import FeaturedPosts from "./components/home-page/featured-posts";
import { getFeaturedPosts } from "@/lib/posts-util";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "I post about programming and web development",
  title: {
    absolute: "Hoa's Blog",
  },
};

export default function HomePage() {
  const featuredPosts = getFeaturedPosts();
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={featuredPosts} />
    </Fragment>
  );
}
