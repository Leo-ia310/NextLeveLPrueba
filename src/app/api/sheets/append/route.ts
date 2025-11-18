import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// ============================================
// 📊 API ROUTE: Agregar datos a Google Sheets
// ============================================
// NOTA: Esta es la OPCIÓN 2 (avanzada)
// Para la OPCIÓN 1 (simple), usa Google Apps Script
// Ver: INSTRUCCIONES-APIS.txt

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar credenciales
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEETS_ID;
    
    if (!serviceAccountKey || !spreadsheetId) {
      return NextResponse.json(
        { error: 'Google Sheets no está configurado. Verifica variables de entorno.' },
        { status: 500 }
      );
    }

    // 2. Parsear credenciales
    const serviceAccount = JSON.parse(serviceAccountKey);

    // 3. Crear cliente de autenticación
    const auth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    // 4. Crear cliente de Sheets API
    const sheets = google.sheets({ version: 'v4', auth });

    // 5. Obtener datos del request
    const body = await request.json();
    
    // 6. Convertir datos a array de valores
    const values = [
      [
        body.timestamp || new Date().toISOString(),
        body.nombre || '',
        body.apellido || '',
        body.email || '',
        body.ubicacion || '',
        body.services || '',
        body.fecha || '',
        body.hora || '',
        body.mensaje || '',
      ],
    ];

    // 7. Agregar datos a la hoja
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Sheet1!A:I', // Ajusta el rango según tus necesidades
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Datos guardados en Google Sheets',
    });
  } catch (error) {
    console.error('Error al guardar en Sheets:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al guardar en Google Sheets',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
