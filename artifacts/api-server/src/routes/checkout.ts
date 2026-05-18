import { Router, type IRouter } from "express";
import Stripe from "stripe";

const router: IRouter = Router();

function getStripe(): Stripe {
  const secretKey = process.env["STRIPE_SECRET_KEY"];
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY environment variable is required");
  }
  return new Stripe(secretKey, { apiVersion: "2025-04-30.basil" });
}

router.post("/checkout", async (req, res) => {
  try {
    const stripe = getStripe();

    const domains = process.env["REPLIT_DOMAINS"]?.split(",") ?? [];
    const domain = domains[0] ? `https://${domains[0]}` : "http://localhost:80";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "brl",
            product_data: {
              name: "Copo Stanley Personalizado Brasil",
              description:
                "Copo Stanley personalizado com nome, edição Copa do Brasil. Alta qualidade premium, bebida gelada por 24h.",
              images: [],
            },
            unit_amount: 5190,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${domain}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${domain}/cancel`,
      locale: "pt-BR",
      custom_fields: [
        {
          key: "nome_personalizacao",
          label: { type: "custom", custom: "Nome para personalização no copo" },
          type: "text",
          text: { minimum_length: 2, maximum_length: 20 },
        },
      ],
      payment_intent_data: {
        description: "Copo Stanley Personalizado Brasil",
      },
      phone_number_collection: { enabled: false },
      shipping_address_collection: {
        allowed_countries: ["BR"],
      },
    });

    res.json({ url: session.url, sessionId: session.id });
  } catch (err) {
    req.log.error({ err }, "Stripe checkout error");
    const message =
      err instanceof Error ? err.message : "Erro ao criar sessão de checkout";
    res.status(500).json({ error: message });
  }
});

router.get("/checkout/:sessionId", async (req, res) => {
  try {
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(
      req.params.sessionId,
    );
    res.json({
      status: session.payment_status,
      customerEmail: session.customer_details?.email,
      customFields: session.custom_fields,
    });
  } catch (err) {
    req.log.error({ err }, "Stripe session retrieval error");
    res.status(500).json({ error: "Erro ao buscar sessão" });
  }
});

export default router;
