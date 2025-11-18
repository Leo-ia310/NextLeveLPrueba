import emailjs from '@emailjs/browser';

// ============================================
// 📧 CONFIGURACIÓN DE EMAILJS
// ============================================
// Para obtener tus credenciales, ve al archivo:
// INSTRUCCIONES-APIS.txt en la raíz del proyecto

export const initEmailJS = () => {
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
  
  if (!publicKey) {
    console.warn('⚠️ EMAILJS_PUBLIC_KEY no configurada');
    return;
  }
  
  emailjs.init({
    publicKey: publicKey,
  });
};

interface EmailParams {
  to_email: string;
  from_name: string;
  from_email: string;
  phone?: string;
  company_sector?: string;
  services?: string;
  preferred_date?: string;
  preferred_time?: string;
  message: string;
  [key: string]: string | undefined;
}

export const sendEmail = async (params: EmailParams): Promise<void> => {
  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  
  if (!serviceId || !templateId) {
    throw new Error('EmailJS no está configurado. Verifica tus variables de entorno.');
  }
  
  try {
    const response = await emailjs.send(
      serviceId,
      templateId,
      params
    );

    if (response.status !== 200) {
      throw new Error(`EmailJS falló con status ${response.status}`);
    }
    
    console.log('✅ Email enviado exitosamente:', response);
  } catch (error) {
    console.error('❌ Error al enviar email:', error);
    if (error instanceof Error) {
      throw new Error(`Error al enviar email: ${error.message}`);
    }
    throw error;
  }
};
