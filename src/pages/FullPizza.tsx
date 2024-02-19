import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { SearchPizzaParams } from "../redux/slices/pizzaSlice";

const FullPizza: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  }>();
  const { id } = useParams();
  const navigate = useNavigate();

  React.useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          `https://6d551e6e4aa49570.mokky.dev/items/${id}`
        );
        setPizza(data);
        console.log(data);
      } catch (error) {
        alert("Ошибка при получении пиццы");
        navigate("/");
      }
    }

    fetchPizza();
  }, []);

  if (!pizza) {
    return <>Загрузка...</>;
  }

  return (
    <div className="container">
      <img src={pizza.imageUrl} alt="" />
      <h2>{pizza.name}</h2>
      <h4>{pizza.price} ₽</h4>
    </div>
  );
};

export default FullPizza;
