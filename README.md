Description of the WhatsApp AI Customer Service Agent:
This is a WhatsApp bot developed to serve as a customer service agent for President University's Admission Office. The bot leverages the Google Gemini AI to generate responses to student inquiries regarding the university's admission process. The bot is implemented using the WhatsApp Web API and Node.js.

Key Features:
Environment Configuration:

The bot uses the dotenv library to load environment variables from a .env file, allowing you to securely store your API keys for external services such as Google Gemini AI.
Google Gemini AI Integration:

Google Generative AI is integrated to process the user's questions and generate appropriate responses. The AI is fed with a prompt that outlines the scope of its knowledge, which includes information about programs offered by the university, the admission process, and scholarships.
WhatsApp Web Client:

The bot uses the whatsapp-web.js library to interface with WhatsApp. It generates a QR code upon running, allowing you to link the bot to your WhatsApp account by scanning the QR code with your phone.
Customizable Customer Service Experience:

The bot has been designed to answer questions related to:
University programs (e.g., Computer Engineering, Industrial Engineering, Accounting, Management, Communications)
Admission process (e.g., registration, schedule, tuition fees)
Scholarships (e.g., merit-based, financial assistance)
It answers in a polite, friendly tone, addressing users as "Kak" to ensure a casual and welcoming interaction.
Information Guard:

To avoid misinformation (hallucinations), the bot only provides responses based on predefined knowledge. If a question falls outside its scope, the bot directs the user to the university’s official admission office email (admission@president.ac.id) or phone number (+62 21 1234567) for further assistance.
Dynamic Response Generation:

The bot listens for incoming messages and processes them by feeding the content into the Google Gemini AI with a pre-defined prompt that specifies the context, duties, and information constraints.
Based on the generated response, the bot sends the appropriate reply back to the user.
Error Handling:

If the AI fails to generate a valid response or encounters an error, the bot responds with a default error message: "Maaf, saya tidak dapat menjawab pertanyaan Kakak saat ini."
How It Works:
When the bot receives a message, it converts the message into a lowercase format, then creates a prompt with contextual information about the university and its offerings.
The Google Gemini AI processes the prompt and generates a response based on its training data, following the restrictions and recommendations outlined in the prompt.
The bot sends this response back to the user via WhatsApp.
If the bot is unable to generate a response, it politely directs the user to the correct contact point for further support.
