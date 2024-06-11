import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
interface ItemsProps {
  basket: string;
  setBasket: any;
}

const Items: React.FC<ItemsProps> = ({ basket, setBasket }) => {
  const [clothes, setClothes] = useState([
    {
      category: null,
      collection: null,
      img_url: null,
      name: null,
      price: null,
      _id: null,
    },
  ]);
  const [loading, setloading] = useState(true);

  const handleSetCookie = (event: any) => {
    const item_id = event.currentTarget.id;

    if (basket.includes(item_id)) {
      alert("item already in basket. you can set the amount in your basket");
      return;
    }
    setBasket((currentBasket: any) => {
      const newBasket =
        currentBasket.length > 0 ? currentBasket + "," + item_id : item_id;
      Cookies.set("basket", newBasket, { expires: 7 });
      return newBasket;
    });
  };

  useEffect(() => {
    axios
      .get("https://be-e-commerce.onrender.com/clothes")
      .then((response) => {
        setClothes(response.data.clothes);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleCategoryChange(e: any) {
    const category = e.target.value;
    console.log(category);

    setloading(true);
    axios
      .get(`https://be-e-commerce.onrender.com/clothes?category=${category}`)
      .then((response) => {
        setClothes(response.data.clothes);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCollectionChange(e: any) {
    const collection = e.target.value;

    setloading(true);
    axios
      .get(
        `https://be-e-commerce.onrender.com/clothes?collection=${collection}`
      )
      .then((response) => {
        setClothes(response.data.clothes);
        setloading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <h1 id="items-header">
        SALE <br />
        <select
          onChange={handleCollectionChange}
          style={{
            width: "200px",
            height: "30px",
            backgroundColor: "palevioletred",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "large",
            borderRadius: "4%",
          }}
          name=""
          id=""
        >
          <option value="">All Collections</option>

          <option value="spring">Spring</option>
          <option value="winter">Winter</option>
          <option value="formal">Formal</option>
        </select>
        <br />
        <select
          onChange={handleCategoryChange}
          style={{
            width: "200px",
            height: "30px",
            backgroundColor: "palevioletred",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: "large",
            borderRadius: "4%",
          }}
          name=""
          id=""
        >
          <option value="">All Categories</option>
          <option value="shirts">Shirts</option>
          <option value="coats">Coats</option>
          <option value="sweatshirt">Sweatshirts</option>
          <option value="suites">Suits</option>
        </select>
      </h1>

      <div id="itemContainer">
        {loading ? (
          <>
            <h1 style={{ gridArea: "a", textAlign: "center" }}>
              Loading Items
            </h1>
            <div id="loadingLogos">
              <img
                className="loading-images"
                src="https://www.logo.wine/a/logo/Adidas/Adidas-Logo.wine.svg"
                alt=""
              />
              <img
                className="loading-images"
                src="https://www.logo.wine/a/logo/Chanel/Chanel-Logo.wine.svg"
                alt=""
              />
              <img
                className="loading-images"
                src="https://cdn.freebiesupply.com/images/thumbs/1x/calvin-klein-logo.png"
                alt=""
              />
              <img
                className="loading-images"
                src="https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/08/10-Best-Clothing-Logos-and-How-to-Make-Your-Own-image27.png"
                alt=""
              />
              <img
                className="loading-images"
                src="https://cdn.freebiesupply.com/logos/thumbs/2x/express-fashion-stores-logo.png"
                alt=""
              />
            </div>
          </>
        ) : (
          clothes.map((item) => {
            return (
              <div key={item._id} className="item-card">
                <img
                  className="item-image"
                  src={item.img_url ? item.img_url : ""}
                  alt=""
                />
                <h4>{item.name}</h4>
                <p>Price: {item.price}</p>
                <div>
                  <Link
                    to={`/${item._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <button className="productButton">View</button>
                  </Link>
                  {item._id ? (
                    <button
                      id={`${item._id}`}
                      onClick={handleSetCookie}
                      className="addButton"
                    >
                      <span className="plusCart">+</span>
                      <i className="fas fa-shopping-cart"></i>
                    </button>
                  ) : null}
                </div>
              </div>
            );
          })
        )}
      </div>
    </>
  );
};

export default Items;
