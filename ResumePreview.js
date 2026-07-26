



import React from "react";
import {
  Linkedin,
  Github,
  Twitter,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const ResumePreview = ({ formData, theme }) => {
  const {
    fullName,
    email,
    address,
    phone,
    linkedIn,
    github,
    twitter,
    profilePhoto,
    education,
    experience,
    skills,
    projects,
    custom,
    certificates,
  } = formData;

  const renderLink = (Icon, url, label) =>
    url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-blue-600 hover:underline dark:text-blue-400"
      >
        <Icon size={16} />
        <span className="break-all">{label}</span>
      </a>
    ) : null;

  const renderList = (items) =>
    items?.length ? (
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
    ) : null;

  return (
    <div
      id="resume-preview" // ✅ Important for proper PDF export
      className={`p-6 rounded-lg shadow-lg text-sm sm:text-base ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-gray-900"
      }`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 mb-4">
        {profilePhoto && (
          <img
            src={profilePhoto}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
        )}
        <div className="flex-1 space-y-1">
          <h1 className="text-2xl font-bold">{fullName}</h1>
          {email && (
            <p className="flex items-center gap-1">
              <Mail size={16} /> {email}
            </p>
          )}
          {phone && (
            <p className="flex items-center gap-1">
              <Phone size={16} /> {phone}
            </p>
          )}
          {address && (
            <p className="flex items-center gap-1">
              <MapPin size={16} /> {address}
            </p>
          )}
          <div className="flex flex-wrap gap-4 mt-2">
            {renderLink(Linkedin, linkedIn, linkedIn)}
            {renderLink(Github, github, github)}
            {renderLink(Twitter, twitter, twitter)}
          </div>
        </div>
      </div>

      {/* Education */}
      {education?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Education</h2>
          {education.map((edu, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-medium">{edu.school}</p>
              <p>
                {edu.degree} — {edu.year}
              </p>
              <p>Score: {edu.percentageOrCgpa}</p>
            </div>
          ))}
        </section>
      )}

      {/* Experience */}
      {experience?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Experience</h2>
          {experience.map((exp, idx) => (
            <div key={idx} className="mb-2">
              <p className="font-medium">{exp.company}</p>
              <p>
                {exp.role} — {exp.duration}
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills */}
      {skills?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, idx) => (
              <span
                key={idx}
                className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-sm dark:bg-blue-700 dark:text-white"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects?.length > 0 && (
        <section className="mt-6">
          <h2 className="text-lg font-semibold mb-2">Projects</h2>
          {projects.map((proj, idx) => (
            <div key={idx} className="mb-3">
              <p className="font-medium">{proj.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Tech Stack: {proj.techstack}
              </p>
              {proj.liveDemo && (
                <a
                  href={proj.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline block mb-1"
                >
                  Live Demo
                </a>
              )}
              <p>{proj.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Custom Sections */}
      {custom?.length > 0 && (
        <section className="mt-6">
          {custom.map((section, idx) => (
            <div key={idx} className="mb-4">
              <h2 className="text-lg font-semibold mb-1">{section.title}</h2>
              {Array.isArray(section.content)
                ? renderList(section.content)
                : <p>{section.content}</p>}
            </div>
          ))}
        </section>
      )}

      {/* Certificates */}
      {certificates?.length > 0 && (
  <section className="mt-6">
    <h2 className="text-lg font-semibold mb-2">Certificates</h2>
    <div className="space-y-4">
      {certificates.map((cert, idx) => (
        <div key={idx}>
          <p className="font-medium">{cert.title}</p>
          {cert.file?.data ? (
            cert.file.name.endsWith(".pdf") ? (
              <a
                href={cert.file.data}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                View PDF
              </a>
            ) : (
              <img
                src={cert.file.data}
                alt={cert.title}
                className="mt-1 max-w-xs border rounded"
              />
            )
          ) : (
            <p className="text-sm text-gray-500">No file uploaded</p>
          )}
        </div>
      ))}
    </div>
  </section>


      )}
    </div>
  );
};

export default ResumePreview;
