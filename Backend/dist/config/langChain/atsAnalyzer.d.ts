import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
export declare const model: ChatGoogleGenerativeAI;
export declare const aiAtsService: (parsedText: string, jd_text: string) => Promise<{
    matchScore: number;
    matched_keywords: string[];
    missing_keywords: string[];
    suggestions: {
        title?: string | undefined;
        current?: string | undefined;
        suggested?: string | undefined;
        impact?: string | undefined;
    }[];
    atsIssues: {
        severity: "LOW" | "MEDIUM" | "HIGH";
        category: "Formatting" | "Keywords" | "Experience" | "Skills" | "Education" | "Projects";
        message: string;
    }[];
}>;
//# sourceMappingURL=atsAnalyzer.d.ts.map