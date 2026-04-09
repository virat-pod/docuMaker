"use client";
import { templates } from "@/lib/exportRepeative/templates";
import { documentCreate } from "@/actions/document";
import { useRouter, useParams } from "next/navigation";
import { useState, useContext } from "react";
import { NotificationContext } from "@/lib/contexts/serviceContext";

export default function UseTemplate() {
  const [Adding, setAdding] = useState(false);
  const { template } = useParams();
  const router = useRouter();
  const Template = templates[template];
  const { showNotification } = useContext(NotificationContext);
  if (!Template) return <div>Not found</div>;

  const handleSave = async (data) => {
    if (Adding) return;

    if (data.dueDate !== undefined) {
      if (!data.dueDate) {
        showNotification("Please select a due date", "error");
        return;
      }

      const parsedDate = new Date(data.dueDate);

      if (isNaN(parsedDate.getTime()) || data.dueDate.length < 8) {
        showNotification(
          "Invalid date format. Please select full date (DD/MM/YYYY)",
          "error",
        );
        return;
      }
    }

    setAdding(true);

    const document = await documentCreate(data, template);

    if (document) {
      router.push(`/documents/${template}/${document.id}`);
    } else {
      setAdding(false);
    }
  };

  return (
    <div className="min-h-screen py-26 sm:py-12 pt-8 px-4 bg-gray-100">
      <div className="w-full md:w-3/4 lg:w-2/5 mx-auto">
        <div className="mb-4 flex items-center justify-center gap-2 text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-full px-4 py-2">
          <svg
            className="w-4 h-4 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Review carefully — changes cannot be made after saving</span>
        </div>
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <Template editable onSave={(data) => handleSave(data)} />
        </div>
      </div>
      {Adding && (
        <div className="fixed inset-0 z-50 bg-black/25 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-white border-t-zinc-700 rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
