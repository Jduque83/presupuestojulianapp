import { google } from "googleapis";

export async function handler(event, context) {
  try {
    // Autenticación con el token que guardamos en Netlify
    const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });

    const sheets = google.sheets({ version: "v4", auth });

    // Tu ID de Google Sheet
    const spreadsheetId = "1_WhGY-djG6Eo-GnPHWMMhE-OVohKOxHa";

    // Aquí defines qué rango leer
    const range = "Registros!A1:F10"; // <-- cámbialo según tu hoja

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range,
    });

    const values = response.data.values;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        rows: values,
      }),
    };
  } catch (error) {
    console.error("Error al acceder a Google Sheets:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        error: error.message,
      }),
    };
  }
}
