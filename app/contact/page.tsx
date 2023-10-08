import { Fragment } from "react";
import { Metadata } from "next";
import ContactForm from "../components/contact/contact-form";

export const metadata: Metadata = {
  description: "Send the messages",
};

const ContactPage = () => {
  return (
    <Fragment>
      <ContactForm />;
    </Fragment>
  );
};

export default ContactPage;
