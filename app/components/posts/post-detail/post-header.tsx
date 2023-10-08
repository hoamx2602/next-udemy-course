import Image from "next/image";
import classes from "./post-header.module.css";

type IPostDetail = {
  title: string;
  image: string;
  slug?: string;
  date?: string;
  content?: string;
};

const PostHeader = (props: IPostDetail) => {
  const { title, image } = props;
  return (
    <header className={classes.header}>
      <h1>{title}</h1>
      <Image src={image} alt={title} width={200} height={150} />
    </header>
  );
};

export default PostHeader;
