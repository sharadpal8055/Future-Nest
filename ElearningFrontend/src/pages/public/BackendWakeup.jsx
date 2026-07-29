import { Loader2, Server } from "lucide-react";

export default function BackendWakeup() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center">
        <Server
          className="mx-auto mb-5 text-indigo-600"
          size={48}
        />

        <Loader2
          className="mx-auto animate-spin text-indigo-600"
          size={40}
        />

        <h2 className="mt-5 text-2xl font-bold">
          Waking up the server...
        </h2>

        <p className="mt-2 text-gray-500">
          The backend is hosted on Render's free
          plan and may take up to 50 seconds to
          start after inactivity.
        </p>
      </div>
    </div>
  );
}