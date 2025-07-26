import fs from "fs";
import path from "path";

const NOTES_DIR = path.join(__dirname, "..", "note");

// Ensure notes directory exists
if (!fs.existsSync(NOTES_DIR)) {
  fs.mkdirSync(NOTES_DIR, { recursive: true });
}

export function getNotePath(noteId: string): string {
  return path.join(NOTES_DIR, `${noteId}.md`);
}

export function getNoteContent(noteId: string): string {
  const notePath = getNotePath(noteId);

  if (!fs.existsSync(notePath)) {
    fs.writeFileSync(notePath, "", "utf-8");
  }

  return fs.readFileSync(notePath, "utf-8");
}

export function saveNoteContent(noteId: string, content: string): void {
  const notePath = getNotePath(noteId);
  fs.writeFileSync(notePath, content, "utf-8");
}

export function noteExists(noteId: string): boolean {
  return fs.existsSync(getNotePath(noteId));
}
