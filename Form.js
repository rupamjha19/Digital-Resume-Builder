// Form.js
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const Form = ({ formData, setFormData, theme, setTheme }) => {
  const handleThemeToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleArrayChange = (section, index, field, value) => {
    const updatedArray = [...formData[section]];
    if (section === "skills") {
      updatedArray[index] = value;
    } else if (field === "file") {
      const file = value.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          updatedArray[index][field] = {
            name: file.name,
            data: reader.result,
          };
          setFormData({ ...formData, [section]: updatedArray });
        };
        reader.readAsDataURL(file);
        return;
      }
    } else {
      updatedArray[index][field] = value;
    }
    setFormData({ ...formData, [section]: updatedArray });
  };

  const handleAddItem = (section, newItem) => {
    setFormData({ ...formData, [section]: [...formData[section], newItem] });
  };

  const handleRemoveItem = (section, index) => {
    const updatedArray = [...formData[section]];
    updatedArray.splice(index, 1);
    setFormData({ ...formData, [section]: updatedArray });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setFormData({ ...formData, profilePhoto: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const basicFields = [
    { label: "Full Name", key: "fullName" },
    {
      label: "Email Id",
      key: "email",
      validate: (val) => {
        const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
        return isValidEmail ? true : "Please enter a valid email address.";
      },
    },
    { label: "Address", key: "address" },
    {
      label: "LinkedIn",
      key: "linkedIn",
      validate: (val) =>
        /^https:\/\/(www\.)?linkedin\.com\/.+/.test(val.trim())
          ? true
          : "Enter a valid LinkedIn URL (e.g., https://linkedin.com/in/yourname)",
    },
    {
      label: "GitHub",
      key: "github",
      validate: (val) =>
        /^https:\/\/(www\.)?github\.com\/.+/.test(val.trim())
          ? true
          : "Enter a valid GitHub URL (e.g., https://github.com/username)",
    },
    {
      label: "Twitter",
      key: "twitter",
      validate: (val) =>
        /^https:\/\/(www\.)?twitter\.com\/.+/.test(val.trim())
          ? true
          : "Enter a valid Twitter URL (e.g., https://twitter.com/username)",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">
          <i>Your career starts with a great resume !</i>
        </h2>
        <label className="flex items-center cursor-pointer">
          <span className="mr-2">Dark Mode</span>
          <input
            type="checkbox"
            className="toggle"
            checked={theme === "dark"}
            onChange={handleThemeToggle}
          />
        </label>
      </div>

      {basicFields.map(({ label, key, validate }) => (
        <div key={key}>
          <label className="block mb-1 font-medium">{label}</label>
          <input
            type="text"
            value={formData[key]}
            onChange={(e) => handleChange(key, e.target.value)}
            className={`w-full px-3 py-2 border rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
              validate && formData[key] && validate(formData[key]) !== true
                ? "border-red-500"
                : "border-gray-300"
            }`}
          />
          {validate && formData[key] && validate(formData[key]) !== true && (
            <p className="text-sm text-red-500">{validate(formData[key])}</p>
          )}
        </div>
      ))}

      <div>
        <label className="block mb-1 font-medium">Phone Number</label>
        <PhoneInput
          country={"in"}
          value={formData.phone}
          onChange={(phone) => handleChange("phone", phone)}
          inputClass="!w-full !py-2 !pl-10 !pr-3 !rounded !dark:bg-gray-800 !dark:text-white"
          containerClass="!w-full"
          enableSearch
          placeholder="Enter phone number"
        />
      </div>

      <div>
        <label className="block mb-1 font-medium">Profile Photo</label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoUpload}
          className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
        />
      </div>

      {[
        {
          section: "education",
          title: "Education",
          fields: ["school", "degree", "year", "percentageOrCgpa"],
          placeholder: {
            school: "",
            degree: "",
            year: "",
            percentageOrCgpa: "",
          },
        },
        {
          section: "experience",
          title: "Experience",
          fields: ["company", "role", "duration", "description"],
          placeholder: {
            company: "",
            role: "",
            duration: "",
            description: "",
          },
        },
        {
          section: "skills",
          title: "Skills",
          fields: [""],
          placeholder: "",
        },
        {
          section: "projects",
          title: "Projects",
          fields: ["title", "techstack", "liveDemo", "description"],
          placeholder: {
            title: "",
            techstack: "",
            liveDemo: "",
            description: "",
          },
        },
        {
          section: "custom",
          title: "Custom Sections",
          fields: ["title", "content"],
          placeholder: { title: "", content: [""], format: "bullet" },
        },
        {
          section: "certificates",
          title: "Certificates",
          fields: ["title", "file"],
          placeholder: { title: "", file: null },
        },
      ].map(({ section, title, fields, placeholder }) => (
        <div key={section} className="space-y-4">
          <h3 className="text-lg font-semibold">{title}</h3>

          {formData[section].map((item, idx) => (
            <div
              key={idx}
              className="space-y-2 border-l-4 border-blue-500 pl-4"
            >
              {fields.map((field, fidx) => {
                if (section === "custom" && field === "content") {
                  const lines = Array.isArray(item.content)
                    ? item.content
                    : [item.content || ""];
                  const format = item.format || "bullet";

                  return (
                    <div key={fidx}>
                      <label className="block text-sm font-medium capitalize mb-1">
                        Content Format
                      </label>
                      <select
                        value={format}
                        onChange={(e) =>
                          handleArrayChange(section, idx, "format", e.target.value)
                        }
                        className="mb-2 w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                      >
                        <option value="bullet">Bullet List</option>
                        <option value="paragraph">Paragraph</option>
                      </select>

                      <label className="block text-sm font-medium capitalize mb-1">
                        Content
                      </label>
                      {lines.map((line, lineIdx) => (
                        <div key={lineIdx} className="flex gap-2 mb-2">
                          <input
                            type="text"
                            value={line}
                            onChange={(e) => {
                              const updatedLines = [...lines];
                              updatedLines[lineIdx] = e.target.value;
                              handleArrayChange(section, idx, field, updatedLines);
                            }}
                            className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const updatedLines = [...lines];
                              updatedLines.splice(lineIdx, 1);
                              handleArrayChange(section, idx, field, updatedLines);
                            }}
                            className="text-red-600 hover:underline"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                      <button
                        type="button"
                        onClick={() => {
                          const updatedLines = [...lines, ""];
                          handleArrayChange(section, idx, field, updatedLines);
                        }}
                        className="text-blue-600 text-sm mt-1 hover:underline"
                      >
                        + Add Content
                      </button>
                    </div>
                  );
                }

                return (
                  <div key={fidx}>
                    <label className="block text-sm font-medium capitalize">
                      {field === "percentageOrCgpa"
                        ? "Percentage/CGPA"
                        : field === "file"
                        ? "Upload Certificate"
                        : field === "liveDemo"
                        ? "Live Demo URL"
                        : field || "Skill"}
                    </label>
                    <input
                      type={field === "file" ? "file" : "text"}
                      accept={field === "file" ? ".pdf,.jpg,.png" : undefined}
                      value={
                        field === "file" || section === "skills"
                          ? undefined
                          : item[field] || ""
                      }
                      onChange={(e) =>
                        handleArrayChange(
                          section,
                          idx,
                          field,
                          field === "file" ? e : e.target.value
                        )
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    />
                    {field === "file" && item.file?.name && (
                      <p className="text-sm text-green-600 mt-1">
                        Uploaded: {item.file.name}
                      </p>
                    )}
                  </div>
                );
              })}
              <button
                type="button"
                onClick={() => handleRemoveItem(section, idx)}
                className="text-red-600 dark:text-red-400 text-sm mt-1"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() => handleAddItem(section, placeholder)}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            + Add {title}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Form;