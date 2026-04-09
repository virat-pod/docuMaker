"use client";
import { useState } from "react";

const Field = ({ value, onChange, editable, className = "" }) => {
  if (!editable) return <span className={className}>{value}</span>;
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`bg-transparent outline-none hover:bg-amber-50 focus:bg-amber-50 rounded px-1 -mx-1 border-b border-dashed border-transparent hover:border-amber-300 focus:border-amber-500 transition text-center w-full ${className}`}
    />
  );
};

export default function Certificate({ editable = false, initialData, onSave }) {
  const [data, setData] = useState(
    initialData || {
      institute: "IIT Bombay",
      certType: "Certificate of Completion",
      recipientName: "Virat Pod",
      courseName: "NASA Strategys — Advanced Program",
      duration: "1200 hours · with distinction · April 2026",
      seal: "IIT",
      sig1Name: "Dr. Eienstien",
      sig1Title: "Course Director",
      sig2Name: "Elon musk",
      sig2Title: "Head of Academy",
      type: "certificate",
    },
  );

  const update = (field, value) => setData({ ...data, [field]: value });
  return (
    <div className="font-serif text-gray-900 bg-amber-50/30 p-4">
      <div className="border border-amber-400/50 p-5 relative">
        <div className="text-xs tracking-widest uppercase text-amber-600 text-center mb-3 font-sans">
          <Field
            value={data.institute}
            onChange={(v) => update("institute", v)}
            editable={editable}
          />
        </div>
        <div className="text-xs tracking-wider uppercase text-gray-400 text-center font-sans mb-2">
          <Field
            value={data.certType}
            onChange={(v) => update("certType", v)}
            editable={editable}
          />
        </div>
        <div className="text-center text-amber-500 text-lg my-2 tracking-widest">
          — ✦ —
        </div>{" "}
        <div className="text-xs text-gray-400 text-center font-sans mb-1">
          This certifies that
        </div>
        <div className="text-3xl font-bold text-center tracking-tight mb-1 italic">
          <Field
            value={data.recipientName}
            onChange={(v) => update("recipientName", v)}
            editable={editable}
          />
        </div>
        <div className="text-xs text-gray-400 text-center font-sans mb-1">
          has successfully completed
        </div>
        <div className="text-base font-bold text-center mb-4 font-sans">
          <Field
            value={data.courseName}
            onChange={(v) => update("courseName", v)}
            editable={editable}
          />{" "}
        </div>
        <div className="text-center text-xs text-gray-400 font-sans">
          <Field
            value={data.duration}
            onChange={(v) => update("duration", v)}
            editable={editable}
          />
        </div>
        <div className="flex items-end justify-center mt-6 pt-5 border-t border-amber-200 gap-8">
          <div className="text-center">
            <div className="w-16 sm:w-20 border-t border-gray-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-gray-600 font-sans">
              <Field
                value={data.sig1Name}
                onChange={(v) => update("sig1Name", v)}
                editable={editable}
              />
            </div>{" "}
            <div className="text-xs text-gray-400 font-sans">
              <Field
                value={data.sig1Title}
                onChange={(v) => update("sig1Title", v)}
                editable={editable}
              />
            </div>
          </div>

          <div className="flex justify-center -mt-2">
            <div className="w-10 sm:w-16 h-10 sm:h-16 rounded-full border-2 border-amber-500 flex items-center justify-center bg-amber-50">
              <div className="w-8 sm:w-12 h-8 sm:h-12 rounded-full border border-amber-500 flex items-center justify-center text-sm text-amber-600 font-sans font-bold">
                <Field
                  value={data.seal}
                  onChange={(v) => update("seal", v)}
                  editable={editable}
                  className="w-8 text-center"
                />
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="w-16 sm:w-20 border-t border-gray-400 mx-auto mb-2" />
            <div className="text-xs font-bold text-gray-600 font-sans">
              <Field
                value={data.sig2Name}
                onChange={(v) => update("sig2Name", v)}
                editable={editable}
              />
            </div>
            <div className="text-xs text-gray-400 font-sans">
              <Field
                value={data.sig2Title}
                onChange={(v) => update("sig2Title", v)}
                editable={editable}
              />
            </div>
          </div>
        </div>
        {editable && (
          <div className="mt-6">
            <button
              onClick={() => {
                onSave?.(data);
              }}
              className="w-full bg-amber-500 text-white font-medium py-3 rounded-lg hover:bg-amber-600 transition font-sans"
            >
              Save Certificate
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
