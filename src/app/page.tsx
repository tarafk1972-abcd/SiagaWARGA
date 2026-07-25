"use client";

import { useState } from "react";
import { AlertCircle, Shield, Bell, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import Link from "next/link";

export default function Home() {
  const [isPressing, setIsPressing] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { t, language } = useLanguage();

  const handlePanicPress = () => {
    if (cooldown > 0) return;
    
    // Simulate panic button trigger
    alert(language === "id" ? "PERINGATAN DARURAT TERKIRIM KE PETUGAS DAN WARGA!" : "EMERGENCY ALERT SENT TO SECURITY AND NEIGHBORS!");
    setCooldown(10);
    
    // Simple cooldown timer
    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="p-4 space-y-6">
      
      {/* Link to Registration Demo */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-center justify-between">
        <span className="text-sm text-blue-800 font-medium">Have you registered your device?</span>
        <Link href="/register" className="bg-blue-600 text-white text-xs px-3 py-1.5 rounded-full font-bold">
          Register
        </Link>
      </div>

      {/* Status Banner */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center space-x-3">
        <div className="bg-green-500 p-2 rounded-full">
          <Shield className="text-white" size={20} />
        </div>
        <div>
          <h3 className="font-semibold text-green-900 text-sm">Status: {t("home_status")}</h3>
          <p className="text-green-700 text-xs">{t("home_guard")}</p>
        </div>
      </div>

      {/* PANIC BUTTON */}
      <div className="flex flex-col items-center justify-center py-8">
        <button
          onMouseDown={() => setIsPressing(true)}
          onMouseUp={() => setIsPressing(false)}
          onMouseLeave={() => setIsPressing(false)}
          onTouchStart={() => setIsPressing(true)}
          onTouchEnd={() => setIsPressing(false)}
          onClick={handlePanicPress}
          disabled={cooldown > 0}
          className={cn(
            "relative group flex items-center justify-center rounded-full transition-all duration-200 shadow-xl",
            "w-48 h-48 md:w-56 md:h-56",
            cooldown > 0 
              ? "bg-gray-300 cursor-not-allowed" 
              : "bg-gradient-to-b from-red-500 to-red-700 hover:from-red-600 hover:to-red-800 active:scale-95",
            isPressing && cooldown === 0 ? "scale-95 shadow-inner" : ""
          )}
        >
          {cooldown === 0 && (
            <div className="absolute inset-0 rounded-full border-4 border-red-400 animate-ping opacity-20"></div>
          )}
          
          <div className="flex flex-col items-center text-white space-y-2">
            <AlertCircle size={64} className={cooldown > 0 ? "text-gray-500" : "text-white"} />
            <span className="font-bold text-xl tracking-wider text-center px-4">
              {cooldown > 0 ? `${cooldown}s` : t("home_panic")}
            </span>
          </div>
        </button>
        <p className="text-gray-500 text-sm mt-6 text-center px-4">
          {t("home_panic_desc")}
        </p>
      </div>

      {/* Recent Alerts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-gray-900 flex items-center gap-2">
            <Bell size={18} />
            {t("home_recent")}
          </h2>
          <button className="text-red-600 text-sm font-medium">{t("home_view_all")}</button>
        </div>
        
        <div className="space-y-3">
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex gap-3">
            <div className="bg-orange-100 p-2 rounded-full h-fit">
              <MapPin className="text-orange-600" size={16} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Laporan Orang Mencurigakan</h4>
              <p className="text-xs text-gray-500 mt-1">Blok A3, dekat taman warga.</p>
              <p className="text-xs text-gray-400 mt-2">10 menit yang lalu</p>
            </div>
          </div>
          
          <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm flex gap-3">
            <div className="bg-blue-100 p-2 rounded-full h-fit">
              <Shield className="text-blue-600" size={16} />
            </div>
            <div>
              <h4 className="font-semibold text-sm">Patroli Malam Dimulai</h4>
              <p className="text-xs text-gray-500 mt-1">Pak Budi dan Pak Agus sedang berkeliling.</p>
              <p className="text-xs text-gray-400 mt-2">2 jam yang lalu</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}