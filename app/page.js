"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

const DOCS = [
  {
    icon: "🧾",
    label: "invoice",
    audience: "Business",
    diff: "Medium",
    tag: "Popular",
  },
  {
    icon: "🧾",
    label: "quotation",
    audience: "Business",
    diff: "Medium",
    tag: "Quick",
  },
  {
    icon: "📄",
    label: "resume",
    audience: "Students",
    diff: "Medium",
    tag: "New",
  },
  {
    icon: "🏅",
    label: "certificate",
    audience: "Schools",
    diff: "Easy",
    tag: "New",
  },
];

export default function HomePage() {
  const heroRef = useRef(null);

  return (
    <main className="font-sans flex flex-col py-22 gap-36 bg-[#0a0a0f] text-white relative overflow-hidden">
      {/* Grid background */}
      {/* Glows - now on main level */}
      <div
        className="absolute rounded-full blur-[120px] pointer-events-none"
        style={{
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle, rgba(245,230,66,0.12) 0%, transparent 70%)",
          left: "0%",
          top: "-5%",
        }}
      />
      <div
        className="absolute rounded-full blur-[120px] pointer-events-none"
        style={{
          width: 400,
          height: 400,
          background:
            "radial-gradient(circle, rgba(255,140,66,0.1) 0%, transparent 70%)",
          right: "10%",
          top: "15%",
        }}
      />
      <div
        className="absolute rounded-full blur-[120px] pointer-events-none"
        style={{
          width: 600,
          height: 600,
          background:
            "radial-gradient(circle, rgba(245,230,66,0.08) 0%, transparent 70%)",
          left: "20%",
          top: "60%",
        }}
      />

      <section
        ref={heroRef}
        className="px-6 flex items-center relative"
      >

        <div className="max-w-6xl mx-auto w-full relative z-10">
          <div className="max-w-[620px]">
            <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1 text-xs text-gray-400 mb-8 backdrop-blur">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              No account needed to preview
            </div>

            <h1 className="text-[clamp(34px,5vw,56px)] leading-[1.1] tracking-tight mb-5 font-serif">
              Create better{" "}
              <span className="bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                documents
              </span>
              <br /> without the hassle.
            </h1>

            <p className="text-[15px] text-gray-400 leading-relaxed max-w-[440px] mb-4">
              Invoices, resumes, and certificates — ready in minutes. Clean
              templates. Instant PDF export.
            </p>

            <p className="text-xs text-gray-500 mb-10">
              💻 Prefer to use it on big screen
            </p>

            <div className="flex gap-4 ">
              <Link
                href="/signup"
                className="hidden sm:flex items-center gap-2 bg-white text-black px-8 py-4 rounded-full font-semibold text-sm hover:-translate-y-1 transition"
              >
                Start for free →
              </Link>
              <Link
                href="/signup"
                className="flex sm:hidden items-center gap-2 bg-white text-black px-5 py-4 rounded-full font-semibold text-sm hover:-translate-y-1 transition"
              >
                Get started
              </Link>

              <Link
                href="/templates"
                className="flex items-center gap-2 text-gray-400 px-5 sm:px-6 py-4 rounded-full border border-white/10 hover:text-white hover:border-white/20 transition"
              >
                Browse templates
              </Link>
            </div>

            <div className="mt-12 flex gap-8 flex-wrap">
              {[
                ["4 docs", "ready to use"],
                ["PDF export", "server-side"],
                ["100% free", "open source philosophy"],
              ].map(([a, b]) => (
                <div key={a}>
                  <div className="text-xl font-serif">{a}</div>
                  <div className="text-xs text-gray-500 mt-1">{b}</div>{" "}
                </div>
              ))}
            </div>
          </div>

          <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[320px] lg:w-[380px]">
            <div className="relative">
              <div className="absolute -top-5 -right-5 w-full opacity-40 rotate-3 bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur" />
              <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur">
                <div className="flex justify-between mb-6">
                  <div>
                    <div className="text-xs text-gray-500 uppercase mb-1">
                      Invoice
                    </div>{" "}
                    <div className="text-xl font-serif">DocCraft Co.</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-500">#INV-0042</div>
                    <div className="text-sm text-yellow-300 mt-1">
                      Due Apr 30
                    </div>
                  </div>
                </div>

                {[
                  ["Design services", "$1,200"],
                  ["Dev hours ×8", "$960"],
                  ["Domain & hosting", "$80"],
                ].map(([item, val]) => (
                  <div
                    key={item}
                    className="flex justify-between py-3 border-b border-white/10 text-sm text-gray-400"
                  >
                    <span>{item}</span>
                    <span>{val}</span>
                  </div>
                ))}

                <div className="flex justify-between mt-5 font-semibold text-base">
                  <span>Total</span>
                  <span className="text-yellow-300">$2,240</span>
                </div>

                <div className="mt-5 p-2 bg-yellow-300/10 rounded text-xs text-yellow-300 text-center">
                  {" "}
                  ✓ PDF ready to download
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-xs tracking-[3px] uppercase text-yellow-300 mb-5 font-semibold">
            What you can create
          </div>

          <h2 className="text-[clamp(36px,5vw,56px)] leading-tight font-serif mb-10">
            Four documents.
            <br />
            Endless use cases.
          </h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-5">
            {DOCS.map((doc) => (
              <Link
                key={doc.label}
                href={`/templates/${doc.label}`}
                className="relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-yellow-300/40 hover:-translate-y-1 transition"
              >
                <span className="absolute top-5 right-5 text-[10px] font-bold uppercase bg-yellow-300/20 text-yellow-300 px-3 py-1 rounded-full">
                  {doc.tag}
                </span>

                <span className="text-4xl mb-5 block">{doc.icon}</span>

                <div className="text-2xl font-serif mb-2">{doc.label}</div>

                <div className="text-sm text-gray-500 flex gap-4">
                  <span>👥 {doc.audience}</span>
                  <span>⚡ {doc.diff}</span>
                </div>
              </Link>
            ))}
          </div>

          <div className="bg-gradient-to-br from-yellow-300 to-orange-400 rounded-2xl p-14 mt-20 flex flex-wrap items-center justify-between gap-10">
            <div>
              <h2 className="text-3xl font-serif text-black">
                Ready to make your first document?
              </h2>
              <p className="text-black/60 mt-2 text-sm">
                Sign up free — no credit card needed.
              </p>
            </div>

            <Link
              href="/signup"
              className="bg-black text-white px-8 py-4 rounded-full font-semibold hover:-translate-y-1 hover:shadow-xl transition"
            >
              Get started free →
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
