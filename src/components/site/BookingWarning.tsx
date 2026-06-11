import { Info } from "lucide-react";

export const BookingWarning = ({ className = "" }: { className?: string }) => (
  <div
    role="note"
    className={`inline-flex items-center gap-2 rounded-full border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-800 ${className}`}
  >
    <Info className="h-3.5 w-3.5 shrink-0" />
    <span>Please read the description carefully before making an enquiry.</span>
  </div>
);

export default BookingWarning;
