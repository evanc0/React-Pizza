import { Header } from "../components/index";
import { Outlet } from "react-router-dom";

const MainLoyout = () => {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLoyout;
