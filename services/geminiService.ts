
import { GoogleGenAI, Type } from "@google/genai";
import { NutritionData } from "../types";

// Always initialize with named parameter apiKey right before the call
// to ensure it uses the most up-to-date key from the session/dialog
const getAI = () => new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY || "" });

// Utility for exponential backoff retry logic
async function callWithRetry<T>(fn: () => Promise<T>, maxRetries = 2, initialDelay = 1000): Promise<T> {
    let retries = 0;
    while (retries <= maxRetries) {
        try {
            return await fn();
        } catch (error: any) {
            const errorMsg = error.message?.toLowerCase() || "";

            // GUIDELINE: If the request fails with an error message containing "Requested entity was not found.", 
            // the key selection state should be reset and the user prompted via the UI.
            if (errorMsg.includes("requested entity was not found")) {
                console.error("API Error: Key not found. Please re-select key.");
                throw error;
            }

            // Check for 429 or RESOURCE_EXHAUSTED specific status
            const isQuotaError = error.status === 429 || errorMsg.includes('quota') || errorMsg.includes('resource_exhausted') || errorMsg.includes('429');

            // If it's a quota error, we allow retry in case it's just a rate limit (RPM)
            // unless we've already retried enough.
            if (isQuotaError && retries >= maxRetries) {
                throw new Error("API Quota Exceeded. Please try again later.");
            }

            const isRetryable = error.status >= 500 && error.status < 600;
            if (retries < maxRetries && isRetryable) {
                const delay = initialDelay * Math.pow(2, retries);
                console.warn(`Gemini API Error (Retry ${retries + 1}/${maxRetries}): Waiting ${delay}ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                retries++;
            } else {
                throw error;
            }
        }
    }
    throw new Error("Max retries exceeded");
}

const nutritionSchema = {
    type: Type.OBJECT,
    properties: {
        calories: { type: Type.NUMBER, description: "Energy in kcal" },
        protein: { type: Type.NUMBER, description: "Protein in grams" },
        carbs: { type: Type.NUMBER, description: "Total carbs in grams" },
        fat: { type: Type.NUMBER, description: "Total fat in grams" },
        fiber: { type: Type.NUMBER, description: "Fiber in grams" }
    },
    required: ["calories", "protein", "carbs", "fat", "fiber"]
};

export const analyzeMealPhoto = async (base64Image: string): Promise<{ name: string; nutrition: NutritionData } | null> => {
    try {
        const result = await callWithRetry(async () => {
            const ai = getAI();
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: {
                    parts: [
                        { inlineData: { mimeType: "image/jpeg", data: base64Image } },
                        { text: "Identify the exact food and portions in this photo. Provide real, scientifically accurate nutritional values based on standard databases (like USDA). Respond strictly in JSON." }
                    ]
                },
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING },
                            nutrition: nutritionSchema
                        },
                        required: ["name", "nutrition"]
                    }
                }
            });
            return JSON.parse(response.text || "{}");
        });
        return result;
    } catch (error) {
        console.error("Photo Analysis Error:", error);
        throw error;
    }
};

export const analyzeMealText = async (name: string, quantity: string): Promise<{ name: string; nutrition: NutritionData } | null> => {
    try {
        const result = await callWithRetry(async () => {
            const ai = getAI();
            const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: `Calculate precise nutritional values for: "${quantity} of ${name}". Respond strictly in JSON format.`,
                config: {
                    responseMimeType: "application/json",
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            name: { type: Type.STRING, description: "Standardized food name" },
                            nutrition: nutritionSchema
                        },
                        required: ["name", "nutrition"]
                    }
                }
            });
            return JSON.parse(response.text || "{}");
        });
        return result;
    } catch (error) {
        console.error("Text Analysis Error:", error);
        throw error;
    }
};

export const editMealPhoto = async (base64Image: string, prompt: string): Promise<string | null> => {
    try {
        const result = await callWithRetry(async () => {
            const ai = getAI();
            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: {
                    parts: [
                        { inlineData: { data: base64Image, mimeType: 'image/jpeg' } },
                        { text: `Edit this image based on: "${prompt}". Return ONLY the modified image.` },
                    ],
                },
            });

            const candidate = response.candidates?.[0];
            if (candidate?.content?.parts) {
                for (const part of candidate.content.parts) {
                    if (part.inlineData) {
                        return `data:image/jpeg;base64,${part.inlineData.data}`;
                    }
                }
            }
            return null;
        });
        return result;
    } catch (error) {
        console.error("Image Edit Error:", error);
        throw error;
    }
};
