import { useState } from "react";
import { useParams } from "react-router-dom";
import { submitCode } from "../api/projects";

const EXTENSION_TO_LANGUAGE = {
  py: "python", js: "javascript", java: "java", cpp: "cpp",
  html: "html", css: "css", json: "json", txt: "text",
};
const MAX_FILE_SIZE = 200 * 1024;

export default function ReviewPage() {
  const { projectId } = useParams();
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const ext = file.name.split(".").pop().toLowerCase();
    if (!EXTENSION_TO_LANGUAGE[ext]) {
      setError(`Unsupported file type: .${ext}`);
      return;
    }
    if (file.size > MAX_FILE_SIZE) {
      setError(`File too large — max ${MAX_FILE_SIZE / 1024}KB`);
      return;
    }

    setError("");
    setFileName(file.name);
    setLanguage(EXTENSION_TO_LANGUAGE[ext]);

    const reader = new FileReader();
    reader.onload = (event) => setCode(event.target.result);
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    if (!code.trim()) {
      setError("Please paste or upload some code first");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await submitCode(projectId, code, language);
      setResult(res);
    } catch (err) {
      setError(err.response?.data?.detail || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white">Code Review</h1>
      <p className="text-slate-400 text-sm mt-1 mb-6">Paste or upload code to get an AI-powered review</p>

      <div className="bg-white/5 border border-white/10 rounded-xl p-6 mb-4">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-medium text-slate-300">
            Language: <span className="text-indigo-400">{language}</span>
            {fileName && <span className="text-slate-500 ml-2">({fileName})</span>}
          </label>
          <label className="text-xs bg-white/10 hover:bg-white/20 text-slate-300 px-3 py-1.5 rounded-lg cursor-pointer transition">
            Upload File
            <input
              type="file"
              accept=".py,.js,.java,.cpp,.html,.css,.json,.txt"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your code here, or upload a file above..."
          rows={16}
          className="w-full bg-slate-950/50 border border-white/10 rounded-lg p-4 text-slate-200 font-mono text-sm placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
        />

        {error && <p className="text-red-400 text-xs mt-3">{error}</p>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="mt-4 bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-white font-medium px-5 py-2.5 rounded-lg text-sm transition shadow-lg shadow-indigo-500/25"
        >
          {loading ? "Submitting..." : "Review Code"}
        </button>
      </div>

      {result && (
        <div className="bg-emerald-500/10 border border-emerald-400/20 rounded-xl p-4 text-sm text-emerald-300">
          {result.message} — {result.code_length} characters received as {result.language}.
          <p className="text-slate-500 text-xs mt-1">Real AI analysis arrives in Phase 8/9.</p>
        </div>
      )}
    </div>
  );
}