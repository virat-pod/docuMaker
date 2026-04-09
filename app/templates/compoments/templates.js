"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import InvoicePreview from "@/components/documents/invoice";
import QuotationPreview from "@/components/documents/quotation";
import ResumePreview from "@/components/documents/resume";
import CertificatePreview from "@/components/documents/certificate";
import { userCreation } from "@/actions/user";
import { useUser } from "@clerk/nextjs";

const TEMPLATES = [
  {
    type: "invoice",
    label: "Invoice",
    tags: ["Business", "Medium"],
    desc: "Itemized billing with line items, due dates, and payment terms.",
    preview: <InvoicePreview />,
  },
  {
    type: "quotation",
    label: "Quotation",
    tags: ["Business", "Easy"],
    desc: "Clean Quotation for any query. Print or share as PDF instantly.",
    preview: <QuotationPreview />,
  },
  {
    type: "resume",
    label: "Resume",
    tags: ["Students", "Medium"],
    desc: "ATS-friendly layout with experience, skills, and education sections.",
    preview: <ResumePreview />,
  },
  {
    type: "certificate",
    label: "Certificate",
    tags: ["Schools", "Easy"],
    desc: "Elegant certificates for courses, achievements, and events.",
    preview: <CertificatePreview />,
  },
];

export default function Templates() {
  const [hovered, setHovered] = useState(null);

  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;

    const createUser = async () => {
      if (isLoaded && user) {
        await userCreation();
      }
    };
    createUser();
  }, [isLoaded, user]);

  return (
    <main className="bg-[#0c0c0e] min-h-screen font-sans">
      <section className="pt-14 sm:pt-18 px-4 pb-20  text-center">
        <div className="inline-flex items-center gap-1.5 border border-white/10 rounded-full px-[14px] py-[5px] text-[11px] text-white/40 tracking-[0.04em] uppercase mb-7">
          4 templates · free to use
        </div>

        <h1 className="text-[clamp(28px,4vw,48px)] text-6xl font-semibold tracking-[-0.03em] leading-[1.1] text-white mb-2">
          Professional documents,
          <br />
          <span className="text-white/25 animate-pulse">done in minutes.</span>
        </h1>

        <p className="text-sm text-white/30 max-w-[360px] mx-auto mt-[14px] leading-relaxed">
          Choose a template. Fill your details. Export as PDF — ready to send.
        </p>
      </section>

      <section className="max-w-6xl px-4 mx-auto pb-20">
        <div className="grid grid-cols-[repeat(auto-fill,minmax(310px,1fr))] gap-5">
          {TEMPLATES.map((t) => (
            <div
              key={t.type}
              onMouseEnter={() => setHovered(t.type)}
              onMouseLeave={() => setHovered(null)}
              className="rounded-2xl bg-[#111114] border overflow-hidden cursor-pointer transition-all duration-200"
              style={{
                borderColor:
                  hovered === t.type
                    ? "rgba(255,255,255,0.14)"
                    : "rgba(255,255,255,0.06)",
                transform: hovered === t.type ? "translateY(-4px)" : "none",
              }}
            >
              <div className="m-3 rounded-lg bg-white overflow-hidden shadow-[0_2px_0_rgba(0,0,0,0.06),0_8px_32px_rgba(0,0,0,0.45)] h-106">
                <Link href={`/templates/${t.type}`} className="h-full">
                  {t.preview}
                </Link>
              </div>

              <div className="px-5 pt-4">
                <div className="text-[14px] font-semibold tracking-[-0.3px] text-white mb-1">
                  {t.label}
                </div>
                <div className="text-[12px] text-white/30 leading-relaxed">
                  {t.desc}
                </div>
              </div>

              <div className="px-5 pt-[14px] pb-[18px] flex items-center justify-between mt-3">
                <div className="flex gap-1.5">
                  {t.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[11px] px-2.5 py-1 rounded-full bg-white/5 text-white/30 border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/templates/${t.type}`}
                  className="text-[12px] bg-white hover:bg-stone-100 font-semibold px-5 py-2 rounded-full tracking-[-0.2px] no-underline text-[#0c0c0e]"
                >
                  Use template
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
