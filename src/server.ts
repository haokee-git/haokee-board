// haokee-clipboard/src/server.ts
import express from "express";
import path from "path";

import { getNoteContent, saveNoteContent } from "./utils";

const app = express();
const port = 1145;

// Serve static files from public directory
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.json());

// Homepage route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

// Note editor route
app.get("/:noteId", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/editor.html"));
});

// API to get note content
app.get("/api/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;

  try {
    const content = getNoteContent(noteId);
    res.json({ content });
  } catch (error) {
    res.status(404).json({ error: "Note not found" });
  }
});

// API to save note content
app.post("/api/notes/:noteId", (req, res) => {
  const noteId = req.params.noteId;
  const content = req.body.content;

  try {
    saveNoteContent(noteId, content);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: "Failed to save note" });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
