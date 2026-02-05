"use client";

import { useEffect } from "react";
import { useParams, useRouter, notFound } from "next/navigation";
import { getCompanyRoleConfig } from "@/lib/companies";

export default function CompanyRolePage() {
  const params = useParams();
  const router = useRouter();
  const company = typeof params.company === "string" ? params.company : "";
  const role = typeof params.role === "string" ? params.role : "";
  const config = getCompanyRoleConfig(company, role);

  useEffect(() => {
    if (!config) return;

    // Store company+role info for boot screen + Director's Pick to read
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
