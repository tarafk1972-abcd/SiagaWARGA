"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

type Language = "id" | "en";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const dict: Record<Language, Record<string, string>> = {
  id: {
    nav_home: "Beranda",
    nav_patrol: "Ronda",
    nav_report: "Lapor",
    nav_contact: "Kontak",
    nav_announce: "Info",
    nav_admin: "Admin",
    reg_title: "Pendaftaran Perangkat",
    reg_subtitle: "Daftarkan HP Anda ke sistem Keamanan Lingkungan",
    reg_phone: "Nomor HP",
    reg_name: "Nama Lengkap",
    reg_block: "Blok / Nomor Rumah",
    reg_lang: "Pilih Bahasa / Language",
    reg_btn: "Daftar Sekarang",
    home_status: "Aman Terkendali",
    home_guard: "2 Petugas Keamanan Berjaga",
    home_panic: "TOMBOL DARURAT",
    home_panic_desc: "Tekan saat keadaan darurat. Peringatan akan langsung terkirim ke pos satpam dan warga sekitar.",
    home_recent: "Aktivitas Terbaru",
    home_view_all: "Lihat Semua"
  },
  en: {
    nav_home: "Home",
    nav_patrol: "Patrol",
    nav_report: "Reports",
    nav_contact: "Contacts",
    nav_announce: "Announce",
    nav_admin: "Admin",
    reg_title: "Device Registration",
    reg_subtitle: "Register your phone to the Neighborhood Security system",
    reg_phone: "Phone Number",
    reg_name: "Full Name",
    reg_block: "Block / House Number",
    reg_lang: "Choose Language",
    reg_btn: "Register Now",
    home_status: "Safe & Secure",
    home_guard: "2 Security Guards on duty",
    home_panic: "PANIC BUTTON",
    home_panic_desc: "Press in case of emergency. This will alert security and nearby neighbors immediately.",
    home_recent: "Recent Activity",
    home_view_all: "View All"
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("id");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("app_lang") as Language;
    if (saved && (saved === "id" || saved === "en")) {
      setLanguageState(saved);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("app_lang", lang);
  };

  const t = (key: string) => {
    return dict[language][key] || key;
  };

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) return <div className="min-h-screen bg-gray-50"></div>;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
