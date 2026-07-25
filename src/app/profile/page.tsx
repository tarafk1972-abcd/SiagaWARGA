import { User, Settings, LogOut, FileText } from "lucide-react";

export default function ProfilePage() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col items-center justify-center py-6 bg-white border border-gray-100 rounded-2xl shadow-sm">
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-4">
          <User size={40} className="text-gray-400" />
        </div>
        <h2 className="text-xl font-bold">Ahmad Warga</h2>
        <p className="text-sm text-gray-500">Block B2 No. 8</p>
        <span className="mt-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2.5 py-0.5 rounded">Resident</span>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between active:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <User className="text-gray-500" size={20} />
            <span className="text-sm font-medium">Edit Profile</span>
          </div>
        </div>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between active:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <FileText className="text-gray-500" size={20} />
            <span className="text-sm font-medium">My Reports</span>
          </div>
        </div>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between active:bg-gray-50 cursor-pointer">
          <div className="flex items-center gap-3">
            <Settings className="text-gray-500" size={20} />
            <span className="text-sm font-medium">Settings</span>
          </div>
        </div>
        <div className="p-4 flex items-center justify-between active:bg-red-50 cursor-pointer">
          <div className="flex items-center gap-3 text-red-600">
            <LogOut size={20} />
            <span className="text-sm font-medium">Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}