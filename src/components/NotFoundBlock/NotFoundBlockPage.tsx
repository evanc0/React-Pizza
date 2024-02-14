import React from "react";
import Header from "../Header";
import styles from "./NotFoundBlock.module.scss";
import { useLocation } from "react-router-dom";

const NotFoundBlockPage: React.FC = () => {
  const location = useLocation();
  return (
    <>
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container"></div>
          <div className={styles.root}>
            <h1>
              <span>😕</span>
              <br />
              Ничего не найдено
            </h1>
            <p className={styles.description}>
              К сожалению данная страница отсутствует в нашем интернет-магазине
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundBlockPage;
