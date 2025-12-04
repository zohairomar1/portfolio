"use client";

import { useEffect } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import { getCompanyConfig } from "@/lib/companies";

export default function CompanyPage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params.company === "string" ? params.company : "";
  const config = getCompanyConfig(slug);

  useEffect(() => {
    if (!config) return;

    // Store company info for boot screen + home page to read
    sessionStorage.setItem("vhs-company", JSON.stringify(config));
    // Force boot screen to replay with company branding
    sessionStorage.removeItem("vhs-booted");
    // Redirect to home (replace so back button doesn't loop)
    router.replace("/");
  }, [config, router]);

  if (!config) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="font-mono text-sm text-gray-600 animate-pulse">
        LOADING...
      </div>
    </div>
  );
}
