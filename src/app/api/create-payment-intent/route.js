import { NextResponse } from "next/server";
import Stripe from "stripe";

const stribe = new Stripe(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY);

export async function POST(req) {
    try {
        const price = await req.json();
        const amount = parseInt(price*100);
        const paymentIntent = await stribe.paymentIntents.create({
            amount,
            currency:"usd",
            payment_method:["card"],
        });

        return NextResponse.json({clientSecret:paymentIntent.client_secret});

    } catch (error) {
        return NextResponse.json({message:error.message}, {status:500});
    }
}