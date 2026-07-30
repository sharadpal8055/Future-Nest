import Note from "../models/Note.js";
import cloudinary from "../config/cloudinary.js";
import asyncHandler from "../utils/asyncHandler.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import axios from "axios";
/* ===========================================================
                    GET ALL NOTES
=========================================================== */

export const getNotes = asyncHandler(async (req, res) => {
  const { search = "", subject, page = 1, limit = 12 } = req.query;

  const query = {};

  if (subject) {
    query.subject = subject;
  }

  if (search) {
    query.$text = {
      $search: search,
    };
  }

  const notes = await Note.find(query)
    .populate("uploadedBy", "name")
    .sort({
      createdAt: -1,
    })
    .skip((page - 1) * limit)
    .limit(Number(limit));

  const total = await Note.countDocuments(query);

  res.status(200).json({
    success: true,
    data: notes,
    pagination: {
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
    },
  });
});

/* ===========================================================
                    GET SINGLE NOTE
=========================================================== */

export const getNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id).populate(
    "uploadedBy",
    "name",
  );

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  res.status(200).json({
    success: true,
    data: note,
  });
});

/* ===========================================================
                    CREATE NOTE
=========================================================== */

export const createNote = asyncHandler(async (req, res) => {
  const { title, description, subject, tags } = req.body;

  if (!req.file) {
    return res.status(400).json({
      success: false,
      message: "PDF is required",
    });
  }

  const upload = await uploadToCloudinary(req.file.buffer, {
    folder: "future-nest/notes",
    resource_type: "raw",
  });

  const note = await Note.create({
    title,
    description,
    subject,
    tags: tags ? tags.split(",").map((t) => t.trim()) : [],
    pdf: {
      url: upload.secure_url,
      publicId: upload.public_id,
    },
    uploadedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: "Note uploaded successfully",
    data: note,
  });
});

/* ===========================================================
                    UPDATE NOTE
=========================================================== */

export const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  const { title, description, subject, tags } = req.body;

  if (title !== undefined) note.title = title;

  if (description !== undefined) note.description = description;

  if (subject !== undefined) note.subject = subject;

  if (tags !== undefined) {
    note.tags = tags.split(",").map((tag) => tag.trim());
  }

  if (req.file) {
    if (note.pdf.publicId) {
      await cloudinary.uploader.destroy(note.pdf.publicId, {
        resource_type: "raw",
      });
    }

    const upload = await uploadToCloudinary(req.file.buffer, {
      folder: "future-nest/notes",
      resource_type: "raw",
    });

    note.pdf = {
      url: upload.secure_url,
      publicId: upload.public_id,
    };
  }

  await note.save();

  res.status(200).json({
    success: true,
    message: "Note updated successfully",
    data: note,
  });
});

/* ===========================================================
                    DELETE NOTE
=========================================================== */

export const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  if (note.pdf.publicId) {
    await cloudinary.uploader.destroy(note.pdf.publicId, {
      resource_type: "raw",
    });
  }

  await note.deleteOne();

  res.status(200).json({
    success: true,
    message: "Note deleted successfully",
  });
});


export const downloadNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    return res.status(404).json({
      success: false,
      message: "Note not found",
    });
  }

  note.downloads++;
  await note.save();

  const response = await axios.get(note.pdf.url, {
    responseType: "stream",
  });

  res.setHeader("Content-Type", "application/pdf");

  res.setHeader(
    "Content-Disposition",
    `attachment; filename="${note.title}.pdf"`
  );

  response.data.pipe(res);
});