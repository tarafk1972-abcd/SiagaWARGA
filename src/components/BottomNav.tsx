"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, AlertTriangle, Phone, Calendar, ShieldAlert, Megaphone } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";

export function BottomNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { name: t("nav_home"), href: "/", icon: Home },
    { name: t("nav_patrol"), href: "/patrol", icon: Calendar },
    { name: t("nav_report"), href: "/reports", icon: AlertTriangle },
    { name: t("nav_contact"), href: "/contacts", icon: Phone },
    { name: t("nav_announce"), href: "/broadcast", icon: Megaphone },
    { name: t("nav_admin"), href: "/admin", icon: ShieldAlert },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
                isActive ? "text-red-600" : "text-gray-500 hover:text-gray-900"
              )}
            >
              <Icon size={24} className={cn(isActive && "fill-red-100")} />
              <span className="text-[10px] font-medium">{item.name}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}