import PostContent from "@/app/components/posts/post-detail/post-content";
import { getPostData } from "@/lib/posts-util";
import { TPost } from "@/types/posts/post.type";
import { Metadata, ResolvingMetadata } from "next";
import Head from "next/head";
import { Fragment } from "react";

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const post: TPost = getPostData(params.slug);

  return {
    title: {
      absolute: post.title,
    },
    description: post.excerpt,
  };
}
const PostDetailPage = ({ params }: Props) => {
  const post: TPost = getPostData(params.slug);
  return (
    <Fragment>
      <PostContent post={post} />
    </Fragment>
  );
};

export default PostDetailPage;
