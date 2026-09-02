import { PDFParse } from "pdf-parse";
import mammoth from "mammoth";
import type { UploadApiResponse } from "cloudinary";

export const parseResume = async (
    type: string,
    buffer: Buffer,
):Promise<UploadApiResponse | string> => {
    switch (type) {
        case "application/pdf": {
            const result = new PDFParse({ data: new Uint8Array(buffer) });
            const parsed = await result.getText();
            return parsed.text
        }

        case "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
            const result = await mammoth.extractRawText({
                buffer: buffer
            });

            return result.value;
        }

        default:
            throw new Error("Unsupported file type");
    }
};