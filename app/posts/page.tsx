import { getAllPosts } from "@/lib/posts-util";
import AllPosts from "../components/posts/all-posts";
import { Fragment } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "A list of all programming tutorial and post",
  title: {
    absolute: "All my post",
  },
};

const AllPostsPage = () => {
  const allPosts = getAllPosts();
  return (
    <Fragment>
      <AllPosts posts={allPosts} />
    </Fragment>
  );
};

export default AllPostsPage;
