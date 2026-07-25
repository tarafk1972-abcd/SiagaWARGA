"use client";

import { useLanguage } from "@/lib/i18n";
import { UserPlus, Globe, CheckCircle2 } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { t, language, setLanguage } = useLanguage();
  const router = useRouter();
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistered(true);
    setTimeout(() => {
      router.push("/");
    }, 2000);
  };

  if (isRegistered) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center">
        <CheckCircle2 size={80} className="text-green-500 mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
        <p className="text-gray-600">Your device is now connected to WargaJagaWarga.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-[calc(100vh-64px)] pb-20">
      <div className="text-center space-y-2 mt-4">
        <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserPlus size={32} className="text-red-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{t("reg_title")}</h2>
        <p className="text-sm text-gray-500 max-w-xs mx-auto">
          {t("reg_subtitle")}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        
        {/* Language Selection */}
        <div className="space-y-2 pb-4 border-b border-gray-100">
          <label className="text-sm font-semibold text-gray-700 flex items-center gap-2">
            <Globe size={16} />
            {t("reg_lang")}
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setLanguage("id")}
              className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                language === "id" 
                  ? "border-red-500 bg-red-50 text-red-700" 
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              🇮🇩 Bahasa Indonesia
            </button>
            <button
              type="button"
              onClick={() => setLanguage("en")}
              className={`p-3 rounded-xl border text-sm font-medium transition-all ${
                language === "en" 
                  ? "border-red-500 bg-red-50 text-red-700" 
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              🇬🇧 English
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("reg_phone")}</label>
          <input 
            type="tel" 
            required
            placeholder="0812-XXXX-XXXX" 
            className="w-full border border-gray-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("reg_name")}</label>
          <input 
            type="text" 
            required
            placeholder="e.g. Budi Santoso" 
            className="w-full border border-gray-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">{t("reg_block")}</label>
          <input 
            type="text" 
            required
            placeholder="e.g. Blok A4 No. 12" 
            className="w-full border border-gray-300 rounded-xl p-3.5 text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-gray-50 outline-none"
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-red-600 text-white font-bold rounded-xl p-4 mt-4 shadow-md shadow-red-200 hover:bg-red-700 active:scale-95 transition-all"
        >
          {t("reg_btn")}
        </button>
      </form>
    </div>
  );
}