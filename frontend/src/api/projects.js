import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api/projects";

export const createProject = (name, description = "") =>
  axios.post(BASE_URL, { name, description }).then((res) => res.data);

export const listProjects = () =>
  axios.get(BASE_URL).then((res) => res.data);

export const submitCode = (projectId, code, language) =>
  axios.post(`${BASE_URL}/${projectId}/submit-code`, {
    code,
    language,
    project_id: projectId,
  }).then((res) => res.data);