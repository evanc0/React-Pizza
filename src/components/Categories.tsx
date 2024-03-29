import { memo } from "react";

type Props = {
  value: number;
  onChangeCategory: (index: number) => void;
};
const categories = [
  "Все",
  "Мясные",
  "Вегетарианская",
  "Гриль",
  "Острые",
  "Закрытые",
];

export const Categories: React.FC<Props> = memo(
  ({ value, onChangeCategory }) => {
    return (
      <div className="categories">
        <ul>
          {categories.map((categoryName, index) => (
            <li
              className={value === index ? "active" : ""}
              onClick={() => onChangeCategory(index)}
              key={index}
            >
              {categoryName}
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
