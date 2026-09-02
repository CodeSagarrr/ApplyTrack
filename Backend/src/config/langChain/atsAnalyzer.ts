import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { PromptTemplate } from "@langchain/core/prompts";
import { AtsSchema } from "../../validations/atsSchema.js";
import ApiError from "../../utils/ApiError.js";
import dotenv from "dotenv";

dotenv.config();

export const model = new ChatGoogleGenerativeAI({
  model: "gemini-3.5-flash-lite",
  apiKey: process.env.GOOGLE_API_KEY!,
  temperature: 0,
  maxOutputTokens: 5000,
});

const prompt = PromptTemplate.fromTemplate(
  `
  You are an expert Applicant Tracking System (ATS) analyzer and Senior Technical Recruiter.

Compare the candidate's resume with the job description and evaluate their suitability for the role.

Rules:
- Analyze only the provided resume and job description.
- Do not invent skills, experience, education, certifications, or projects.
- Consider technical skills, experience, education, projects, transferable skills, ATS keyword matching, and overall job compatibility.
- Ignore grammar and spelling unless they affect ATS readability.
- Return ONLY valid JSON. Do not use markdown or add any extra text.
- Every field must exist. Use [] for empty arrays.
- The response must be directly parsable using JSON.parse().

Match Score (0-100):
- 90-100: Excellent
- 75-89: Strong
- 60-74: Moderate
- 40-59: Weak
- 0-39: Poor

The score should reflect overall compatibility, not just missing keywords.

Output Constraints:
- matched_keywords: maximum 10
- missing_keywords: maximum 10
- suggestions: maximum 5, concise (≤20 words each)
- atsIssues: maximum 5

Allowed severity values:
LOW, MEDIUM, HIGH

Allowed category values:
Formatting, Keywords, Experience, Skills, Education, Projects

Resume:
{resumeText}

Job Description:
{job_description}

Return exactly this JSON structure:

{{
  "matchScore": 0,
  "matched_keywords": [],
  "missing_keywords": [],
  "suggestions": [
  {{
      title: "",
      current: "",
      suggested:"",
      impact:"",
  }}
  ],
  "atsIssues": [
    {{
      "severity": "LOW",
      "category": "Skills",
      "message": ""
    }}
  ]
}}
  `,
);

const chain = prompt.pipe(model);

export const aiAtsService = async (parsedText: string, jd_text: string) => {
  try {
    const response = await chain.invoke({
      resumeText: parsedText,
      job_description: jd_text,
    });
    const cleanedResponse = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();
    const parsedResponse = JSON.parse(cleanedResponse);

    return AtsSchema.parse(parsedResponse);
  } catch (error) {
    console.error("AI ATS Analysis Error:", error);

    throw new ApiError(500, "Failed to analyze resume using AI.");
  }
};
