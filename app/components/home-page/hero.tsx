import classes from "./hero.module.css";
import Image from "next/image";

const Hero = () => {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/unnamed.jpg"
          alt="An image showing"
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Hoa</h1>
      <p>
        I blog about web development - especially frontend frameworks like
        Angular or React
      </p>
    </section>
  );
};

export default Hero;
