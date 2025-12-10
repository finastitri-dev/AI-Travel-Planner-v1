import { GoogleGenAI } from "@google/genai";
import { DayPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateTravelItinerary = async (
  destination: string,
  duration: number,
  interests: string
): Promise<DayPlan[]> => {
  const prompt = `
    Bertindaklah sebagai ahli travel planner profesional. Buatlah rencana perjalanan (itinerary) harian yang detail dan realistis untuk:
    
    Tujuan: ${destination}
    Lama: ${duration} hari
    Minat: ${interests}

    INSTRUKSI PENTING:
    1. Gunakan Google Search untuk mendapatkan informasi jam buka dan harga tiket TERBARU dan AKURAT.
    2. Estimasi biaya harus dalam mata uang lokal tempat tujuan.
    3. Output harus dalam Bahasa Indonesia yang menarik.
    4. JANGAN gunakan markdown formatting untuk output JSON final, tapi pastikan strukturnya valid.
    5. Output JSON harus dibungkus dalam code block \`\`\`json ... \`\`\`.

    Format JSON yang diharapkan adalah array objek seperti ini:
    [
      {
        "day": 1,
        "theme": "Judul/Tema Hari Ini (Contoh: Menjelajahi Kota Tua)",
        "activities": [
          {
            "name": "Nama Tempat/Aktivitas",
            "hours": "Jam Buka - Tutup (Contoh: 09:00 - 17:00)",
            "cost": "Estimasi Biaya (Contoh: ¥500 / Gratis)",
            "description": "Deskripsi singkat aktivitas (maks 2 kalimat)"
          }
        ]
      }
    ]
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
        // responseMimeType cannot be JSON when using googleSearch, so we parse manually
      },
    });

    const textResponse = response.text;
    if (!textResponse) {
      throw new Error("Tidak ada respons dari AI.");
    }

    // Extract JSON from code block
    const jsonMatch = textResponse.match(/```json\n([\s\S]*?)\n```/) || textResponse.match(/```([\s\S]*?)```/);
    
    let jsonString = "";
    if (jsonMatch && jsonMatch[1]) {
      jsonString = jsonMatch[1];
    } else {
      // Fallback: try to parse the whole text if no code blocks found (unlikely but possible)
      jsonString = textResponse;
    }

    const itinerary: DayPlan[] = JSON.parse(jsonString);
    return itinerary;

  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw new Error("Gagal membuat itinerary. Silakan coba lagi.");
  }
};
