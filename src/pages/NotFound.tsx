import React from "react";

export const NotFound: React.FC = () => {
  return (
    <div className="not-found-wrapper">
      <h1>
        <span>😕</span>
        <br />
        Ничего не найдено
      </h1>
      <p className="not-found-description">
        К сожалению данная страница отсутствует в нашем интернет-магазине
      </p>
    </div>
  );
};
