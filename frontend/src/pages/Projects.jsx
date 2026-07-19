import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createProject, listProjects } from "../api/projects";

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    listProjects()
      .then(setProjects)
      .catch((err) => setError(err.response?.data?.detail || "Failed to load projects"))
      .finally(() => setLoading(false));
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    try {
      const newProject = await createProject(name);
      setProjects([...projects, newProject]);
      setName("");
      setShowForm(false);
    } catch (err) {
      setError(err.response?.data?.detail || "Failed to create project");
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-1">Organize your code reviews by project</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition shadow-lg shadow-indigo-500/25"
        >
          + New Project
        </button>
      </div>

      {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

      {showForm && (
        <form onSubmit={handleCreate} className="bg-white/5 border border-white/10 rounded-xl p-4 mb-6 flex gap-3">
          <input
            autoFocus
            type="text"
            placeholder="Project name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-3 py-2 text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            style={{ color: "#ffffff", backgroundColor: "#1e293b" }}
          />
          <button type="submit" className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition">
            Create
          </button>
        </form>
      )}

      {loading ? (
        <p className="text-slate-500 text-sm">Loading projects...</p>
      ) : projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/10 rounded-xl">
          <p className="text-slate-500 text-sm">No projects yet — create your first one above</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/projects/${p.id}/review`)}
              className="border border-white/20 rounded-xl p-5 hover:border-indigo-400/60 transition cursor-pointer"
              style={{ backgroundColor: "#0f172a" }}
            >
              <h3 className="text-white font-medium">{p.name}</h3>
              <p className="text-slate-500 text-xs mt-1">
                Created {new Date(p.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}