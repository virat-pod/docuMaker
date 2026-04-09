"use client";

import { useState } from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { SignInButton, SignUpButton, SignOutButton, Show } from "@clerk/nextjs";
import { DeleteAccount } from "@/actions/user";
import { FileText } from "lucide-react";
import Link from "next/link";

const Navbar = () => {
  const { user } = useUser();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const { signOut } = useClerk();

  const handleDeleteAccount = async () => {
    setDeleting(true);

    const deleting = await DeleteAccount();
    if (deleting.success) {
      await signOut();
      window.location.href = "/";
    } else {
      setDeleting(false);
      setShowDeleteModal(false);
    }
  };

  return (
    <nav className="bg-black px-4 md:px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <Link href="/">
        <h1 className="text-xl font-bold tracking-tight">
          <span className="text-white">Docu</span>
          <span className="text-yellow-300">Maker</span>
        </h1>
      </Link>
      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className="text-sm text-zinc-400 hover:text-white transition">
              Login
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className="text-sm font-medium bg-white text-black px-4 py-2 rounded-full hover:bg-zinc-200 transition">
              {" "}
              Sign Up
            </button>
          </SignUpButton>
        </Show>
        <Show when="signed-in">
          <div className="flex gap-8 relative">
            <div className="hidden sm:flex items-center gap-6">
              <Link
                href="/templates"
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                Templates
              </Link>
              <Link
                href="/documents"
                className="text-sm text-zinc-400 hover:text-white transition"
              >
                Documents{" "}
              </Link>
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-sm font-medium text-white hover:bg-zinc-700 transition"
            >
              {user?.firstName?.charAt(0) ||
                user?.emailAddresses[0]?.emailAddress
                  ?.charAt(0)
                  .toUpperCase() ||
                "U"}
            </button>

            {menuOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setMenuOpen(false)}
                />
                <div className="absolute right-0 top-12 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-50 overflow-hidden">
                  <div className="px-4 py-3 border-b border-zinc-800">
                    <div className="text-sm font-medium text-white truncate">
                      {user?.firstName || "User"}
                    </div>
                    <div className="text-xs text-zinc-500 truncate">
                      {user?.emailAddresses[0]?.emailAddress}
                    </div>
                  </div>

                  <div className="py-2">
                    <Link
                      href="/templates"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                        />
                      </svg>
                      Templates
                    </Link>
                    <Link
                      href="/documents"
                      onClick={() => setMenuOpen(false)}
                      className="flex items-center gap-3 px-4 py-2 text-sm text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
                    >
                      <FileText size={16} strokeWidth={1} /> Documents
                    </Link>
                  </div>

                  <div className="border-t border-zinc-800 py-2">
                    <button
                      onClick={() => {
                        setShowDeleteModal(true);
                        setMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-2 w-full text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition"
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>{" "}
                      Delete Account
                    </button>
                    <SignOutButton>
                      <button className="flex items-center gap-3 px-4 py-3 w-full text-sm text-red-400 hover:text-red-700 hover:bg-red-500/10 transition">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                          />
                        </svg>
                        Sign out
                      </button>
                    </SignOutButton>
                  </div>
                </div>
              </>
            )}
          </div>
        </Show>
      </div>
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/80"
            onClick={() => setShowDeleteModal(false)}
          />
          <div className="relative bg-zinc-900 border border-zinc-800 rounded-2xl p-6 max-w-md mx-4 shadow-2xl">
            <div className="text-center">
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-6 h-6 text-red-500"
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
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Delete Account
              </h3>
              <p className="text-sm text-zinc-400 mb-6">
                All your documents, data, and information will be permanently
                deleted. This action cannot be undone.{" "}
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 px-4 py-3 bg-zinc-800 text-white rounded-xl hover:bg-zinc-700 transition font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="flex-1 px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-medium disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
