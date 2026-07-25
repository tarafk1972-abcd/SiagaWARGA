"use client";

import { AlertTriangle, MapPin, Phone, ShieldAlert, CheckCircle2, Clock } from "lucide-react";
import { useState } from "react";
import SecurityMap from "@/components/SecurityMap";

export default function AdminPage() {
  const [activeAlerts, setActiveAlerts] = useState([
    {
      id: 1,
      type: "PANIC BUTTON PRESSED",
      sender: "Ibu Ratna",
      address: "Block B4 No. 12",
      time: "Just now",
      status: "critical",
    },
    {
      id: 2,
      type: "Suspicious Person",
      sender: "Pak Anton",
      address: "Park Area, near Block C",
      time: "5 mins ago",
      status: "warning",
    }
  ]);

  const resolveAlert = (id: number) => {
    setActiveAlerts(activeAlerts.filter(alert => alert.id !== id));
  };

  return (
    <div className="p-4 space-y-6 bg-gray-900 min-h-[calc(100vh-64px)] text-white">
      <div className="flex items-center justify-between border-b border-gray-700 pb-4">
        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            <ShieldAlert className="text-red-500" />
            Security Command
          </h2>
          <p className="text-sm text-gray-400 mt-1">Live Monitor & Dispatch</p>
        </div>
        <div className="bg-green-500/20 text-green-400 border border-green-500/50 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          SYSTEM ONLINE
        </div>
      </div>

      {/* Interactive Map Section */}
      <div className="space-y-2">
        <h3 className="font-semibold text-gray-300 text-sm">Live Area Map</h3>
        <SecurityMap />
        <div className="flex gap-4 text-xs text-gray-400 pt-1">
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-blue-500 rounded-full"></span> Guards</span>
          <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span> Alerts</span>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-semibold text-gray-300 flex items-center gap-2">
          <AlertTriangle size={18} className="text-orange-400" />
          Incoming Alerts ({activeAlerts.length})
        </h3>

        {activeAlerts.length === 0 ? (
          <div className="text-center py-10 bg-gray-800/50 rounded-xl border border-gray-700">
            <CheckCircle2 size={40} className="text-green-500 mx-auto mb-3" />
            <p className="font-medium text-gray-300">No active alerts.</p>
            <p className="text-sm text-gray-500">Area is secure.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map((alert) => (
              <div 
                key={alert.id} 
                className={`border rounded-xl p-4 relative overflow-hidden ${
                  alert.status === 'critical' 
                    ? 'bg-red-950/40 border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                    : 'bg-orange-950/40 border-orange-500/50'
                }`}
              >
                {alert.status === 'critical' && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-red-600 animate-pulse"></div>
                )}
                
                <div className="flex justify-between items-start mb-3">
                  <h4 className={`font-bold text-lg ${alert.status === 'critical' ? 'text-red-400' : 'text-orange-400'}`}>
                    {alert.type}
                  </h4>
                  <span className="flex items-center gap-1 text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded">
                    <Clock size={12} />
                    {alert.time}
                  </span>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-gray-300 text-sm">
                    <Phone size={16} className="text-blue-400" />
                    <span>Sender: <strong>{alert.sender}</strong></span>
                  </div>
                  <div className="flex items-start gap-2 text-gray-300 text-sm">
                    <MapPin size={16} className="text-orange-400 mt-0.5" />
                    <span>Location: <strong>{alert.address}</strong></span>
                  </div>
                </div>

                <div className="flex gap-2 mt-4 pt-4 border-t border-gray-700/50">
                  <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-semibold transition-colors">
                    Dispatch Team
                  </button>
                  <button 
                    onClick={() => resolveAlert(alert.id)}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-gray-300 border border-gray-600 py-2 rounded-lg text-sm font-semibold transition-colors"
                  >
                    Mark Resolved
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}