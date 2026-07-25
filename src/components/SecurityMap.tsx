"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

// Because Leaflet needs the window object, we must dynamically import it so Next.js doesn't crash during Server Side Rendering.
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import("react-leaflet").then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

export default function SecurityMap() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    
    // Fix Leaflet's missing marker icon issue in Next.js/React
    import('leaflet').then((L) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
        iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
      });
    });
  }, []);

  if (!isMounted) {
    return <div className="h-64 w-full bg-gray-200 animate-pulse rounded-xl flex items-center justify-center">Loading Map...</div>;
  }

  // Example Coordinates (Jakarta / Bandung area center)
  const centerPosition: [number, number] = [-6.914744, 107.609810];

  return (
    <div className="h-64 w-full rounded-xl overflow-hidden border border-gray-300 relative z-0">
      <MapContainer 
        center={centerPosition} 
        zoom={16} 
        scrollWheelZoom={false} 
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Guard 1 Location */}
        <Marker position={[-6.914744, 107.609810]}>
          <Popup>
            <strong>Pak Budi</strong><br/>On Patrol
          </Popup>
        </Marker>
        
        {/* Guard 2 Location */}
        <Marker position={[-6.915200, 107.608000]}>
          <Popup>
            <strong>Pak Agus</strong><br/>On Patrol
          </Popup>
        </Marker>
        
        {/* Emergency Alert Location */}
        <Marker position={[-6.914000, 107.610500]}>
          <Popup>
            <span className="text-red-600 font-bold">⚠️ PANIC ALERT</span><br/>Ibu Ratna (Block B4)
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}