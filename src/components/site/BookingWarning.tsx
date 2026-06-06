import { AlertTriangle } from "lucide-react";

export const BookingWarning = ({ className = "" }: { className?: string }) => (
  <div
    role="alert"
    className={`flex items-start gap-3 rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm font-medium text-red-700 ${className}`}
  >
    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
    <span>Please read the description carefully before making a booking.</span>
  </div>
);

export default BookingWarning;
