import { updateCartQuantity, removeCartItem } from "../../../controllers/cartController";

export default async function handler(req, res) {
  // const origin = req.headers.origin || "*";
  // res.setHeader("Access-Control-Allow-Credentials", "true");
  // res.setHeader("Access-Control-Allow-Origin", origin);
  // res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,PATCH,DELETE,POST,PUT");
  // res.setHeader(
  //   "Access-Control-Allow-Headers",
  //   "Content-Type, Authorization, X-Requested-With"
  // );

  // if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "PUT") {
    return updateCartQuantity(req, res);
  }

  if (req.method === "DELETE") {
    return removeCartItem(req, res);
  }

  return res.status(405).json({ message: "Method Not Allowed" });
}
