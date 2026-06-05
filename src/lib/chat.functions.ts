import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const FALLBACK =
  "Sorry, I am having trouble connecting. Please email azgharabbas@gmail.com directly.";

const SYSTEM_PROMPT = `You are a helpful assistant representing Syed Azghar Abbas Rizvi's portfolio. Answer questions about his skills, projects, experience, education, and availability. Keep answers concise, friendly, and professional. Always encourage the recruiter to reach out via email at azgharabbas@gmail.com.

Reference information about Azghar:
- Name: Syed Azghar Abbas Rizvi
- Role: Data Analyst / Data Scientist / ML Engineer
- Skills: Python, SQL, R, Power BI, Tableau, Excel, Pandas, NumPy, Scikit-Learn, PyTorch, MySQL
- Experience: Data Analytics Intern at VCodez, Chennai (May 2025)
- Projects: Global Layoffs Analysis (SQL, Python), Boston Housing Prediction (Python, Scikit-Learn), InsightSphere Retail Analytics (SQL, Excel, Tableau, Power BI)
- Education: M.Sc Applied Data Science at SRM Institute (current), BCA at The New College
- Certifications: Cisco Data Analytics Essentials, Cisco Introduction to Data Science
- Contact: azgharabbas@gmail.com, +91-9150642752
- Availability: Open to work, available for full time and internship roles
- Location: Chennai, India, open to remote work`;

const inputSchema = z.object({
  messages: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().min(1).max(2000),
      })
    )
    .min(1)
    .max(20),
});

export const askBot = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    const key = process.env.LOVABLE_API_KEY;
    if (!key) return { reply: FALLBACK };

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [{ role: "system", content: SYSTEM_PROMPT }, ...data.messages],
        }),
      });

      if (!res.ok) {
        console.error("AI gateway error", res.status, await res.text());
        return { reply: FALLBACK };
      }

      const json = await res.json();
      const reply = json?.choices?.[0]?.message?.content?.trim();
      return { reply: reply || FALLBACK };
    } catch (err) {
      console.error("askBot error", err);
      return { reply: FALLBACK };
    }
  });
