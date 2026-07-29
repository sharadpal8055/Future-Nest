import PDFDocument from "pdfkit";

export const generateCertificatePdf = (
  res,
  certificate,
  studentName,
  courseTitle,
) => {
  const doc = new PDFDocument({
    layout: "landscape",
    size: "A4",
    margin: 50,
  });

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${certificate.certificateId}.pdf`,
  );

  doc.pipe(res);

  /* Background */

  doc.rect(20, 20, 802, 555).lineWidth(4).stroke("#2563EB");

  /* Title */

  doc.fontSize(32).fillColor("#1E3A8A").text("CERTIFICATE OF COMPLETION", {
    align: "center",
  });

  doc.moveDown();

  doc.fontSize(18).fillColor("#444").text("FutureNest LMS", {
    align: "center",
  });

  doc.moveDown(2);

  doc
    .fontSize(20)
    .fillColor("black")
    .text("This Certificate is proudly presented to", {
      align: "center",
    });

  doc.moveDown();

  doc.fontSize(34).fillColor("#0F172A").text(studentName, {
    align: "center",
    underline: true,
  });

  doc.moveDown(2);

  doc
    .fontSize(18)
    .fillColor("#444")
    .text("For successfully completing the course", {
      align: "center",
    });

  doc.moveDown();

  doc.fontSize(28).fillColor("#111827").text(courseTitle, {
    align: "center",
  });

  doc.moveDown(3);

  doc.fontSize(16).text(`Instructor : ${certificate.instructor}`, 80, 430);

  doc.text(
    `Completion Date : ${new Date(
      certificate.completionDate,
    ).toLocaleDateString()}`,
    80,
    460,
  );

  doc.text(`Certificate ID : ${certificate.certificateId}`, 80, 490);

  /* Signature */

  doc.moveTo(600, 470).lineTo(740, 470).stroke();

  doc.text("Authorized Signature", 610, 475);

  doc.end();
};
