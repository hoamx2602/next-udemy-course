import classes from "./all-posts.module.css";
import PostsGrid, { IPost } from "./posts-grid";

type IFeaturedPosts = {
  posts: IPost[];
};

const AllPosts = (props: IFeaturedPosts) => {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
};

export default AllPosts;
