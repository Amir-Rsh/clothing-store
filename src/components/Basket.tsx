import axios from "axios";
import { useEffect, useState } from "react";
import Payments from "./Payments";

interface BasketProps {
  basket: any;
  setBasket: any;
}

const Basket: React.FC<BasketProps> = ({ basket }) => {
  const [items, setItems] = useState<any>([]);
  const [itemAmounts, setItemAmounts] = useState<any>({});
  const [total, setTotal] = useState(0);

  const handleAdd = (event: any) => {
    const id = event.currentTarget.id;
    const price = event.currentTarget.value;

    setItemAmounts((currentItemAmounts: any) => {
      const newAmounts = { ...currentItemAmounts };
      newAmounts[id]++;
      return newAmounts;
    });

    setTotal((currentTotal: number) => {
      return currentTotal + parseFloat(price);
    });
  };

  const handleReduce = (event: any) => {
    const id = event.currentTarget.id.trim();
    const price = event.currentTarget.value;

    if (itemAmounts[id] < 2) {
      return;
    }
    setItemAmounts((currentItemAmounts: any) => {
      const newAmounts = { ...currentItemAmounts };
      newAmounts[id]--;
      return newAmounts;
    });
    setTotal((currentTotal: number) => {
      return currentTotal - parseFloat(price);
    });
  };

  useEffect(() => {
    if (basket.length > 0) {
      basket.split(",").map((id: any) => {
        if (!itemAmounts[id]) {
          setItemAmounts((currentItemAmounts: any) => {
            currentItemAmounts[id] = 1;
            return currentItemAmounts;
          });
        }

        axios
          .get(`https://be-e-commerce.onrender.com/clothes/${id}`)
          .then(({ data: { clothing } }) => {
            setTotal((currentTotal: number) => {
              return currentTotal + clothing.price;
            });
            setItems((currentItems: any) => {
              return [...currentItems, clothing];
            });
          });
      });
    } else setItems([]);
  }, [basket]);

  return items.length < 1 ? (
    <>
      {" "}
      <h1 style={{ textAlign: "center", marginTop: "130px" }}>Your Basket</h1>
      <div
        style={{
          width: "100%",
          backgroundColor: "darkgray",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "400px",
        }}
      >
        <h1 style={{}}>your basket is Empty</h1>
      </div>
    </>
  ) : (
    <>
      <h1 style={{ textAlign: "center", marginTop: "130px" }}>Your Basket</h1>
      <div
        id="item-payment"
        style={{
          flexDirection: "column",
          height: "fit-content",
        }}
      >
        {items.map((item: any) => {
          return (
            <div key={item._id} id="item-container">
              <img
                id="item-img"
                src={item.img_url ? item.img_url : ""}
                alt=""
              />
              <div id="color-amount">
                <h3>Please choose the color</h3>
                <ul>
                  <li>
                    <input
                      className="colorInput"
                      required
                      type="radio"
                      name="color"
                      id=""
                    />
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
                    <input
                      className="colorInput"
                      required
                      type="radio"
                      name="color"
                      id=""
                    />
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
                    <input
                      className="colorInput"
                      required
                      type="radio"
                      name="color"
                      id=""
                    />
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
                    <input
                      className="colorInput"
                      required
                      type="radio"
                      name="color"
                      id=""
                    />
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
                    <input
                      className="colorInput"
                      required
                      type="radio"
                      name="color"
                      id=""
                    />
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
                    <input
                      className="colorInput"
                      required
                      type="radio"
                      name="color"
                      id=""
                    />
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
                    <input
                      className="colorInput"
                      required
                      type="radio"
                      name="color"
                      id=""
                    />
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
                  <button
                    id={item._id + " "}
                    onClick={handleReduce}
                    className="adders"
                    value={item.price}
                  >
                    -
                  </button>
                  {itemAmounts[item._id]}
                  <button
                    id={item._id}
                    onClick={handleAdd}
                    value={item.price}
                    className="adders"
                  >
                    +
                  </button>
                </h3>
                <h3 style={{ textAlign: "center" }}>
                  Price: {(item.price * itemAmounts[item._id]).toFixed(2)}
                </h3>
              </div>
            </div>
          );
        })}
        <div
          style={{
            marginRight: "40px",
            marginTop: "30px",
            backgroundColor: "lightpink",
            width: "400px",
            padding: "30px",
            borderRadius: "5%",
            marginBottom: "40px",
          }}
        >
          <h1
            style={{
              backgroundColor: "gray",
              width: "100%",
              textAlign: "center",
              borderRadius: "3%",
              padding: "5px",
            }}
          >
            ${total.toFixed(2)}
          </h1>
          <Payments />
        </div>
      </div>
    </>
  );
};

export default Basket;
