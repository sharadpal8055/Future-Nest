import Certificate from "../models/Certificate.js";
import Enrollment from "../models/Enrollment.js";
import { generateCertificatePdf } from "../utils/generateCertificatePdf.js";
/* ===========================================================
   Generate Certificate
=========================================================== */

export const generateCertificate = async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    /* ---------- Find Enrollment ---------- */

    const enrollment = await Enrollment.findById(enrollmentId)
      .populate("courseId")
      .populate("userId", "name email");

    if (!enrollment) {
      return res.status(404).json({
        success: false,
        message: "Enrollment not found.",
      });
    }

    /* ---------- Verify Ownership ---------- */

    if (enrollment.userId._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "You are not authorized to access this certificate.",
      });
    }

    /* ---------- Verify Completion ---------- */

    const totalLessons = enrollment.courseId.lessons.length;

    const completedLessons = Object.values(enrollment.progress || {}).filter(
      Boolean,
    ).length;

    if (completedLessons < totalLessons) {
      return res.status(400).json({
        success: false,
        message: "Complete all lessons before generating your certificate.",
      });
    }

    /* ---------- Prevent Duplicate Certificate ---------- */

    let certificate = await Certificate.findOne({
      enrollment: enrollment._id,
    });

    if (certificate) {
      return res.status(200).json({
        success: true,
        message: "Certificate already exists.",
        data: certificate,
      });
    }

    /* ---------- Create Certificate ---------- */

    certificate = await Certificate.create({
      student: enrollment.userId._id,
      course: enrollment.courseId._id,
      instructor: enrollment.courseId.faculty,
      enrollment: enrollment._id,
      completionDate: new Date(),
    });

    return res.status(201).json({
      success: true,
      message: "Certificate generated successfully.",
      data: certificate,
    });
  } catch (error) {
    console.error("Generate Certificate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ===========================================================
   Get My Certificates
=========================================================== */

export const getMyCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find({
      student: req.user._id,
    })
      .populate("course", "title thumbnailUrl faculty")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: certificates,
    });
  } catch (error) {
    console.error("Get Certificates Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/* ===========================================================
   Verify Certificate
=========================================================== */

export const verifyCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({
      certificateId,
    })
      .populate("student", "name")
      .populate("course", "title");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    return res.status(200).json({
      success: true,
      data: certificate,
    });
  } catch (error) {
    console.error("Verify Certificate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


/* ===========================================================
   Download Certificate PDF
=========================================================== */

export const downloadCertificate = async (req, res) => {
  try {
    const { certificateId } = req.params;

    const certificate = await Certificate.findOne({
      certificateId,
    })
      .populate("student", "name email")
      .populate("course", "title");

    if (!certificate) {
      return res.status(404).json({
        success: false,
        message: "Certificate not found.",
      });
    }

    // Only the certificate owner can download it
    if (certificate.student._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    generateCertificatePdf(
      res,
      certificate,
      certificate.student.name,
      certificate.course.title
    );
  } catch (error) {
    console.error("Download Certificate Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};