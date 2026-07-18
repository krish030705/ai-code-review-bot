const stats = [
  { label: "Total Reviews", value: "0", accent: "text-indigo-400" },
  { label: "Active Projects", value: "0", accent: "text-emerald-400" },
  { label: "Issues Resolved", value: "0", accent: "text-amber-400" },
];

export default function Dashboard() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Overview of your code review activity</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white/5 border border-white/10 rounded-xl p-5">
            <p className="text-slate-400 text-xs font-medium">{s.label}</p>
            <p className={`text-3xl font-semibold mt-2 ${s.accent}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <h2 className="text-white font-medium mb-1">Recent Reviews</h2>
        <p className="text-slate-500 text-sm mb-4">Your latest AI code reviews will show up here</p>
        <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-white/10 rounded-lg">
          <svg className="w-10 h-10 text-slate-600 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-slate-500 text-sm">No reviews yet — create a project to get started</p>
        </div>
      </div>
    </div>
  );
}