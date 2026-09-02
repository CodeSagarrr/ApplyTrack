import multer from "multer";
import ApiError from "../utils/ApiError.js";
const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
];
const upload = multer({
    storage: multer.memoryStorage(),
    fileFilter(req, file, callback) {
        if (allowedMimeTypes.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(new ApiError(415, "Only PDF, DOC and DOCX files are allowed."));
        }
    },
    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB
    }
});
export default upload;
//# sourceMappingURL=Multer.js.map