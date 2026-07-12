import type { Request, Response } from "express";

export default async function handler(req: Request, res: Response) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const discordTag = typeof req.body?.discordTag === "string" ? req.body.discordTag.trim() : "";
  const message = typeof req.body?.message === "string" ? req.body.message.trim() : "";

  if (!webhookUrl) {
    return res.status(503).json({ error: "Contact form is not configured." });
  }

  if (!discordTag || !message || discordTag.length > 80 || message.length > 2000) {
    return res.status(400).json({ error: "Invalid inquiry." });
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      embeds: [
        {
          title: "New Sanoh Portfolio Inquiry",
          color: 65428,
          fields: [
            { name: "Discord Tag", value: discordTag, inline: true },
            { name: "Message", value: message, inline: false },
          ],
          timestamp: new Date().toISOString(),
        },
      ],
    }),
  });

  if (!response.ok) {
    return res.status(502).json({ error: "Message delivery failed." });
  }

  return res.status(204).end();
}
