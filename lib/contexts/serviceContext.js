"use client";
import { createContext, useContext, useState } from "react";

export const NotificationContext = createContext();

export function useNotification() {
  return useContext(NotificationContext);
}

export const NotificationProvider = ({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}

      {notification && (
        <div
          className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl border shadow-sm transition-all duration-300 ${
            notification.type === "error"
              ? "bg-red-50 border-red-200 text-red-700"
              : notification.type === "warning"
                ? "bg-amber-50 border-amber-200 text-amber-700"
                : "bg-white border-[#e8e5de] text-[#1a1916]"
          }`}
        >
          <p className="text-xs font-medium whitespace-nowrap">
            {notification.message}
          </p>
        </div>
      )}
    </NotificationContext.Provider>
  );
};