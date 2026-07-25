import { Megaphone, MessageSquare, Info, ShieldAlert } from "lucide-react";

export default function BroadcastPage() {
  const announcements = [
    {
      id: 1,
      type: "urgent",
      title: "Warning: Motorbike Theft Nearby",
      message: "A motorbike was reported stolen in the adjacent neighborhood (RW 04) yesterday. Please ensure all gates are locked and vehicles are parked inside after 10 PM.",
      date: "Today, 08:30 AM",
      sender: "Pak RT",
    },
    {
      id: 2,
      type: "info",
      title: "Fogging (Mosquito Control) Schedule",
      message: "Dengue fever fogging will take place this Sunday from 07:00 AM to 10:00 AM. Please keep your windows closed during this time.",
      date: "Yesterday",
      sender: "RW Office",
    },
    {
      id: 3,
      type: "general",
      title: "Monthly Security Fee (Iuran)",
      message: "A friendly reminder that the monthly security and garbage collection fee for July is due this week. Please hand it to Pak Budi at the security pos.",
      date: "20 Jul",
      sender: "Treasurer",
    }
  ];

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col space-y-2">
        <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
          <Megaphone size={20} className="text-red-600" />
          Community Broadcasts
        </h2>
        <p className="text-sm text-gray-500">
          Important announcements from the neighborhood committee.
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((item) => (
          <div 
            key={item.id} 
            className={`bg-white border rounded-xl p-4 shadow-sm relative overflow-hidden ${
              item.type === 'urgent' ? 'border-red-300' : 'border-gray-200'
            }`}
          >
            {item.type === 'urgent' && (
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-600"></div>
            )}
            
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full mt-1 ${
                item.type === 'urgent' ? 'bg-red-100 text-red-600' : 
                item.type === 'info' ? 'bg-blue-100 text-blue-600' : 
                'bg-gray-100 text-gray-600'
              }`}>
                {item.type === 'urgent' ? <ShieldAlert size={18} /> : 
                 item.type === 'info' ? <Info size={18} /> : 
                 <MessageSquare size={18} />}
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between items-start mb-1">
                  <h3 className={`font-bold text-sm ${item.type === 'urgent' ? 'text-red-700' : 'text-gray-900'}`}>
                    {item.title}
                  </h3>
                </div>
                
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider block mb-2">
                  FROM: {item.sender} • {item.date}
                </span>
                
                <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
                  {item.message}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}