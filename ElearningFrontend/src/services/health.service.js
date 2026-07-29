import api from "../api/axios";

export const checkBackend = async () => {
  const res = await api.get("/health");
  return res.data;
};