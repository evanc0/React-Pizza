import { SortListItem, SortPropertyEnum } from "../redux/filter/types";

export const TypePizza = {
  SLIM: "тонкое",
  TRADITIONAL: "традиционное",
} as const;

//TODO: Переделать категории из 0,1,2,3 в слова
export const CategoryPizza = {};

export const sortList: SortListItem[] = [
  {
    name: "популярности (по возрастанию)",
    sortProperty: SortPropertyEnum.RATING_DESC,
  },
  {
    name: "популярности (по убыванию)",
    sortProperty: SortPropertyEnum.RATING_ASC,
  },
  { name: "цене (по возрастанию)", sortProperty: SortPropertyEnum.PRICE_DESC },
  { name: "цене (по убыванию)", sortProperty: SortPropertyEnum.PRICE_ASC },
  {
    name: "алфавиту (по возрастанию)",
    sortProperty: SortPropertyEnum.NAME_DESC,
  },
  { name: "алфавиту (по убыванию)", sortProperty: SortPropertyEnum.NAME_ASC },
];
