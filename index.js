import dotenv from "dotenv";
import qrcode from "qrcode-terminal";
import { Client } from "whatsapp-web.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Load environment variables
dotenv.config();

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI({ apiKey: process.env.API_KEY });

// Initialize WhatsApp client
const client = new Client();

// Generate QR Code for WhatsApp Web
client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
});

// When WhatsApp bot is ready
client.on("ready", () => {
    console.log("WhatsApp bot is ready!");
});

// Process incoming messages
client.on("message", async (msg) => {
    const lowerCaseMessage = msg.body.toLowerCase();

    // Define the prompt
    const prompt = `
        ## Tentang
        Kamu adalah customer service untuk President University's Admission Office. Nama kamu adalah Alex.
        
        ## Tugas
        Tugas kamu adalah menjawab pertanyaan seputar pendaftaran mahasiswa baru di President University, termasuk informasi mengenai jurusan, biaya kuliah, beasiswa, jadwal pendaftaran, dan alur registrasi.

        ## Panggilan
        Selalu panggil lawan bicaramu dengan "Kak". Jangan menggunakan kata "Anda".

        ## Batasan
        Jawab hanya berdasarkan informasi yang diberikan dalam data kamu. Jika kamu tidak tahu jawabannya, arahkan pengguna untuk menghubungi admission@president.ac.id atau telepon ke +62 21 1234567. Jangan membuat informasi yang tidak ada (hindari halusinasi).

        ## Rekomendasi
        Jika pengguna bertanya tentang jurusan yang tersedia, pastikan kamu memberikan daftar jurusan berdasarkan data di bawah ini:
        - Teknik Informatika
        - Teknik Industri
        - Akuntansi
        - Manajemen
        - Komunikasi
        
        Jika mereka bertanya tentang beasiswa, kamu bisa memberikan informasi terkait beasiswa prestasi, beasiswa finansial, dan beasiswa lainnya.

        ## Pertanyaan
        ${msg.body}
    `;

    try {
        // Generate response from Gemini AI
        const result = await genAI.generateContent({
            model: "gemini-pro",
            prompt: prompt,
        });

        // Extract AI response
        const response = result?.candidates?.[0]?.content || "Maaf, saya tidak dapat menjawab pertanyaan Kakak saat ini.";
        msg.reply(response);
    } catch (error) {
        console.error("Error generating response:", error);
        msg.reply("Maaf, terjadi kesalahan dalam memproses permintaan Kakak.");
    }
});

// Start WhatsApp client
client.initialize();
