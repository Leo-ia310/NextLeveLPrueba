// ============================================
// 📅 GOOGLE CALENDAR INTEGRATION
// ============================================
// Para obtener tus credenciales, ve al archivo:
// INSTRUCCIONES-APIS.txt en la raíz del proyecto

export interface CalendarEventData {
  nombre: string;
  email: string;
  fecha: string;
  hora: string;
  services: string;
  mensaje?: string;
}

/**
 * Crea un evento en Google Calendar
 * Usa el API route en /api/calendar/create
 */
export async function createCalendarEvent(data: CalendarEventData): Promise<string | null> {
  try {
    // Combinar fecha y hora
    const [year, month, day] = data.fecha.split('-');
    const [hour, minute] = data.hora.split(':');
    
    const startTime = new Date(
      parseInt(year),
      parseInt(month) - 1,
      parseInt(day),
      parseInt(hour),
      parseInt(minute)
    );
    
    // 30 minutos de duración
    const endTime = new Date(startTime.getTime() + 30 * 60 * 1000);
    
    const response = await fetch('/api/calendar/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: `Consulta: ${data.services} - ${data.nombre}`,
        description: data.mensaje || 'Consulta de servicios',
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        attendeeEmail: data.email,
      }),
    });

    if (!response.ok) {
      throw new Error('Error al crear evento en Calendar');
    }
    
    const result = await response.json();
    console.log('✅ Evento creado en Google Calendar:', result.eventId);
    return result.eventId;
  } catch (error) {
    console.error('❌ Error al crear evento en Calendar:', error);
    throw error;
  }
}

/**
 * Obtiene eventos del calendario para verificar disponibilidad
 */
export async function getCalendarEvents(date: string): Promise<any[]> {
  try {
    const response = await fetch(`/api/calendar/events?date=${date}`);
    
    if (!response.ok) {
      throw new Error('Error al obtener eventos');
    }
    
    const result = await response.json();
    return result.events || [];
  } catch (error) {
    console.error('❌ Error al obtener eventos:', error);
    return [];
  }
}

/**
 * Verifica si una fecha/hora específica está disponible
 */
export async function checkAvailability(date: string, time: string): Promise<boolean> {
  try {
    const events = await getCalendarEvents(date);
    
    // Verificar si hay conflictos con la hora seleccionada
    const [hour, minute] = time.split(':');
    const selectedTime = new Date(date);
    selectedTime.setHours(parseInt(hour), parseInt(minute));
    
    const hasConflict = events.some((event: any) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);
      return selectedTime >= eventStart && selectedTime < eventEnd;
    });
    
    return !hasConflict;
  } catch (error) {
    console.error('Error al verificar disponibilidad:', error);
    return true; // En caso de error, asumir disponible
  }
}
