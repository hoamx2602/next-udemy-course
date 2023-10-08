import { NextResponse, NextRequest } from "next/server";
import { MongoClient, ObjectId } from "mongodb";

export async function GET(request: NextRequest) {
  return NextResponse.json(
    { message: "Hello, Next.js Version 13!" },
    { status: 200 }
  );
}

type NewMessage = {
  email: string;
  name: string;
  message: string;
  id?: ObjectId;
};

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { email, name, message } = body;

  console.log("DEBUG=================222222222", 222222222);
  if (
    !email ||
    !email.includes("@") ||
    !name ||
    name.trim() === "" ||
    !message ||
    message.trim() === ""
  ) {
    return NextResponse.json({ message: "Invalid input" }, { status: 422 });
  }

  const newMesasge: NewMessage = {
    email,
    name,
    message,
  };
  console.log("DEBUG=================2222333333", 2222333333);
  let client;
  const connectionString = `mongodb+srv://${process.env.mongodb_username}:${process.env.mongodb_password}@${process.env.mongodb_clustername}.zhh951p.mongodb.net/${process.env.mongodb_database}`;
  try {
    client = await MongoClient.connect(connectionString);
  } catch (error) {
    return NextResponse.json(
      { message: "Could not connect to database" },
      { status: 500 }
    );
  }

  console.log("DEBUG=================111111", 111111);

  const db = client.db();
  try {
    const result = await db.collection("messages").insertOne(newMesasge);
    newMesasge["id"] = result.insertedId;
  } catch (error) {
    client.close();
    return NextResponse.json(
      { message: "Storing message failed!" },
      { status: 500 }
    );
  }

  client.close();
  return NextResponse.json(
    { message: "Successfully stored message" },
    { status: 201 }
  );
}
