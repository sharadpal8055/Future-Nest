import { useEffect, useState } from "react";
import { Award, Download, Calendar, BookOpen, User } from "lucide-react";

import {
  getMyCertificates,
  downloadCertificate,
} from "../../services/certificate.service";

export default function Certificates() {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCertificates();
  }, []);

  async function loadCertificates() {
    try {
      const data = await getMyCertificates();
      setCertificates(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function handleDownload(certificateId) {
    try {
      await downloadCertificate(certificateId);
    } catch (err) {
      console.error(err);
      alert("Unable to download certificate.");
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-gray-500">Loading certificates...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center gap-3">
          <Award size={38} className="text-yellow-500" />

          <div>
            <h1 className="text-3xl font-bold">My Certificates</h1>

            <p className="text-gray-500">
              Download and manage your earned certificates.
            </p>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <Award size={60} className="mx-auto text-gray-300" />

            <h2 className="mt-4 text-xl font-semibold">No Certificates Yet</h2>

            <p className="mt-2 text-gray-500">
              Complete a course to earn your first certificate.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {certificates.map((certificate) => (
              <div
                key={certificate._id}
                className="rounded-xl bg-white p-6 shadow transition hover:shadow-lg"
              >
                <div className="flex items-center justify-between">
                  <Award size={34} className="text-yellow-500" />

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                    Completed
                  </span>
                </div>

                <h2 className="mt-5 text-xl font-bold">
                  {certificate.course.title}
                </h2>

                <div className="mt-5 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <BookOpen size={16} />

                    <span>Course Completed</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <User size={16} />

                    <span>Instructor: {certificate.instructor}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar size={16} />

                    <span>
                      {new Date(
                        certificate.completionDate,
                      ).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="mt-6 rounded-lg bg-gray-100 p-3">
                  <p className="text-xs text-gray-500">Certificate ID</p>

                  <p className="mt-1 font-mono text-sm font-semibold">
                    {certificate.certificateId}
                  </p>
                </div>

                <button
                  onClick={() => handleDownload(certificate.certificateId)}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-3 text-white transition hover:bg-indigo-700"
                >
                  <Download size={18} />
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
