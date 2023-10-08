import { FC, Fragment, PropsWithChildren } from "react";
import MainNavigation from "./main-navigation";

const Layout: FC = (props: PropsWithChildren) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
    </Fragment>
  );
};

export default Layout;
