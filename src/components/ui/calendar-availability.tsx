"use client";

import { useState, useEffect } from 'react';
import { Calendar, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { checkAvailabilityInSheet, getBookedSlotsFromSheet } from '@/lib/google-sheets';

interface CalendarAvailabilityProps {
  selectedDate: string;
  selectedTime: string;
  onAvailabilityCheck: (isAvailable: boolean) => void;
}

export function CalendarAvailability({ 
  selectedDate, 
  selectedTime, 
  onAvailabilityCheck 
}: CalendarAvailabilityProps) {
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState<boolean | null>(null);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);

  useEffect(() => {
    if (selectedDate && selectedTime) {
      checkAvailability();
    }
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    if (selectedDate) {
      loadDayEvents();
    }
  }, [selectedDate]);

  const loadDayEvents = async () => {
    if (!selectedDate) return;
    try {
      const slots = await getBookedSlotsFromSheet(selectedDate);
      setBookedSlots(slots);
    } catch (error) {
      console.error('Error al cargar horarios ocupados del día desde Sheets:', error);
      setBookedSlots([]);
    }
  };

  const checkAvailability = async () => {
    setIsChecking(true);
    try {
      // Primero intenta verificar con Sheets
      const available = await checkAvailabilityInSheet(selectedDate, selectedTime);
      setIsAvailable(available);
      onAvailabilityCheck(available);

      // En paralelo/tras la verificación, refresca los slots ocupados del día
      loadDayEvents();
    } catch (error) {
      console.error('Error al verificar disponibilidad en Sheets:', error);
      // En caso de error, por seguridad marcamos como no disponible
      setIsAvailable(false);
      onAvailabilityCheck(false);
    } finally {
      setIsChecking(false);
    }
  };

  if (!selectedDate || !selectedTime) {
    return null;
  }

  return (
    <div className="mt-4 rounded-xl border border-[#009299]/30 bg-[#041b45]/60 p-4">
      <div className="flex items-center gap-2 mb-3">
        <Calendar className="h-5 w-5 text-[#009299]" />
        <h4 className="font-semibold text-white">Verificación de disponibilidad</h4>
      </div>

      {isChecking ? (
        <div className="flex items-center gap-2 text-white/70">
          <Clock className="h-4 w-4 animate-spin" />
          <span className="text-sm">Verificando disponibilidad...</span>
        </div>
      ) : isAvailable !== null ? (
        <div className={`flex items-start gap-3 p-3 rounded-lg ${
          isAvailable 
            ? 'bg-green-500/10 border border-green-500/30' 
            : 'bg-red-500/10 border border-red-500/30'
        }`}>
          {isAvailable ? (
            <>
              <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-green-400">
                  ✅ Horario disponible
                </p>
                <p className="text-xs text-white/70 mt-1">
                  {selectedDate} a las {selectedTime} está libre para reservar.
                </p>
              </div>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-400">
                  ❌ Horario ocupado
                </p>
                <p className="text-xs text-white/70 mt-1">
                  Este horario ya está reservado. Por favor selecciona otro.
                </p>
              </div>
            </>
          )}
        </div>
      ) : null}

      {bookedSlots.length > 0 && (
        <div className="mt-3 pt-3 border-t border-[#009299]/20">
          <p className="text-xs text-white/70 mb-2">
            Horarios ocupados este día:
          </p>
          <div className="flex flex-wrap gap-2">
            {bookedSlots.map((slot, index) => (
              <span 
                key={index}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs bg-red-500/20 text-red-300 border border-red-500/30"
              >
                <Clock className="h-3 w-3" />
                {slot}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
