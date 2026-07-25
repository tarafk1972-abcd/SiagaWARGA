import { Phone, ShieldAlert, HeartPulse, Flame } from "lucide-react";

export default function ContactsPage() {
  const contacts = [
    { name: "Security Pos", phone: "0812-3456-7890", icon: ShieldAlert, color: "bg-blue-100 text-blue-600" },
    { name: "Local Police Station", phone: "110", icon: ShieldAlert, color: "bg-gray-100 text-gray-800" },
    { name: "Ambulance / Medical", phone: "118", icon: HeartPulse, color: "bg-red-100 text-red-600" },
    { name: "Fire Department", phone: "113", icon: Flame, color: "bg-orange-100 text-orange-600" },
    { name: "Pak RT (Neighborhood Head)", phone: "0811-2222-3333", icon: Phone, color: "bg-green-100 text-green-600" },
  ];

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-lg font-bold text-gray-900">Emergency Contacts</h2>
      
      <div className="space-y-3">
        {contacts.map((contact, idx) => (
          <div key={idx} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${contact.color}`}>
                <contact.icon size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-sm">{contact.name}</h4>
                <p className="text-sm text-gray-500 mt-1">{contact.phone}</p>
              </div>
            </div>
            <a 
              href={`tel:${contact.phone}`}
              className="bg-green-500 text-white p-3 rounded-full hover:bg-green-600 transition-colors"
            >
              <Phone size={18} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}