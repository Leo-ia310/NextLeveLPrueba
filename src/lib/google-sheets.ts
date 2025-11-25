// ============================================
// 📊 GOOGLE SHEETS INTEGRATION
// ============================================
// Para obtener tus credenciales, ve al archivo:
// INSTRUCCIONES-APIS.txt en la raíz del proyecto

export interface SheetFormData {
  nombre: string;
  apellido: string;
  telefono: string;
  email: string;
  ubicacion: string;
  services: string;
  fecha: string;
  hora: string;
  mensaje: string;
  timestamp: string;
}

/**
 * OPCIÓN 1: Google Apps Script (MÁS SIMPLE - RECOMENDADO)
 * Envía datos al webhook de Apps Script
 */
export async function sendToGoogleSheet(data: SheetFormData): Promise<boolean> {
  const appsScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
  
  if (!appsScriptUrl) {
    console.warn('⚠️ APPS_SCRIPT_URL no configurada');
    return false;
  }
  
  try {
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Apps Script respondió con status ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Datos guardados en Google Sheets:', result);
    return result.success;
  } catch (error) {
    console.error('❌ Error al guardar en Google Sheets:', error);
    throw error;
  }
}

/**
 * OPCIÓN 2: Sheets API (Más complejo, para uso avanzado)
 * Requiere Service Account - Ver INSTRUCCIONES-APIS.txt
 */
export async function sendToGoogleSheetAPI(data: SheetFormData): Promise<boolean> {
  try {
    const response = await fetch('/api/sheets/append', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Error al enviar a Sheets API');
    }
    
    return true;
  } catch (error) {
    console.error('❌ Error al enviar a Sheets API:', error);
    throw error;
  }
}

/**
 * Nueva función: Verificar disponibilidad en Google Sheets
 * Lee los datos existentes y verifica si la fecha (columna G) y hora (columna H) ya están ocupadas.
 * Devuelve true si está disponible, false si no.
 */
export async function checkAvailabilityInSheet(date: string, time: string): Promise<boolean> {
  const appsScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;
  
  if (!appsScriptUrl) {
    console.warn('⚠️ APPS_SCRIPT_URL no configurada');
    return false;
  }
  
  try {
    // Envía una solicitud al Apps Script con un "action" para indicar que es una verificación de disponibilidad
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'checkAvailability',  // Indicador para que Apps Script sepa que es una consulta, no un envío
        date,
        time,
      }),
    });

    if (!response.ok) {
      throw new Error(`Apps Script respondió con status ${response.status}`);
    }
    
    const result = await response.json();
    console.log('✅ Verificación de disponibilidad:', result);
    
    // Asume que Apps Script devuelve { available: boolean }
    return result.available || false;  // Si no hay 'available', asume false
  } catch (error) {
    console.error('❌ Error al verificar disponibilidad en Google Sheets:', error);
    return false;  // En caso de error, asume no disponible
  }
}

/**
 * Obtiene los horarios ocupados para un día específico desde Google Sheets.
 * Espera que Apps Script responda con { slots: string[] } donde cada elemento es "HH:mm".
 */
export async function getBookedSlotsFromSheet(date: string): Promise<string[]> {
  const appsScriptUrl = process.env.NEXT_PUBLIC_APPS_SCRIPT_URL;

  if (!appsScriptUrl) {
    console.warn('⚠️ APPS_SCRIPT_URL no configurada');
    return [];
  }

  try {
    const response = await fetch(appsScriptUrl, {
      method: 'POST',
      body: JSON.stringify({
        action: 'getBookedSlots',
        date,
      }),
    });

    if (!response.ok) {
      throw new Error(`Apps Script respondió con status ${response.status}`);
    }

    const result = await response.json();
    console.log('✅ Slots ocupados recibidos de Google Sheets:', result);

    // Asume que Apps Script devuelve { slots: string[] }
    return Array.isArray(result.slots) ? result.slots : [];
  } catch (error) {
    console.error('❌ Error al obtener horarios ocupados desde Google Sheets:', error);
    return [];
  }
}
