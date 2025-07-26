"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNotePath = getNotePath;
exports.getNoteContent = getNoteContent;
exports.saveNoteContent = saveNoteContent;
exports.noteExists = noteExists;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const NOTES_DIR = path_1.default.join(__dirname, "..", "note");
// Ensure notes directory exists
if (!fs_1.default.existsSync(NOTES_DIR)) {
    fs_1.default.mkdirSync(NOTES_DIR, { recursive: true });
}
function getNotePath(noteId) {
    return path_1.default.join(NOTES_DIR, `${noteId}.md`);
}
function getNoteContent(noteId) {
    const notePath = getNotePath(noteId);
    if (!fs_1.default.existsSync(notePath)) {
        fs_1.default.writeFileSync(notePath, "", "utf-8");
    }
    return fs_1.default.readFileSync(notePath, "utf-8");
}
function saveNoteContent(noteId, content) {
    const notePath = getNotePath(noteId);
    fs_1.default.writeFileSync(notePath, content, "utf-8");
}
function noteExists(noteId) {
    return fs_1.default.existsSync(getNotePath(noteId));
}
