export type PizzaItem = {
  category: number;
  id: number;
  imageUrl: string;
  name: string;
  parentId: number;
  price: number;
  rating: number;
  sizes: number[];
  types: number[];
};

export type MyData = {
  items: PizzaItem[];
  meta: {
    current_page: number;
    per_page: number;
    remaining_count: number;
    total_items: number;
    total_pages: number;
  };
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export type PizzaSliseState = {
  items: PizzaItem[];
  status: Status; // loading | success | error
  paginationInfo: {}; // для пагинации
};

export type SearchPizzaParams = {
  sortBy: string;
  search: string;
  category: string;
  currentPage: number;
};
