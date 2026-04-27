import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key:    process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// ── Video storage (auto-transcoded, HLS-ready) ────────────────
const videoStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:       'autospex/courses/videos',
    resource_type: 'video',
    allowed_formats: ['mp4', 'mov', 'avi', 'mkv'],
    transformation: [{ quality: 'auto', fetch_format: 'mp4' }],
  },
});

// ── Document/PDF storage ──────────────────────────────────────
const documentStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:       'autospex/courses/documents',
    resource_type: 'raw',
    allowed_formats: ['pdf', 'docx', 'pptx', 'xlsx'],
  },
});

// ── Image storage (thumbnails, avatars) ───────────────────────
const imageStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder:       'autospex/images',
    resource_type: 'image',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 1280, crop: 'limit', quality: 'auto' }],
  },
});

export const uploadVideo    = multer({ storage: videoStorage,    limits: { fileSize: 500 * 1024 * 1024 } }); // 500MB
export const uploadDocument = multer({ storage: documentStorage, limits: { fileSize: 50  * 1024 * 1024 } }); // 50MB
export const uploadImage    = multer({ storage: imageStorage,    limits: { fileSize: 10  * 1024 * 1024 } }); // 10MB

export default cloudinary;