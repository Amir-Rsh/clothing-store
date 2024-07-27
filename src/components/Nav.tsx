import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/Screenshot-from-2024-04-26-16-32-53.png";

interface NavProps {
  basket: any;
  setBasket: any;
}

const Nav: React.FC<NavProps> = ({ basket, setBasket }) => {
  const navigate = useNavigate();

  const handleDeleteCookie = () => {
    Cookies.remove("basket");
    setBasket("");
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scrollToItems = () => {
    const itemsElement = document.getElementById("items-header");
    if (itemsElement) {
      itemsElement.scrollIntoView({ behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => {
        const saleElement = document.getElementById("items-header");
        if (saleElement) saleElement.scrollIntoView({ behavior: "smooth" });
      }, 0);
    }
  };
  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <nav>
      <div id="navigation">
        <Link
          onClick={scrollToTop}
          style={{ textDecoration: "none", color: "black" }}
          to="/"
        >
          <h2 className="navButton">Home</h2>
        </Link>

        <h2 onClick={scrollToItems} className="navButton">
          Sale
        </h2>
        <h2 onClick={scrollToBottom} className="navButton">
          Contact
        </h2>
      </div>
      <img id="name" src={logoImage} alt="" />
      <div id="navigation2">
        <div>
          <h3
            id="navBasketDiv"
            style={{
              position: "absolute",
              textAlign: "center",
              backgroundColor: "lightcoral",
              fontWeight: "bold",
              borderRadius: "40%",
              width: "20px",
              opacity: "80%",
              transform: "translateX(3px) translateY(-19px)",
            }}
          >
            {basket.length > 0 ? basket.split(",").length : 0}
          </h3>
          <h2>
            <Link
              onClick={scrollToTop}
              to={"/basket"}
              style={{ color: "black" }}
            >
              <i id="basketIcon" className="fas fa-shopping-basket"></i>
            </Link>
          </h2>
        </div>
        <button
          id="emptyBasket"
          style={{
            margin: "10px",
            borderStyle: "none",
            fontWeight: "bold",
            borderRadius: "10%",
          }}
          onClick={handleDeleteCookie}
        >
          Empty Basket
        </button>
      </div>
    </nav>
  );
};

export default Nav;
