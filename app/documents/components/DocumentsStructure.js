"use client";

import { useState, useEffect, useRef, useContext } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { FileText, Plus, Clock, MoreVertical } from "lucide-react";
import { GetDocuments, deleteDocument } from "@/actions/document";
import { NotificationContext } from "@/lib/contexts/serviceContext";

const DocumentCard = ({ doc, deletes }) => {
  const [menuOpen, setmenuOpen] = useState(false);
  const menuRef = useRef(null);
  const { showNotification } = useContext(NotificationContext);
  const [deleteLoad, setdeleteLoad] = useState(false);

  const title =
    doc.type === "certificate"
      ? doc.recipientName
      : doc.type === "resume"
        ? doc.title
        : doc.type === "quotation"
          ? doc.quoteNo + "-" + doc.clientName
          : doc.type === "invoice"
            ? doc.invoiceNo + "-" + doc.companyName
            : "";

  useEffect(() => {
    const handleMenuClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setmenuOpen(false);
      }
    };

    document.addEventListener("click", handleMenuClick);

    return () => document.removeEventListener("click", handleMenuClick);
  }, []);

  const handleDelete = async (type, id) => {
    setdeleteLoad(true);
    const deleting = await deleteDocument(type, id);
    if (deleting) {
      deletes(type, id);
      setdeleteLoad(false);
      showNotification("Your document has been deleted");
    } else {
      showNotification("Something went wrong", "error");
    }
  };

  return (
    <div className="group bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-all duration-200 hover:shadow-lg hover:shadow-black/20">
      <div className="aspect-[3/4] bg-white rounded-lg mb-4 overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/5" />
        <Link
          href={`/documents/${doc.type}/${doc.id}`}
          className="aspect-[3/4] bg-white rounded-lg mb-4 overflow-hidden relative block"
        >
          <div className="h-full flex items-center justify-center bg-zinc-800 text-zinc-300">
            <FileText size={40} strokeWidth={1} />
          </div>
        </Link>
      </div>

      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm font-medium text-white truncate">{title}</h3>
          <div className="flex items-center gap-1.5 mt-1 text-xs text-zinc-500">
            <Clock size={12} /> <span>{doc.updatedAt}</span>
            <span className="text-zinc-700">•</span>
            <span className="capitalize">{doc.type}</span>
          </div>
        </div>
        <div ref={menuRef} className="menu-bar relative">
          <button
            onClick={() => setmenuOpen(!menuOpen)}
            className="sm:opacity-0 sm:group-hover:opacity-100 p-1 hover:bg-zinc-800 rounded transition-all"
          >
            <MoreVertical size={16} className="text-zinc-400" />
          </button>

          {menuOpen && (
            <div className="absolute right-7 top-4 z-50 bg-zinc-900 border border-zinc-700 rounded-lg shadow-xl py-1 min-w-[120px]">
              <Link href={`/documents/${doc.type}/${doc.id}`}>
                <button className="w-full px-3 py-2 text-sm text-zinc-300 hover:bg-zinc-800 text-left">
                  Open
                </button>
              </Link>
              <button
                onClick={() => {
                  handleDelete(doc.type, doc.id);
                }}
                className="w-full px-3 py-2 text-sm text-red-400 hover:bg-zinc-800 text-left"
              >
                {deleteLoad ? "Deleting..." : "Delete"}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="w-20 h-20 rounded-full bg-zinc-800/50 flex items-center justify-center mb-6">
        <FileText size={36} className="text-zinc-600" strokeWidth={1.5} />
      </div>
      <h2 className="text-xl font-semibold text-white mb-2">
        No documents yet
      </h2>
      <p className="text-zinc-400 text-sm text-center max-w-sm mb-6">
        Create your first invoice, quotation, resume or certificate in seconds.
      </p>
      <Link
        href="/templates"
        className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-900 font-medium px-6 py-3 rounded-full transition-all duration-200 hover:scale-105"
      >
        <Plus size={18} />
        Create Document
      </Link>{" "}
    </div>
  );
};

const DocumentStructure = () => {
  const { user, isLoaded } = useUser();
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDocuments = async () => {
      const docu = await GetDocuments();
      if (docu) {
        setDocuments(docu);
        setLoading(false);
      }
    };
    getDocuments();
  }, []);

  if (!isLoaded || loading) {
    return (
      <div className="min-h-screen bg-[#0c0c0e] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-zinc-700 border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-[91vh] bg-[#0c0c0e] pb-12 sm:pb-0">
      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Header */}{" "}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-white">
              My Documents
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              {documents.length > 0
                ? `${documents.length} document${documents.length > 1 ? "s" : ""}`
                : "Create and manage your documents"}
            </p>
          </div>
          {documents.length > 0 && (
            <Link
              href="/templates"
              className="inline-flex items-center gap-2 bg-white hover:bg-zinc-100 text-zinc-900 font-medium px-3 sm:px-5 py-2.5 rounded-full text-sm transition-all duration-200"
            >
              <Plus size={16} /> New Document
            </Link>
          )}
        </div>
        {/* Content */}
        {documents.length === 0 ? (
          <EmptyState />
        ) : (
          <>
            <div className="mb-8">
              <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                Recent Documents
              </h2>{" "}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                {documents.slice(0, 4).map((doc) => (
                  <DocumentCard
                    key={`${doc.type}-${doc.id}`}
                    doc={doc}
                    deletes={(type, id) => {
                      setDocuments(
                        documents.filter(
                          (d) => !(d.type === type && d.id === id),
                        ),
                      );
                    }}
                  />
                ))}
              </div>
            </div>

            {documents.length > 4 && (
              <div>
                <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider mb-4">
                  All Documents
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {documents.map((doc) => (
                    <DocumentCard
                      key={`${doc.type}-${doc.id}`}
                      doc={doc}
                      deletes={(type, id) => {
                        setDocuments(
                          documents.filter(
                            (d) => !(d.type === type && d.id === id),
                          ),
                        );
                      }}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentStructure;
