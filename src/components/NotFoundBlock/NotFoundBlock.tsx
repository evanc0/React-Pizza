import styles from "./NotFoundBlock.module.scss";
// import { useLocation } from 'react-router-dom';

const NotFoundBlock: React.FC = () => {
  // const location = useLocation();
  return (
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
  );
};

export default NotFoundBlock;
