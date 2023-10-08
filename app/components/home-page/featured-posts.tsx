import PostsGrid, { IPost } from "../posts/posts-grid";
import classes from "./featured-posts.module.css";

type IFeaturedPosts = {
  posts: IPost[];
};

const FeaturedPosts = (props: IFeaturedPosts) => {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default FeaturedPosts;
