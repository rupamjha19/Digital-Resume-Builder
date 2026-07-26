import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import ResumePreview from "./components/ResumePreview";
import DownloadButtons from "./components/DownloadButtons";

function App() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedIn: "",
    github: "",      // ✅ GitHub link
    twitter: "",     // ✅ Twitter handle
    website: "",
    profilePhoto: "",
    countryCode: "+91", // ✅ Country code for phone
    education: [
      {
        school: "",
        degree: "",
        year: "",
        percentageOrCgpa: "",
      },
    ],
    experience: [
      {
        company: "",
        role: "",
        duration: "",
        description: "",
      },
    ],
    skills: [""],
    projects: [
      {
        title: "",
        techstack: "",
        description: "",
      },
    ],
    custom: [
      {
        title: "",
        content: "",
      },
    ],
    certificates: [
      {
        title: "",
        file: null,
      },
    ],
  });

  const [theme, setTheme] = useState("light");

  // Toggle dark/light class on root element
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 flex flex-col lg:flex-row gap-4">
      {/* Left Side: Form + Download */}
      <div className="lg:w-1/2 space-y-4">
        <Form
          formData={formData}
          setFormData={setFormData}
          theme={theme}
          setTheme={setTheme}
        />
        <DownloadButtons formData={formData} />
      </div>

      {/* Right Side: Preview */}
      <div className="lg:w-1/2 max-h-screen overflow-y-auto print:overflow-visible">
        <ResumePreview formData={formData} />
      </div>
    </div>
  );
}

export default App;


