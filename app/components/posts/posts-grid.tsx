import { FC } from "react";
import classes from "./posts-grid.module.css";
import PostItem from "./post-item";

type IProps = {
  posts: IPost[];
};

export type IPost = {
  title: string;
  image?: string;
  excerpt?: string;
  date: string;
  slug?: string;
  isFeatured?: boolean;
  content?: string;
};

const PostsGrid = (props: IProps) => {
  const { posts } = props;
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostItem key={post.slug} post={post} />
      ))}
    </ul>
  );
};

export default PostsGrid;
