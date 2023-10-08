"use client";
import { ChangeEvent, useState, useEffect } from "react";
import classes from "./contact-form.module.css";
import Notification from "../ui/notification";
import { TMessage } from "@/types/contact/message.type";
import { RequestStatus } from "@/types/contact/status.type";
import Portal from "./portal";

async function sendContactData(contactDetail: TMessage) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetail),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "Something went wrong!");
  }
}

const ContactForm = () => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredName, setEnteredName] = useState("");
  const [enteredMessage, setEnteredMessage] = useState("");
  const [requestStatus, setRequestStatus] = useState<RequestStatus | null>();
  const [requestError, setRequestError] = useState(null);

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sendMessageHandler(event: ChangeEvent<HTMLFormElement>) {
    event.preventDefault();

    setRequestStatus("pending");
    console.log(1111111111111);

    try {
      await sendContactData({
        email: enteredEmail,
        name: enteredName,
        message: enteredMessage,
      });
      setRequestStatus("success");
      setEnteredEmail("");
      setEnteredMessage("");
      setEnteredName("");
    } catch (error: any) {
      setRequestError(error.message);
      setRequestStatus("error");
    }
  }

  let notification;
  switch (requestStatus) {
    case "pending":
      notification = {
        status: "pending",
        title: "Sending message...",
        message: "Your message is on its way",
      };
      break;
    case "success":
      notification = {
        status: "success",
        title: "Success",
        message: "Message sent successfully",
      };
      break;
    case "error":
      notification = {
        status: "error",
        title: "Error",
        message: requestError,
      };
      break;
    default:
      break;
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you?</h1>
      <form action="" className={classes.form} onSubmit={sendMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              required
              value={enteredEmail}
              onChange={(event) => setEnteredEmail(event.target.value)}
            />
          </div>

          <div className={classes.control}>
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              required
              value={enteredName}
              onChange={(event) => setEnteredName(event.target.value)}
            />
          </div>
        </div>

        <div className={classes.control}>
          <label htmlFor="message">Your Message</label>
          <textarea
            id="message"
            rows={5}
            required
            value={enteredMessage}
            onChange={(event) => setEnteredMessage(event.target.value)}
          ></textarea>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      <Portal>
        {notification && (
          <Notification
            status={notification.status}
            title={notification.title}
            message={notification.message}
          />
        )}
      </Portal>
    </section>
  );
};

export default ContactForm;
