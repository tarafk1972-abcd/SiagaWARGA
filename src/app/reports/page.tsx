import { Camera, Send } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-4 space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-900">Submit a Report</h2>
      </div>
      
      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Incident Type</label>
          <select className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-red-500 focus:border-red-500 bg-white">
            <option>Suspicious Activity</option>
            <option>Theft / Break-in</option>
            <option>Fire</option>
            <option>Medical Emergency</option>
            <option>Other Facility Issue</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location / Address</label>
          <input 
            type="text" 
            placeholder="e.g. Block C4 No. 12" 
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-red-500 focus:border-red-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea 
            rows={4}
            placeholder="Describe what happened..." 
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-red-500 focus:border-red-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Photo Evidence (Optional)</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center text-gray-500 bg-gray-50">
            <Camera size={32} className="mb-2 text-gray-400" />
            <span className="text-sm">Tap to upload a photo</span>
          </div>
        </div>

        <button 
          type="button" 
          className="w-full bg-red-600 text-white font-bold rounded-lg p-4 flex items-center justify-center gap-2 hover:bg-red-700 active:scale-95 transition-all"
        >
          <Send size={18} />
          Submit Report
        </button>
      </form>
    </div>
  );
}