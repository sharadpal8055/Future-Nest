import dotenv from "dotenv";
dotenv.config();
import Stripe from "stripe";

if (!process.env.STRIPE_SECRET_KEY) {
  console.error(" STRIPE_SECRET_KEY is missing");
  process.exit(1);
}

if (!process.env.STRIPE_SECRET_KEY.startsWith("sk_")) {
  console.error(" Invalid Stripe secret key format");
  process.exit(1);
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16"
});

export default stripe;

