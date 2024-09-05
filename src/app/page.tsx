"use client";

import { GenerateLinkForm } from "@/components/generate-link-form";

export default function Home() {
  return (
    <div className="mx-auto max-w-md p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Countdown Timer</h1>
          <p className="text-muted-foreground">
            Create a custom countdown timer and share the unique link.
          </p>
        </div>
      </div>

      <GenerateLinkForm />
    </div>
  );
}
