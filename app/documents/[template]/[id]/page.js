"use client";
import { useState, useRef, useEffect, useContext } from "react";
import {
  GetDocument,
  updateDocument,
  deleteDocument,
} from "@/actions/document";
import { templates } from "@/lib/exportRepeative/templates";
import { useParams, useRouter } from "next/navigation";
import { NotificationContext } from "@/lib/contexts/serviceContext";

export default function DocumentPage() {
  const { template, id } = useParams();
  const [deleteLoad, setdeleteLoad] = useState(false);
  const [editKey, setEditKey] = useState(0);
  const [doc, setDoc] = useState(null);
  const [originalDoc, setOriginalDoc] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [saving, setSaving] = useState(false);
  const docRef = useRef(null);
  const router = useRouter();
  const { showNotification } = useContext(NotificationContext);

  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const fetchDoc = async () => {
      const data = await GetDocument(template, parseInt(id));
      setDoc(data);
      setOriginalDoc(data);
      setLoading(false);
    };
    fetchDoc();
  }, [template, id]);

  const Template = templates[template];

  const handleDocChange = (newData) => {
    setDoc(newData);
    setIsDirty(true);
  };

  const cancelEdit = () => {
    setDoc(originalDoc);
    setIsEditing(false);
    setIsDirty(false);
    setEditKey((prev) => prev + 1);
  };

  const handleSave = async () => {
    setSaving(true);
    await updateDocument(template, parseInt(id), doc);
    setOriginalDoc(doc);
    setIsEditing(false);
    setIsDirty(false);
    setSaving(false);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const element = docRef.current.cloneNode(true);

      const images = element.querySelectorAll("img");

      await Promise.all(
        Array.from(images).map(async (img) => {
          if (!img.src || img.src.startsWith("data:")) return;
          try {
            const res = await fetch(img.src);
            const blob = await res.blob();
            const base64 = await new Promise((resolve) => {
              const reader = new FileReader();
              reader.onloadend = () => resolve(reader.result);
              reader.readAsDataURL(blob);
            });
            img.src = base64;
          } catch (e) {
            console.log("Image failed:", img.src);
          }
        }),
      );
      const content = element.innerHTML;

      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ html: content }),
      });

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${template}-${id}.pdf`;
      a.click();
    } finally {
      setDownloading(false);
    }
  };

  const handleDelete = async (type, id) => {
    setdeleteLoad(true);
    const deleting = await deleteDocument(type, id);
    if (deleting) {
      showNotification("Document deleted");
      router.push("/documents");
    } else {
      showNotification("Something went wrong", "error");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        {" "}
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!doc || !Template) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500 text-lg">Document not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-4xl mx-auto  py-6 pb-28 sm:py-10 px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 capitalize">
              {template}
            </h1>
            <p className="text-gray-500 text-sm sm:text-base">#DocuMaker</p>
          </div>

          <div className="flex gap-2 sm:gap-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => {
                    cancelEdit();
                  }}
                  className="flex-1 sm:flex-none px-3 py-2 sm:px-5 sm:py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving || !isDirty}
                  className="flex-1 sm:flex-none px-3 py-2 sm:px-5 sm:py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium disabled:opacity-50 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {saving ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span className="sm:inline">Saving...</span>{" "}
                    </>
                  ) : (
                    <>💾 Save</>
                  )}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => {
                    handleDelete(doc.type, doc.id);
                  }}
                  className="px-3 py-2 sm:px-5 sm:py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  <span className="">
                    {deleteLoad ? "Deleting..." : "Delete"}
                  </span>
                </button>
                <button
                  onClick={() => setIsEditing(true)}
                  className={`px-3 ${template === "invoice" || template === "quotation" ? "hidden" : "flex"} py-2 sm:px-5 sm:py-2.5 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition font-medium text-sm sm:text-base flex items-center justify-center gap-2`}
                >
                  ✏️ <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className="flex-1 sm:flex-none px-3 py-2 sm:px-5 sm:py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium disabled:opacity-50 text-sm sm:text-base flex items-center justify-center gap-2"
                >
                  {" "}
                  {downloading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Generating...</span>
                    </>
                  ) : (
                    <>
                      📥 Download
                      <span className="hidden sm:inline">PDF</span>
                    </>
                  )}
                </button>
              </>
            )}{" "}
          </div>
        </div>

        <div className="bg-white rounded-none sm:rounded-2xl shadow-lg overflow-hidden -mx-4 sm:mx-0">
          <div ref={docRef} className="p-4 sm:p-8 bg-white">
            <Template
              key={editKey}
              editable={isEditing}
              initialData={doc}
              onSave={handleDocChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
