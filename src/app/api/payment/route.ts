import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  // @ts-ignore
  apiVersion: "2023-10-16",
});

export const POST = async (request: Request) => {
  const userSession = await getServerSession(authOptions);

  const req = await request.json();

  const {
    totalPrice,
    name,
    description,
    coverImage,
    startDate,
    endDate,
    guests,
    tripId,
  } = req;

  const session = await stripe.checkout.sessions.create({
    success_url: process.env.HOST_URL,
    metadata: {
      startDate,
      endDate,
      guests,
      tripId,
      userId: (userSession?.user as any)?.id,
      totalPrice,
    },
    line_items: [
      {
        price_data: {
          currency: "brl",
          unit_amount: totalPrice * 100,
          product_data: {
            name,
            description,
            images: [coverImage],
          },
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  });

  return new NextResponse(JSON.stringify({ sessionId: session.id }), {
    status: 200,
  });
};
