"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// haokee-clipboard/src/server.ts
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const utils_1 = require("./utils");
const app = (0, express_1.default)();
const port = 1145;
// Serve static files from public directory
app.use(express_1.default.static(path_1.default.join(__dirname, "../public")));
app.use(express_1.default.json());
// Homepage route
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/index.html"));
});
// Note editor route
app.get("/:noteId", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "../public/editor.html"));
});
// API to get note content
app.get("/api/notes/:noteId", (req, res) => {
    const noteId = req.params.noteId;
    try {
        const content = (0, utils_1.getNoteContent)(noteId);
        res.json({ content });
    }
    catch (error) {
        res.status(404).json({ error: "Note not found" });
    }
});
// API to save note content
app.post("/api/notes/:noteId", (req, res) => {
    const noteId = req.params.noteId;
    const content = req.body.content;
    try {
        (0, utils_1.saveNoteContent)(noteId, content);
        res.json({ success: true });
    }
    catch (error) {
        res.status(500).json({ error: "Failed to save note" });
    }
});
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
