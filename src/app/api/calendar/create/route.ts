import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// ============================================
// 📅 API ROUTE: Crear evento en Google Calendar
// ============================================
// Para configurar, ve a: INSTRUCCIONES-APIS.txt

export async function POST(request: NextRequest) {
  try {
    // 1. Verificar que las credenciales estén configuradas
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (!serviceAccountKey) {
      return NextResponse.json(
        { error: 'Google Calendar no está configurado. Agrega GOOGLE_SERVICE_ACCOUNT_KEY en .env.local' },
        { status: 500 }
      );
    }

    // 2. Parsear credenciales
    const serviceAccount = JSON.parse(serviceAccountKey);

    // 3. Crear cliente de autenticación
    const auth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar'],
    });

    // 4. Crear cliente de Calendar API
    const calendar = google.calendar({ version: 'v3', auth });

    // 5. Obtener datos del request
    const body = await request.json();
    const { title, description, startTime, endTime, attendeeEmail } = body;

    // 6. Crear evento
    const event = {
      summary: title,
      description: description || '',
      start: {
        dateTime: startTime,
        timeZone: 'America/Argentina/Buenos_Aires', // Ajusta tu zona horaria
      },
      end: {
        dateTime: endTime,
        timeZone: 'America/Argentina/Buenos_Aires',
      },
      attendees: attendeeEmail ? [{ email: attendeeEmail }] : [],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 30 },
        ],
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary', // Usa 'primary' o tu Calendar ID específico
      requestBody: event,
    });

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
    });
  } catch (error) {
    console.error('Error al crear evento en Calendar:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al crear evento',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
