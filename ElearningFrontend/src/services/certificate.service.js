import api from "../api/axios";

export const getMyCertificates = async () => {
  const res = await api.get("/certificates/me");
  return res.data.data;
};

export const generateCertificate = async (enrollmentId) => {
  const res = await api.post(`/certificates/${enrollmentId}`);
  return res.data.data;
};

export const downloadCertificate = async (certificateId) => {
  const response = await api.get(
    `/certificates/download/${certificateId}`,
    {
      responseType: "blob",
    }
  );

  const url = window.URL.createObjectURL(
    new Blob([response.data], {
      type: "application/pdf",
    })
  );

  const link = document.createElement("a");

  link.href = url;
  link.download = `${certificateId}.pdf`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  window.URL.revokeObjectURL(url);
};