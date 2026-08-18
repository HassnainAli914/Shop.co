import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination";

export default function Paginationpage({ currentPage = 1, onPageChange }) {
  return (
    <div className="w-full mt-8 py-4 border-t border-gray-100">
      <Pagination>
        <PaginationContent className="w-full space-x-2 flex justify-between items-center max-w-screen-xl mx-auto">
          <PaginationItem>
            <PaginationPrevious
              onClick={() => onPageChange && onPageChange(Math.max(1, currentPage - 1))}
            />
          </PaginationItem>

          <div className="flex items-center space-x-1 sm:space-x-2">
            <PaginationItem>
              <PaginationLink isActive={currentPage === 1} onClick={() => onPageChange && onPageChange(1)}>
                1
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={currentPage === 2} onClick={() => onPageChange && onPageChange(2)}>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden sm:block">
              <PaginationLink isActive={currentPage === 3} onClick={() => onPageChange && onPageChange(3)}>
                3
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className="hidden sm:block">
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink isActive={currentPage === 10} onClick={() => onPageChange && onPageChange(10)}>
                10
              </PaginationLink>
            </PaginationItem>
          </div>

          <PaginationItem>
            <PaginationNext
              onClick={() => onPageChange && onPageChange(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
