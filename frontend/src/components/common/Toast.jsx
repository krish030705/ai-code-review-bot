export default function Toast({ message, visible }) {
  return (
    <div
      aria-live="assertive"
      className={`fixed bottom-6 left-1/2 z-50 w-full max-w-sm -translate-x-1/2 transform transition duration-300 ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="rounded-2xl bg-slate-900 px-5 py-4 text-sm font-medium text-white shadow-2xl ring-1 ring-white/10">
        {message}
      </div>
    </div>
  );
}
