"use client";
import { useState } from "react";
import Image from "next/image";

const Field = ({ value, onChange, editable, className = "" }) => {
  if (!editable) return <span className={className}>{value}</span>;
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-transparent outline-none hover:bg-white/10 focus:bg-white/10 rounded px-1 -mx-1 border-b border-dashed border-transparent hover:border-white/30 focus:border-indigo-400 transition w-full ${className}`}
    />
  );
};

const FieldLight = ({ value, onChange, editable, className = "" }) => {
  if (!editable) return <span className={className}>{value}</span>;
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-transparent outline-none hover:bg-indigo-50 focus:bg-indigo-50 rounded px-1 -mx-1 border-b border-dashed border-transparent hover:border-gray-300 focus:border-indigo-400 transition w-full ${className}`}
    />
  );
};

export default function Resume({ editable = false, initialData, onSave }) {
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState(
    initialData || {
      profilePic: "",
      initials: "EM",
      name: "Elon Musk",
      title: "Frontend Developer",
      contact: ["elonmusk@email.com", "+01 911", "Area 51, USA"],
      skills: ["React", "Next.js", "TypeScript", "Tailwind", "Node.js"],
      type: "resume",
      experience: [
        {
          title: "Senior Frontend Dev",
          company: "TechCorp · 2023–Present",
          desc: "Built React apps serving 50k+ users. Led redesign improving retention 32%.",
        },
        {
          title: "UI Developer",
          company: "StartupXYZ · 2021–2023",
          desc: "Developed component library used across 4 products.",
        },
      ],
      education: [
        {
          title: "BS Computer Science",
          company: "FAST University · 2017–2021",
          desc: "",
        },
      ],
    },
  );

  const handleProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "DocuMaker");
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/dt4qdszmp/image/upload`,
      { method: "POST", body: formData },
    );
    const Clouddata = await res.json();

    const squareUrl = Clouddata.secure_url.replace(
      "/upload/",
      "/upload/c_pad,w_500,h_500,b_auto/",
    );

    setData({ ...data, profilePic: squareUrl });
    setLoading(false);
  };

  const updateField = (field, value) => setData({ ...data, [field]: value });

  const updateArrayItem = (field, index, value) => {
    const arr = [...data[field]];
    arr[index] = value;
    setData({ ...data, [field]: arr });
  };

  const addArrayItem = (field, defaultValue = "") => {
    setData({ ...data, [field]: [...data[field], defaultValue] });
  };

  const removeArrayItem = (field, index) => {
    setData({ ...data, [field]: data[field].filter((_, i) => i !== index) });
  };

  const updateSectionItem = (section, index, key, value) => {
    const arr = [...data[section]];
    arr[index][key] = value;
    setData({ ...data, [section]: arr });
  };

  const addSectionItem = (section) => {
    setData({
      ...data,
      [section]: [...data[section], { title: "", company: "", desc: "" }],
    });
  };

  const removeSectionItem = (section, index) => {
    setData({
      ...data,
      [section]: data[section].filter((_, i) => i !== index),
    });
  };

  return (
    <div className="font-sans text-gray-900 text-sm flex flex-col md:flex-row ">
      <div className="w-full md:w-2/5 bg-zinc-900 p-4 flex-shrink-0 sm:rounded-l-xl">
        <div className="flex md:block items-center gap-3">
          <div className="relative w-12 h-12 md:mb-3 group">
            {Loading ? (
              <div className="w-12 h-12 rounded-full bg-white/20 animate-pulse" />
            ) : data.profilePic ? (
              <Image
                src={data.profilePic}
                alt="Profile"
                className="rounded-full object-cover"
                fill
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-base font-bold text-white">
                <Field
                  value={data.initials}
                  onChange={(v) => updateField("initials", v)}
                  editable={editable}
                  className="text-center w-8 text-white"
                />
              </div>
            )}

            {editable && (
              <>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    handleProfile(e);
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />
                <div className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition pointer-events-none">
                  <span className="text-white text-xs">📷</span>
                </div>
              </>
            )}
          </div>
          <div>
            <div className="text-base font-bold text-white tracking-tight">
              <Field
                value={data.name}
                onChange={(v) => updateField("name", v)}
                editable={editable}
                className="text-white"
              />
            </div>
            <div className="text-xs text-white/40 tracking-wider uppercase mt-0.5 md:mb-4">
              <Field
                value={data.title}
                onChange={(v) => updateField("title", v)}
                editable={editable}
                className="text-white/40"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-0 mt-4 md:mt-0">
          {" "}
          <div>
            <div className="text-xs tracking-wider uppercase text-white/30 my-3 mb-2 pb-1 border-b border-white/10">
              Contact
            </div>
            {data.contact.map((item, i) => (
              <div
                key={i}
                className="text-xs text-white/50 mb-1 flex items-center group"
              >
                <Field
                  value={item}
                  onChange={(v) => updateArrayItem("contact", i, v)}
                  editable={editable}
                  className="text-white/50"
                />
                {editable && (
                  <button
                    onClick={() => removeArrayItem("contact", i)}
                    className="sm:opacity-0 group-hover:opacity-100 text-red-400 ml-1"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {editable && (
              <button
                onClick={() => addArrayItem("contact", "")}
                className="text-xs text-indigo-400 mt-1"
              >
                + Add
              </button>
            )}
          </div>
          <div>
            <div className="text-xs tracking-wider uppercase text-white/30 my-3 mb-2 pb-1 border-b border-white/10">
              Skills
            </div>
            <div className="flex flex-wrap gap-1">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="bg-white/10 border border-white/20 rounded px-2 py-0.5 text-xs text-white/50 flex items-center group"
                >
                  <Field
                    value={skill}
                    onChange={(v) => updateArrayItem("skills", i, v)}
                    editable={editable}
                    className="text-white/50 w-16"
                  />
                  {editable && (
                    <button
                      onClick={() => removeArrayItem("skills", i)}
                      className="sm:opacity-0 group-hover:opacity-100 text-red-400 ml-1"
                    >
                      ✕
                    </button>
                  )}{" "}
                </span>
              ))}
            </div>
            {editable && (
              <button
                onClick={() => addArrayItem("skills", "New Skill")}
                className="text-xs text-indigo-400 mt-2"
              >
                + Add Skill
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 p-5 bg-white border border-zinc-200 sm:rounded-r-lg">
        <div className="mb-4">
          <div className="text-xs tracking-wider uppercase text-gray-300 mb-2 pb-1 border-b border-gray-100">
            Experience
          </div>
          {data.experience.map((job, i) => (
            <div key={i} className="mb-3 group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-bold tracking-tight">
                    <FieldLight
                      value={job.title}
                      onChange={(v) =>
                        updateSectionItem("experience", i, "title", v)
                      }
                      editable={editable}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 mb-1">
                    <FieldLight
                      value={job.company}
                      onChange={(v) =>
                        updateSectionItem("experience", i, "company", v)
                      }
                      editable={editable}
                    />
                  </div>
                  <div className="text-xs text-gray-400 leading-relaxed">
                    <FieldLight
                      value={job.desc}
                      onChange={(v) =>
                        updateSectionItem("experience", i, "desc", v)
                      }
                      editable={editable}
                    />
                  </div>{" "}
                </div>
                {editable && (
                  <button
                    onClick={() => removeSectionItem("experience", i)}
                    className="sm:opacity-0 group-hover:opacity-100 text-red-400 ml-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
          {editable && (
            <button
              onClick={() => addSectionItem("experience")}
              className="text-xs text-indigo-500 mt-1"
            >
              + Add Experience
            </button>
          )}
        </div>

        <div className="mb-4">
          <div className="text-xs tracking-wider uppercase text-gray-300 mb-2 pb-1 border-b border-gray-100">
            {" "}
            Education
          </div>
          {data.education.map((edu, i) => (
            <div key={i} className="mb-3 group">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="text-sm font-bold tracking-tight">
                    <FieldLight
                      value={edu.title}
                      onChange={(v) =>
                        updateSectionItem("education", i, "title", v)
                      }
                      editable={editable}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 mb-1">
                    <FieldLight
                      value={edu.company}
                      onChange={(v) =>
                        updateSectionItem("education", i, "company", v)
                      }
                      editable={editable}
                    />
                  </div>
                  {edu.desc && (
                    <div className="text-xs text-gray-400 leading-relaxed">
                      <FieldLight
                        value={edu.desc}
                        onChange={(v) =>
                          updateSectionItem("education", i, "desc", v)
                        }
                        editable={editable}
                      />{" "}
                    </div>
                  )}
                </div>
                {editable && (
                  <button
                    onClick={() => removeSectionItem("education", i)}
                    className="sm:opacity-0 group-hover:opacity-100 text-red-400 ml-2"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
          {editable && (
            <button
              onClick={() => addSectionItem("education")}
              className="text-xs text-indigo-500 mt-1"
            >
              + Add Education
            </button>
          )}
        </div>

        {editable && (
          <button
            onClick={() => onSave?.(data)}
            className="w-full bg-zinc-900 text-white font-medium py-3 rounded-lg hover:bg-zinc-800 transition mt-4"
          >
            Save Resume
          </button>
        )}
      </div>
    </div>
  );
}
