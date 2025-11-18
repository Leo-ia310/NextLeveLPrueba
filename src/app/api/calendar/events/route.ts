import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { JWT } from 'google-auth-library';

// ============================================
// 📅 API ROUTE: Obtener eventos de Google Calendar
// ============================================

export async function GET(request: NextRequest) {
  try {
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    
    if (!serviceAccountKey) {
      return NextResponse.json(
        { error: 'Google Calendar no configurado' },
        { status: 500 }
      );
    }

    const serviceAccount = JSON.parse(serviceAccountKey);
    const auth = new JWT({
      email: serviceAccount.client_email,
      key: serviceAccount.private_key,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Obtener parámetro de fecha de la query string
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

    if (!date) {
      return NextResponse.json({ error: 'Fecha requerida' }, { status: 400 });
    }

    // Obtener eventos del día especificado
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];

    return NextResponse.json({
      success: true,
      events: events.map((event) => ({
        id: event.id,
        title: event.summary,
        start: event.start?.dateTime || event.start?.date,
        end: event.end?.dateTime || event.end?.date,
      })),
    });
  } catch (error) {
    console.error('Error al obtener eventos:', error);
    
    return NextResponse.json(
      { 
        error: 'Error al obtener eventos',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    );
  }
}
