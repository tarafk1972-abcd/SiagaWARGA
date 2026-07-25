"use client";

import { Calendar, Clock, MapPin, Users, CheckCircle2, WifiOff } from "lucide-react";
import { useState, useEffect } from "react";

export default function PatrolPage() {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isOffline, setIsOffline] = useState(false);

  useEffect(() => {
    // Listen for offline/online browser events
    const handleOffline = () => setIsOffline(true);
    const handleOnline = () => {
      setIsOffline(false);
      if (isCheckedIn) {
        // Automatically alert when coming back online if they checked in offline
        alert("✅ Internet Restored!\n\nYour pending offline check-in has been successfully synced to the Admin Dashboard.");
      }
    };

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      setIsOffline(true);
    }

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, [isCheckedIn]);

  const handleCheckIn = () => {
    if (isOffline) {
      alert("⚠️ Tidak Ada Koneksi Internet (Kuota Habis/Sinyal Hilang)!\n\nLokasi Anda disimpan LOKAL di HP ini. Akan otomatis tersinkronisasi ke Dashboard Admin setelah internet kembali menyala.");
      setIsCheckedIn(true);
    } else {
      alert("📍 Posisi Berhasil Dicatat: Titik Kumpul (Gerbang Utama)\n\nTerima kasih. Posisi Anda sudah diperbarui di sistem Admin Warga.");
      setIsCheckedIn(true);
    }
  };

  const schedule = [
    {
      day: "Hari Ini, 25 Jul",
      status: "active", // active, upcoming, past
      shift: "Shift Malam (22:00 - 04:00)",
      team: ["Pak Budi (Blok A)", "Pak Agus (Blok C)"],
      area: "Zona 1 & 2 (Gerbang Utama s/d Taman)",
    },
    {
      day: "Besok, 26 Jul",
      status: "upcoming",
      shift: "Shift Malam (22:00 - 04:00)",
      team: ["Pak Joko (Blok B)", "Mas Dimas (Blok A)"],
      area: "Zona 3 & 4 (Gerbang Belakang s/d Masjid)",
    },
    {
      day: "Kemarin, 24 Jul",
      status: "past",
      shift: "Shift Malam (22:00 - 04:00)",
      team: ["Pak Hendra (Blok C)", "Pak Anton (Blok B)"],
      area: "Semua Zona (Ronda Gabungan)",
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Calendar size={20} className="text-red-600" />
            Jadwal Ronda Malam
          </h2>
          {isOffline && (
            <span className="bg-yellow-100 text-yellow-800 text-xs font-bold px-2 py-1 rounded flex items-center gap-1 animate-pulse">
              <WifiOff size={12} />
              Mode Luring (Offline)
            </span>
          )}
        </div>
        <p className="text-sm text-gray-500">
          Daftar giliran tugas jaga malam / ronda untuk lingkungan WargaJagaWarga.
        </p>
      </div>

      <div className="space-y-4">
        {schedule.map((item, idx) => (
          <div 
            key={idx} 
            className={`border rounded-xl p-4 shadow-sm relative overflow-hidden bg-white ${
              item.status === 'active' ? 'border-red-300' : 'border-gray-200'
            }`}
          >
            {/* Active Indicator Line */}
            {item.status === 'active' && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600"></div>
            )}

            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className={`font-bold ${item.status === 'active' ? 'text-red-700' : 'text-gray-900'}`}>
                  {item.day}
                </h3>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                  <Clock size={14} />
                  <span>{item.shift}</span>
                </div>
              </div>
              
              {item.status === 'active' && (
                <span className="bg-red-100 text-red-700 text-xs font-bold px-2.5 py-1 rounded-full animate-pulse">
                  SEDANG TUGAS
                </span>
              )}
              {item.status === 'past' && (
                <span className="bg-green-100 text-green-700 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle2 size={12} />
                  Selesai
                </span>
              )}
            </div>

            <div className="space-y-2 mt-4 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <div className="flex items-start gap-2">
                <Users size={16} className="text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-700">Regu Jaga:</span>
                  <ul className="list-disc list-inside text-gray-600 ml-1">
                    {item.team.map((member, i) => (
                      <li key={i}>{member}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="flex items-start gap-2 pt-2 border-t border-gray-200 mt-2">
                <MapPin size={16} className="text-orange-600 mt-0.5" />
                <div className="text-sm">
                  <span className="font-semibold block text-gray-700">Area/Rute Patroli:</span>
                  <span className="text-gray-600">{item.area}</span>
                </div>
              </div>
            </div>
            
            {item.status === 'active' && !isCheckedIn && (
              <button 
                onClick={handleCheckIn}
                className={`w-full mt-4 border font-semibold py-2 rounded-lg text-sm active:scale-95 transition-all flex justify-center items-center gap-2 ${
                  isOffline 
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100" 
                    : "bg-red-50 text-red-600 border-red-200 hover:bg-red-100"
                }`}
              >
                {isOffline && <WifiOff size={16} />}
                {isOffline ? "Lapor Posisi (Mode Offline)" : "Lapor Posisi Pos Jaga (Check-in)"}
              </button>
            )}
            
            {item.status === 'active' && isCheckedIn && (
              <div className={`w-full mt-4 border font-semibold py-2 rounded-lg text-sm flex items-center justify-center gap-2 ${
                isOffline 
                  ? "bg-yellow-50 text-yellow-700 border-yellow-200" 
                  : "bg-green-50 text-green-700 border-green-200"
              }`}>
                {isOffline ? <WifiOff size={18} /> : <CheckCircle2 size={18} />}
                {isOffline ? "Menunggu Sinyal (Disimpan Lokal)" : "Posisi Berhasil Dicatat"}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}