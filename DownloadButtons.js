import React from "react";
import html2pdf from "html2pdf.js";

const DownloadButtons = ({ formData }) => {
  const handleDownload = () => {
    const element = document.getElementById("resume-preview");

    if (!element) {
      alert("Resume preview not found!");
      return;
    }

    // Clone resume content
    const clone = element.cloneNode(true);
    clone.style.maxHeight = "none";
    clone.style.overflow = "visible";
    clone.style.display = "block";
    clone.style.width = "100%";

    // Wrapper for off-screen rendering and theme
    const wrapper = document.createElement("div");
    wrapper.style.position = "absolute";
    wrapper.style.left = "-9999px";
    wrapper.style.top = "0";
    wrapper.style.width = element.offsetWidth + "px";

    // Add dark mode class if theme is dark
    if (formData.theme === "dark") {
      wrapper.classList.add("dark");
    }

    wrapper.appendChild(clone);
    document.body.appendChild(wrapper);

    const opt = {
      margin: 0.5,
      filename: "resume.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: {
        scale: 2,
        scrollY: 0,
        useCORS: true,
      },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      pagebreak: { mode: ["avoid-all", "css", "legacy"] },
    };

    // Wait to ensure images/fonts are fully rendered
    setTimeout(() => {
      html2pdf()
        .set(opt)
        .from(clone)
        .save()
        .then(() => {
          document.body.removeChild(wrapper);
        });
    }, 500);
  };

  return (
    <div className="mt-4 flex justify-end print:hidden">
      <button
        onClick={handleDownload}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl shadow transition duration-300"
      >
        Download PDF
      </button>
    </div>
  );
};

export default DownloadButtons;
