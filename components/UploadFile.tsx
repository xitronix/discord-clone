"use client";

import { X } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";

interface UploadFileProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint?: "/api/server-image";
}

export const UploadFile = ({
  endpoint = "/api/server-image",
  value,
  onChange,
}: UploadFileProps) => {
  if (value) {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onClick={() => onChange("")}
          className="rounded-full bg-rose-500 text-white absolute top-0 right-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
    <div className="relative h-20 w-20">
      <input
        type="file"
        accept="image/*"
        value={value}
        onChange={async (event) => {
          const file = event.target.files?.[0];
          if (!file) return;
          const data = new FormData();
          data.set("file", file);
          const response = await fetch(endpoint, {
            body: data,
            method: "POST",
          });
          if (!response.ok) throw new Error(await response.text());
          onChange((await response.json()).imageUrl);
        }}
      />
    </div>
  );
};

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
  maxDuration: 5,
};
