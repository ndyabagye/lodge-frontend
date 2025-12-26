interface PaginationProps {
  current_page: number;
  last_page: number;
  total: number;
}
// Helper function to generate page numbers with ellipsis
export const generatePageNumbers = (
  currentPage: number,
  pagination: PaginationProps | undefined,
) => {
  if (!pagination) return [];

  const { last_page } = pagination;
  const pages: (number | string)[] = [];
  const maxVisible = 5; // Maximum visible page numbers

  if (last_page <= maxVisible) {
    // Show all pages
    for (let i = 1; i <= last_page; i++) {
      pages.push(i);
    }
  } else {
    // Logic for showing pages with ellipsis
    if (currentPage <= 3) {
      // Near the start
      for (let i = 1; i <= 4; i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
      pages.push(last_page);
    } else if (currentPage >= last_page - 2) {
      // Near the end
      pages.push(1);
      pages.push("ellipsis");
      for (let i = last_page - 3; i <= last_page; i++) {
        pages.push(i);
      }
    } else {
      // In the middle
      pages.push(1);
      pages.push("ellipsis");
      for (let i = currentPage - 1; i <= currentPage + 1; i++) {
        pages.push(i);
      }
      pages.push("ellipsis");
      pages.push(last_page);
    }
  }

  return pages;
};
