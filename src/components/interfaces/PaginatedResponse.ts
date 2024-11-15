// interfaces/PaginatedResponse.ts
interface PaginationLinks {
    first: string;
    last: string;
    prev: string;
    next: string;
  }
  
  interface PaginationLinkItem {
    url: string;
    label: string;
    active: boolean;
  }
  
  interface PaginationMeta {
    current_page: number;
    from: number;
    last_page: number;
    links: PaginationLinkItem[];
    path: string;
    per_page: number;
    to: number;
    total: number;
  }
  
  export interface PaginatedResponse<T> {
    data: T[]; // Array de tipo genérico
    links: PaginationLinks;
    meta: PaginationMeta;
  }
  