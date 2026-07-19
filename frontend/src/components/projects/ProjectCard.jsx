import { useState } from "react";
import { FiMoreVertical, FiFolder, FiCalendar, FiClock, FiMessageCircle } from "react-icons/fi";

export default function ProjectCard({ project, onOpen, onDelete, onRename }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const formattedDate = new Date(project.created_at).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const subtitle = project.description || "No description available";

  return (
    <div
      className="group relative flex h-full flex-col justify-between rounded-[20px] border border-slate-200/80 bg-white p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-slate-300/40"
      tabIndex={0}
      aria-labelledby={`project-${project.id}-title`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700 shadow-sm">
            <FiFolder className="h-5 w-5" aria-hidden="true" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-slate-400">Project</p>
          </div>
        </div>
        <div className="relative">
          <button
            type="button"
            aria-label="Open project options"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <FiMoreVertical className="h-5 w-5" />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-12 z-20 w-40 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onOpen(project);
                }}
                className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
              >
                Open Project
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onRename(project);
                }}
                className="w-full rounded-xl px-3 py-2 text-left text-sm text-slate-700 transition hover:bg-slate-100"
              >
                Rename
              </button>
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onDelete(project);
                }}
                className="w-full rounded-xl px-3 py-2 text-left text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6">
        <h3 id={`project-${project.id}-title`} className="truncate text-xl font-semibold text-slate-900">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-6 text-slate-500">{subtitle}</p>
      </div>

      <div className="mt-6 grid gap-3 border-t border-slate-200 pt-4 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <FiCalendar className="h-4 w-4 text-indigo-500" aria-hidden="true" />
          <span className="font-medium text-slate-700">Created:</span>
          <span>{formattedDate}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiClock className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <span className="font-medium text-slate-700">Last Updated:</span>
          <span>{project.updated_at ? "2 hours ago" : "Just now"}</span>
        </div>
        <div className="flex items-center gap-2">
          <FiMessageCircle className="h-4 w-4 text-slate-500" aria-hidden="true" />
          <span className="font-medium text-slate-700">Reviews:</span>
          <span>{project.reviews_count ?? 0} Reviews</span>
        </div>
      </div>
    </div>
  );
}
