import { fetchArticles } from "@/lib/news";
import { inngest } from "../client";

import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";
import { sendEmail } from "@/lib/email";
import { createClient } from "@/lib/supabase/server";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY as string);

export default inngest.createFunction(
    { id: "newsletter/scheduled" },
    { event: "newsletter.schedule" },
    async ({ event, step, runId }) => {


        const categories = event.data.categories;

        // fetch articles per category
        const allArticles = await step.run("fetch-news", async () => {
            return fetchArticles(categories);
        });

        // generate ai summary
        const summary = await step.run("summarize-news", async () => {
            const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

            const prompt = `You are an expert newsletter editor creating a personalized newsletter. 
      Write a concise, engaging summary that:
      - Highlights the most important stories
      - Provides context and insights
      - Uses a friendly, conversational tone
      - Is well-structured with clear sections
      - Keeps the reader informed and engaged

      Format the response as a proper newsletter with a title and organized content.
      Make it email-friendly with clear sections and engaging subject lines.

      Categories requested: ${event.data.categories.join(", ")}

      Articles:
      ${allArticles
                    .map(
                        (article: any, index: number) =>
                            `${index + 1}. ${article.title}\n   ${article.description}\n   Source: ${article.url}\n`
                    )
                    .join("\n")}
      `;

            const result = await model.generateContent(prompt);
            return result.response.text();
        });

        if (!summary) {
            throw new Error("Failed to generate newsletter content");
        }

        // Convert markdown to HTML for email
        const htmlContent = await marked(summary);

        await step.run("send-email", async () => {
            await sendEmail(
                event.data.email,
                event.data.categories.join(", "),
                allArticles.length,
                htmlContent
            );
        });

        await step.run("schedule-next", async () => {
            const now = new Date();
            let nextScheduleTime: Date;

            switch (event.data.frequency) {
                case "daily":
                    nextScheduleTime = new Date(now.getTime() + 24 * 60 * 60 * 1000);
                    break;
                case "weekly":
                    nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
                    break;
                case "biweekly":
                    nextScheduleTime = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
                    break;
                default:
                    nextScheduleTime = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
            }

            nextScheduleTime.setHours(9, 0, 0, 0);

            // Schedule the next newsletter
            await inngest.send({
                name: "newsletter.schedule",
                data: {
                    userId: event.data.userId,
                    email: event.data.email,
                    categories: event.data.categories,
                    frequency: event.data.frequency,
                    scheduledFor: nextScheduleTime.toISOString(),
                },
                ts: nextScheduleTime.getTime(),
            });

            return {
                html: htmlContent,
            };
        });
    }
);
