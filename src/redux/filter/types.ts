export enum SortPropertyEnum {
  RATING_DESC = "rating",
  RATING_ASC = "-rating",
  NAME_DESC = "name",
  NAME_ASC = "-name",
  PRICE_DESC = "price",
  PRICE_ASC = "-price",
}

export type Sort = {
  name: string;
  sortProperty: SortPropertyEnum;
};

export type FilterSliseState = {
  searchValue: string;
  categoryId: number;
  currentPage: number;
  sort: Sort;
};

export type SortListItem = {
  name: string;
  sortProperty: SortPropertyEnum;
};
