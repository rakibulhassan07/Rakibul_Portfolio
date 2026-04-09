"use client";

import { useEffect, useState } from "react";
import BlogAdminPanel from "@/components/admin/BlogAdminPanel";
import BlogLogin from "@/components/admin/BlogLogin";

export default function RakibAdminPage() {
  const [adminPassword, setAdminPassword] = useState<string | null>(null);
  const [loginResetKey, setLoginResetKey] = useState(0);

  useEffect(() => {
    const handlePageShow = () => {
      // Reset sensitive in-memory password when returning to this URL.
      setAdminPassword(null);
      setLoginResetKey((prev) => prev + 1);
    };

    window.addEventListener("pageshow", handlePageShow);
    return () => {
      window.removeEventListener("pageshow", handlePageShow);
    };
  }, []);

  if (!adminPassword) {
    return <BlogLogin key={loginResetKey} resetKey={loginResetKey} onAuthenticated={setAdminPassword} />;
  }

  return (
    <BlogAdminPanel
      adminPassword={adminPassword}
      onLogout={() => {
        setAdminPassword(null);
        setLoginResetKey((prev) => prev + 1);
      }}
    />
  );
}
