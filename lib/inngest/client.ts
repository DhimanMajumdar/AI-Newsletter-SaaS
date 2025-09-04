// lib/inngest/client.ts
import { Inngest } from "inngest";

export const inngest = new Inngest({
    id: "personalized-newsletter",
    name: "Personalized Newsletter Generator",
    eventKey: process.env.INNGEST_EVENT_KEY, // Add this
    signingKey: process.env.INNGEST_SIGNING_KEY,
});