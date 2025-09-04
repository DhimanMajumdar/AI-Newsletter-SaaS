                                               AI PERSONALIZED NEWSLETTER GENERATOR
                                            


![Entry Page](/public/picOne.png)

![Dashboard](/public/picTwo.png)

![Select Preferences](/public/picFour.png)

![Select Frequency](/public/picFive.png)







## ⚙️ Tech Stack

- **Next.js 15+** – React framework with App Router & server components
- **Supabase** – Hosted Postgres, authentication & real-time subscriptions
- **GEMINI-AI API** – AI-powered newsletter content generation
- **Inngest** – Durable background jobs for newsletter scheduling
- **TailwindCSS** – Utility-first styling
- **TypeScript** – Static typing and developer tooling
- **EmailJS** – Email delivery service
- **NewsAPI** – News article fetching

---

## ⚡️ Features

- 🎯 **Category Selection**
  Choose from 8 different news categories (Technology, Business, Sports, Entertainment, Science, Health, Politics, Environment).

- 🤖 **AI-Powered Summarization**
  Uses GEMINI AI API to create engaging, personalized newsletter content from recent news articles.

- ⏰ **Scheduled Delivery**
  Automatically sends newsletters at 9 AM based on user-selected frequency (daily, weekly, bi-weekly).

- 🔄 **Durable Workflows**
  Built with Inngest for reliable background processing and automatic retries.

- 👤 **User Management**
  User authentication, preference management, and newsletter activation/deactivation.

- 📱 **Responsive Dashboard**
  Beautiful, mobile-friendly UI with real-time status updates and preference management.

- 📧 **Email Delivery**
  Professional email templates with HTML formatting and tracking.

---

## 👌 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [Supabase CLI](https://supabase.com/docs/guides/cli)
- Supabase project (URL & ANON key)
- GEMINI API key
- Inngest account (signing key)
- NewsAPI key
- EmailJS account (service ID, template ID, public key)



## 🎯 Key Features Explained

### AI Newsletter Generation

The system fetches recent news articles from selected categories and uses OpenAI GPT-4 to create engaging, personalized summaries that are delivered via email.

### Scheduled Workflows

Inngest handles the scheduling and execution of newsletter generation, ensuring reliable delivery even if the system encounters temporary issues.

### User Preference Management

Users can select their preferred news categories, delivery frequency, and easily activate/deactivate their newsletter subscription.

### Real-time Dashboard

A beautiful dashboard shows current preferences, newsletter status, and provides easy management of all settings.


## 📄 License

MIT License - see LICENSE file for details

---


## 🎉 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Database powered by [Supabase](https://supabase.com/)
- AI powered by [Gemini API]
- Background jobs by [Inngest](https://www.inngest.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Vercel](https://vercel.com/)   iske hisab se ek linked post dede bhai