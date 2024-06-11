import { Route, Routes } from "react-router-dom";
import "./App.css";
import Footer from "./components/Footer";
import Home from "./components/Home";
import ItemPage from "./components/ItemPage";
import Items from "./components/Items";
import Nav from "./components/Nav";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Basket from "./components/Basket";
import Completion from "./components/Completion";

const App = () => {
  const [basket, setBasket] = useState<any>("");

  useEffect(() => {
    const value = Cookies.get("basket");
    if (value) {
      setBasket((currentBasket: any) => {
        return currentBasket + value;
      });
    }
  }, []);
  return (
    <>
      <Nav basket={basket} setBasket={setBasket} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Home />
              <Items setBasket={setBasket} basket={basket} />
            </>
          }
        />
        <Route path="/:id" element={<ItemPage setBasket={setBasket} />} />
        <Route
          path="/basket"
          element={<Basket basket={basket} setBasket={setBasket} />}
        />
        <Route
          path={"/completion"}
          element={<Completion setBasket={setBasket} />}
        />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
