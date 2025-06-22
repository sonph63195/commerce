"use client";

import {
	Pagination,
	PaginationContent,
	PaginationItem,
	PaginationLink,
	PaginationPrevious,
	PaginationNext,
} from "@/components/molecules/pagination";
import type { MouseEvent } from "react";

interface IProductPaginationProps {
	totalPages: number;
	currentPage: number;
	pageSize?: number;
	q?: string;
	category?: string;
	onPageChange?: (page: number) => void;
}

export function ProductPagination({
	totalPages,
	currentPage,
	pageSize = 9,
	q = "",
	category = "",
	onPageChange,
}: IProductPaginationProps) {
	if (totalPages <= 1) return null;

	const getHref = (page: number) =>
		`?q=${encodeURIComponent(q)}${category ? `&category=${encodeURIComponent(category)}` : ""}&pageSize=${pageSize}&pageNumber=${page}`;

	const handleClick = (page: number) => (e: MouseEvent<HTMLAnchorElement>) => {
		if (onPageChange) {
			e.preventDefault();
			onPageChange(page);
		}
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={getHref(Math.max(1, currentPage - 1))}
						onClick={currentPage === 1 ? undefined : handleClick(currentPage - 1)}
						aria-disabled={currentPage === 1}
						tabIndex={currentPage === 1 ? -1 : 0}
					/>
				</PaginationItem>
				{Array.from({ length: totalPages }, (_, i) => {
					const page = i + 1;
					return (
						<PaginationItem key={`page-${page}`}>
							<PaginationLink
								href={getHref(page)}
								isActive={currentPage === page}
								onClick={onPageChange ? handleClick(page) : undefined}
								aria-current={currentPage === page ? "page" : undefined}
							>
								{page}
							</PaginationLink>
						</PaginationItem>
					);
				})}
				<PaginationItem>
					<PaginationNext
						href={getHref(Math.min(totalPages, currentPage + 1))}
						onClick={currentPage === totalPages ? undefined : handleClick(currentPage + 1)}
						aria-disabled={currentPage === totalPages}
						tabIndex={currentPage === totalPages ? -1 : 0}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
