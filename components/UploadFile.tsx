"use client";

import { X } from "lucide-react";
import Image from "next/image";

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
  const uploadFile = async (file: File) => {
    if (!file) return;
    const data = new FormData();
    data.set("file", file);
    const response = await fetch(endpoint, {
      body: data,
      method: "POST",
      cache: "no-store",
    });
    if (!response.ok) throw new Error(await response.text());
    onChange((await response.json()).imageUrl);
  };

  if (value) {
    return (
      <div className="relative h-20 w-20">
        <Image fill src={value} alt="Upload" className="rounded-full" />
        <button
          onMouseUp={(e) => {
            onChange("");
          }}
          className="rounded-full bg-rose-500 text-white absolute top-0 right-0"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center w-full text-center">
      <label
        className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        onDrop={(event) => {
          event.preventDefault();
          const file = event.dataTransfer.files?.[0];
          if (!file) return;
          uploadFile(file);
        }}
        onDragOver={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className="flex flex-col items-center justify-center p-5">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF
          </p>
        </div>
        <input
          id="dropzone-file"
          type="file"
          className="hidden"
          accept="image/*"
          value={value}
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (!file) return;
            uploadFile(file);
          }}
        />
      </label>
    </div>
  );
};
