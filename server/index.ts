import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  app.use(express.json({ limit: "32kb" }));

  app.post("/api/contact", async (req, res) => {
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
  });

  // Serve static files from dist/public in production
  const staticPath =
    process.env.NODE_ENV === "production"
      ? path.resolve(__dirname, "public")
      : path.resolve(__dirname, "..", "dist", "public");

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

startServer().catch(console.error);
