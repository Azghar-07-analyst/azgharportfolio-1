import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const inputSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(2000),
});

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data) => inputSchema.parse(data))
  .handler(async ({ data }) => {
    // Submission received. Forward to an email provider here when one is connected.
    console.log("New contact submission:", {
      name: data.name,
      email: data.email,
      message: data.message,
      at: new Date().toISOString(),
    });
    return { ok: true };
  });
