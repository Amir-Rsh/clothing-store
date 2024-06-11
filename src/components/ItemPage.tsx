import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Payments from "./Payments";
import Cookies from "js-cookie";

interface ItemPageProps {
  setBasket: any;
  basket: string;
}

const ItemPage: React.FC<ItemPageProps> = ({ setBasket, basket }) => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [amount, setAmount] = useState(1);
  const [item, setItem] = useState({
    category: null,
    collection: null,
    img_url: null,
    name: null,
    price: null,
    _id: null,
  });
  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://be-e-commerce.onrender.com/clothes/${id}`)
      .then((response) => {
        setItem(response.data.clothing);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAdd = () => {
    setAmount((currentAmount) => {
      return currentAmount + 1;
    });
  };

  const handleReduce = () => {
    if (amount < 2) {
      return;
    }
    setAmount((currentAmount) => {
      return currentAmount - 1;
    });
  };

  const handleAddToBasket = (e: any) => {
    const id = e.target.id;

    setBasket((currentBasket: string) => {
      if (currentBasket.includes(id)) {
        alert("item already in basket. you can set the amount in your basket");

        return currentBasket;
      } else {
        const newBasket =
          currentBasket.length > 0 ? currentBasket + "," + id : id;

        Cookies.set("basket", newBasket, { expires: 7 });

        return newBasket;
      }
    });
  };

  return loading ? (
    <>
      <div
        style={{
          width: "100%",
          backgroundColor: "darkgray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
          marginTop: "210px",
        }}
      >
        <h3>Loading your item</h3>
      </div>
    </>
  ) : (
    <>
      <h1 style={{ textAlign: "center", marginTop: "130px" }}>{item.name}</h1>
      <div id="item-payment">
        <div id="item-container">
          <img id="item-img" src={item.img_url ? item.img_url : ""} alt="" />
          <div id="color-amount">
            <h3>Please choose the color</h3>
            <ul>
              <li>
                <input className="colorInput" type="radio" name="color" id="" />
                <p
                  style={{
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderColor: "black",
                    width: "60px",
                    backgroundColor: "blue",
                    color: "blue",
                  }}
                >
                  blue
                </p>
              </li>
              <li>
                <input className="colorInput" type="radio" name="color" id="" />
                <p
                  style={{
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderColor: "black",
                    width: "60px",
                    backgroundColor: "brown",
                    color: "brown",
                  }}
                >
                  brown
                </p>
              </li>
              <li>
                <input className="colorInput" type="radio" name="color" id="" />
                <p
                  style={{
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderColor: "black",
                    width: "60px",
                    backgroundColor: "black",
                    color: "black",
                  }}
                >
                  black
                </p>
              </li>
              <li>
                <input className="colorInput" type="radio" name="color" id="" />
                <p
                  style={{
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderColor: "black",
                    width: "60px",
                    backgroundColor: "white",
                    color: "white",
                  }}
                >
                  white
                </p>
              </li>
              <li>
                <input className="colorInput" type="radio" name="color" id="" />
                <p
                  style={{
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderColor: "black",
                    width: "60px",
                    backgroundColor: "purple",
                    color: "purple",
                  }}
                >
                  purple
                </p>
              </li>
              <li>
                <input className="colorInput" type="radio" name="color" id="" />
                <p
                  style={{
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderColor: "black",
                    width: "60px",
                    backgroundColor: "yellow",
                    color: "yellow",
                  }}
                >
                  yellow
                </p>
              </li>
              <li>
                <input className="colorInput" type="radio" name="color" id="" />
                <p
                  style={{
                    borderRadius: "10%",
                    borderStyle: "solid",
                    borderColor: "black",
                    width: "60px",
                    backgroundColor: "green",
                    color: "green",
                  }}
                >
                  green
                </p>
              </li>
            </ul>
            <h3>
              Amount:
              <button onClick={handleReduce} className="adders">
                -
              </button>
              {amount}
              <button onClick={handleAdd} className="adders">
                +
              </button>
            </h3>
          </div>
        </div>
        <div
          style={{
            width: "fit-content",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div id="stripe">
            <h1
              style={{
                textAlign: "center",
                backgroundColor: "gray",
                borderRadius: "3%",
              }}
            >
              ${item.price ? amount * item.price : "$0"}
            </h1>
            <Payments />
          </div>
          <h5 style={{ textAlign: "center" }}>OR</h5>
          <button
            onClick={handleAddToBasket}
            id={id}
            style={{
              margin: "auto",
              backgroundColor: "lightpink",
              fontWeight: "bold",
              height: "40px",
              borderRadius: "7%",
              borderStyle: "none",
              cursor: "pointer",
              marginBottom: "30px",
            }}
          >
            Add to basket and pay later
          </button>
        </div>
      </div>
    </>
  );
};

export default ItemPage;
