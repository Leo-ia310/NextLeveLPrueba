// ============================================
// 📊 GOOGLE SHEETS INTEGRATION
// ============================================
// Para obtener tus credenciales, ve al archivo:
// INSTRUCCIONES-APIS.txt en la raíz del proyecto

export interface SheetFormData {
  nombre: string;
  apellido: string;
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
