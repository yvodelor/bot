import multer from "multer";
import path from "path";

function createStorage(folder: string) {
  return multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(process.cwd(), folder));
    },

    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const name = `${Date.now()}-${Math.round(Math.random() * 100000)}`;

      cb(null, name + ext);
    },
  });
}

const options = {
  limits: {
    fileSize: 1024 * 1024 * 1, // 2 MB
  },

  fileFilter: (
    req: any,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Le fichier doit être une image"));
    }
  },
};

// Produit -> /uploads/products/
export const uploadProduct = multer({
  storage: createStorage("uploads/products"),
  ...options,
});

// Ads -> /uploads/ads/
export const uploadAd = multer({
  storage: createStorage("uploads/ads"),
  ...options,
});