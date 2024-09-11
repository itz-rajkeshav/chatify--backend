import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const storagePath = path.join(process.cwd(), "public/storage");

// Check if the storage directory exists; if not, create it
// if (!fs.existsSync(storagePath)) {
//   fs.mkdirSync(storagePath, { recursive: true });
// }

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, storagePath);
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({
  storage,
});
