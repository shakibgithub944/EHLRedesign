import React from "react";
import { Button } from "./button";

interface SmartPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function SmartPagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: SmartPaginationProps) {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];

    if (totalPages <= 7) {
      // Show all pages if 7 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <Button
            key={i}
            onClick={() => onPageChange(i)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all text-sm font-medium ${
              i === currentPage
                ? "bg-primary-orange text-white border-primary-orange"
                : "bg-white text-gray-700 border-gray-200 hover:bg-primary-orange hover:text-white hover:border-primary-orange"
            }`}
            data-testid={`button-page-${i}`}
          >
            {i}
          </Button>
        );
      }
    } else {
      // Smart pagination for more than 7 pages
      // Always show first page
      pages.push(
        <Button
          key={1}
          onClick={() => onPageChange(1)}
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all text-sm font-medium ${
            1 === currentPage
              ? "bg-primary-orange text-white border-primary-orange"
              : "bg-white text-gray-700 border-gray-200 hover:bg-primary-orange hover:text-white hover:border-primary-orange"
          }`}
          data-testid="button-page-1"
        >
          1
        </Button>
      );

      // Show dots if current page is far from start
      if (currentPage > 4) {
        pages.push(
          <div
            key="dots-start"
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
          >
            <span className="text-gray-400 font-medium">...</span>
          </div>
        );
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        if (i !== 1 && i !== totalPages) {
          pages.push(
            <Button
              key={i}
              onClick={() => onPageChange(i)}
              className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all text-sm font-medium ${
                i === currentPage
                  ? "bg-primary-orange text-white border-primary-orange"
                  : "bg-white text-gray-700 border-gray-200 hover:bg-primary-orange hover:text-white hover:border-primary-orange"
              }`}
              data-testid={`button-page-${i}`}
            >
              {i}
            </Button>
          );
        }
      }

      // Show dots if current page is far from end
      if (currentPage < totalPages - 3) {
        pages.push(
          <div
            key="dots-end"
            className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12"
          >
            <span className="text-gray-400 font-medium">...</span>
          </div>
        );
      }

      // Always show last page
      if (totalPages > 1) {
        pages.push(
          <Button
            key={totalPages}
            onClick={() => onPageChange(totalPages)}
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg border transition-all text-sm font-medium ${
              totalPages === currentPage
                ? "bg-primary-orange text-white border-primary-orange"
                : "bg-white text-gray-700 border-gray-200 hover:bg-primary-orange hover:text-white hover:border-primary-orange"
            }`}
            data-testid={`button-page-${totalPages}`}
          >
            {totalPages}
          </Button>
        );
      }
    }

    return pages;
  };

  return (
    <div className={`flex justify-center mt-8 sm:mt-12 ${className}`}>
      <nav className="flex items-center gap-1 sm:gap-2">
        {/* Previous Button */}
        <Button
          onClick={() => {
            if (currentPage > 1) {
              onPageChange(currentPage - 1);
            }
          }}
          disabled={currentPage === 1}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-previous-page"
        >
          <i className="fas fa-chevron-left text-sm"></i>
        </Button>

        {/* Page Numbers */}
        {renderPageNumbers()}

        {/* Next Button */}
        <Button
          onClick={() => {
            if (currentPage < totalPages) {
              onPageChange(currentPage + 1);
            }
          }}
          disabled={currentPage === totalPages}
          className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-white border border-gray-200 text-gray-600 hover:bg-primary-orange hover:text-white hover:border-primary-orange transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          data-testid="button-next-page"
        >
          <i className="fas fa-chevron-right text-sm"></i>
        </Button>
      </nav>
    </div>
  );
}
