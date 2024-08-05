import { NextResponse } from "next/server";
import Stripe from "stripe";

const stribe = new Stripe(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY);

export async function POST(req) {
    try {
        // console.log(process.env.NEXT_PUBLIC_STRIBE_SECRET_KEY);
        const {price} = await req.json();
        const amount = parseInt(price*100);
        // console.log(amount);
        const paymentIntent = await stribe.paymentIntents.create({
            amount,
            currency:"usd",
        });

        return NextResponse.json({clientSecret:paymentIntent.client_secret});

    } catch (error) {
        console.log(error.message);
        return NextResponse.json({message:error.message}, {status:500});
    }
}