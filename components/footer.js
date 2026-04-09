"use client";
import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";

const Footer = () => {
  const { userId } = useAuth();

  if (userId) {
    return (
      <footer className="bg-zinc-950 border-t block sm:hidden border-zinc-800/50 fixed bottom-0 w-full">
        <div className="max-w-6xl mx-auto px-5 py-2">
          <div className="flex items-center justify-around">
            <div className="flex items-center gap-1">
              <Link
                href="/templates"
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
              >
                Templates
              </Link>{" "}
              <Link
                href="/documents"
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200"
              >
                Documents
              </Link>
            </div>

            <a
              href="https://github.com/virat-pod"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-lg transition-all duration-200 group"
            >
              <Image
                src={"svg-icons/github.svg"}
                width={26}
                height={26}
                alt="github"
                className="invert"
              />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </div>
      </footer>
    );
  }

  return (
    <footer className="bg-zinc-950 border-t border-zinc-800/50">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-block">
              <div className="text-2xl font-bold tracking-tight text-white mb-3">
                Docu<span className="text-yellow-300">Maker</span>
              </div>
            </Link>
            <p className="text-sm text-zinc-400 max-w-sm leading-relaxed">
              {" "}
              Create professional invoices, quotations, and resumes in seconds.
              Open source & free forever.
            </p>
            <div className="flex gap-3 mt-5">
              <a
                href="https://github.com/virat-pod"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 hover:scale-110"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-zinc-800/50 hover:bg-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all duration-200 hover:scale-110"
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-4">
              {" "}
              Product
            </div>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/templates"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Templates
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="/features"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  {" "}
                  Features
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <div className="text-xs font-semibold tracking-wider uppercase text-zinc-500 mb-4">
              Resources
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/virat-pod"
                  target="_blank"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/support"
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>{" "}
            </ul>
          </div>
        </div>

        <div className="border-t border-zinc-800/50 mt-10 pt-6 flex flex-wrap justify-between items-center gap-4">
          <div className="text-xs text-zinc-500">
            © {new Date().getFullYear()} DocuMaker. Open source & free forever.
          </div>
          <div className="flex gap-6 text-xs text-zinc-500">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms{" "}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
