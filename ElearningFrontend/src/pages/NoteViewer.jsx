import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

import { getNote } from "../services/note.service";

import {
  ChevronLeft,
  ChevronRight,
  Download,
  ArrowLeft,
  ZoomIn,
  ZoomOut,
  Loader2,
} from "lucide-react";

import toast from "react-hot-toast";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

export default function NoteViewer() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [note, setNote] = useState(null);

  const [pages, setPages] = useState(0);

  const [page, setPage] = useState(1);

  const [scale, setScale] = useState(1);

  const [loading, setLoading] = useState(true);
  const [pageWidth, setPageWidth] = useState(800);
  async function load() {
    try {
      setLoading(true);

      const res = await getNote(id);

      setNote(res.data);
    } catch (err) {
      console.error(err);

      toast.error("Unable to load note");

      navigate("/library/notes");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [id]);

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "ArrowLeft") {
        setPage((p) => Math.max(1, p - 1));
      }

      if (e.key === "ArrowRight") {
        setPage((p) => Math.min(pages, p + 1));
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [pages]);
  useEffect(() => {
    function updateWidth() {
      const width = window.innerWidth;

      if (width < 640) {
        setPageWidth(width - 24);
      } else if (width < 768) {
        setPageWidth(width - 40);
      } else if (width < 1024) {
        setPageWidth(width - 80);
      } else if (width < 1400) {
        setPageWidth(850);
      } else {
        setPageWidth(950);
      }
    }

    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => window.removeEventListener("resize", updateWidth);
  }, []);
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 size={60} className="animate-spin text-indigo-600" />
      </div>
    );
  }

  if (!note) return null;

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Toolbar */}

      <div className="sticky top-16 z-30 border-b bg-white/95 backdrop-blur shadow-sm">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-3 py-3 sm:px-5 lg:flex-row lg:items-center lg:justify-between">
          {/* Left */}

          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="rounded-lg border p-2 hover:bg-slate-100"
            >
              <ArrowLeft size={18} />
            </button>

            <div>
              <h1 className="max-w-[220px] truncate text-base font-bold sm:max-w-md sm:text-lg lg:text-xl">
                {note.title}
              </h1>

              <p className="text-sm text-slate-500">
                {note.subject}
                {" • "}
                Uploaded by {note.uploadedBy?.name || "Admin"}
              </p>
            </div>
          </div>

          {/* Right */}

          <div className="flex flex-wrap items-center justify-end gap-2">
            {/* Zoom Out */}

            <button
              onClick={() =>
                setScale((s) => Math.max(0.8, Number((s - 0.2).toFixed(1))))
              }
              className="rounded-lg border p-2 hover:bg-slate-100"
            >
              <ZoomOut size={18} />
            </button>

            <span className="w-14 text-center text-sm font-medium">
              {(scale * 100).toFixed(0)}%
            </span>

            {/* Zoom In */}

            <button
              onClick={() =>
                setScale((s) => Math.min(2.5, Number((s + 0.2).toFixed(1))))
              }
              className="rounded-lg border p-2 hover:bg-slate-100"
            >
              <ZoomIn size={18} />
            </button>

            {/* Previous */}

            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="rounded-lg border p-2 disabled:opacity-40 hover:bg-slate-100"
            >
              <ChevronLeft size={18} />
            </button>

            <span className="min-w-[80px] text-center font-medium">
              {page} / {pages}
            </span>

            {/* Next */}

            <button
              disabled={page === pages}
              onClick={() => setPage((p) => p + 1)}
              className="rounded-lg border p-2 disabled:opacity-40 hover:bg-slate-100"
            >
              <ChevronRight size={18} />
            </button>

            {/* Download */}

            <button
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL}/notes/${note._id}/download`;
              }}
              className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              <Download size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* PDF */}

      <div className="flex justify-center overflow-x-auto overflow-y-auto bg-slate-200 p-2 sm:p-4 lg:p-8">
        <Document
          file={note.pdf.url}
          loading={
            <div className="flex items-center gap-3 py-20">
              <Loader2 className="animate-spin text-indigo-600" size={24} />

              <span>Loading PDF...</span>
            </div>
          }
          onLoadSuccess={({ numPages }) => {
            setPages(numPages);
          }}
          onLoadError={() => {
            toast.error("Failed to load PDF");
          }}
        >
          <Page
            pageNumber={page}
            width={pageWidth}
            scale={scale}
            renderTextLayer
            renderAnnotationLayer
          />
        </Document>
      </div>
    </div>
  );
}
