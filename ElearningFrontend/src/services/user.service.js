import api from "../api/axios";

export const getProfile = () =>
  api.get("/users/me");

export const updateProfile = (data) =>
  api.put("/users/me", data);

export const changePassword = (data) =>
  api.patch("/users/change-password", data);

export const uploadAvatar = (formData) =>
  api.post("/users/avatar", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

export const deleteAccount = () =>
  api.delete("/users/me");