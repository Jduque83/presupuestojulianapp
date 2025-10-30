import { google } from "googleapis";

export async function handler(event, context) {
  try {
    const auth = new google.auth.JWT(
      process.env.GOOGLE_CLIENT_EMAIL,
      null,
      process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    const sheets = google.sheets({ version: "v4", auth });

    // 📘 Cambia por el rango que necesites
    const range = "Registros!A1:F10";

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "✅ Conexión exitosa con Google Sheets",
        data: response.data.values,
      }),
    };
  } catch (error) {
    console.error("❌ Error en la función:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
}
