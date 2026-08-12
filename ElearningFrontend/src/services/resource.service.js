import api from "../api/axios";

export async function getResources() {
  const res = await api.get("/resources");
  return res.data.resources;
}

export async function createResource(data) {
  const res = await api.post("/resources", data);
  return res.data.resource;
}

export async function deleteResource(id) {
  const res = await api.delete(`/resources/${id}`);
  return res.data;
}