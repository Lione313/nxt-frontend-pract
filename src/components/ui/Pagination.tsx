"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  lastPage: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, lastPage, onPageChange }: PaginationProps) {
  if (lastPage <= 1) return null;

  const pages = Array.from({ length: lastPage }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center mt-6 gap-2 select-none">
      
      {/* Prev Button */}
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="p-2 rounded-xl border border-gray-300 bg-white shadow-sm
                   hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page numbers */}
      <div className="flex gap-2">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`px-3 py-2 rounded-xl text-sm font-medium transition
              ${
                p === page
                  ? "bg-black text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200"
              }
            `}
          >
            {p}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button
        disabled={page === lastPage}
        onClick={() => onPageChange(page + 1)}
        className="p-2 rounded-xl border border-gray-300 bg-white shadow-sm
                   hover:bg-gray-100 transition disabled:opacity-40 disabled:cursor-not-allowed"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
}
