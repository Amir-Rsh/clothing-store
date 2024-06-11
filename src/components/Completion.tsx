import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

interface CompletionProps {
  setBasket: any;
}

const Completion: React.FC<CompletionProps> = ({ setBasket }) => {
  const navigate = useNavigate();
  useEffect(() => {
    Cookies.remove("basket");

    setBasket("");
  }, []);

  setTimeout(() => {
    navigate("/");
  }, 4000);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "400px",
        backgroundColor: "darkgray",
      }}
    >
      <h1 style={{ marginTop: "130px", textAlign: "center" }}>
        Thank you for your purchase. redirecting you to home page...
      </h1>
    </div>
  );
};

export default Completion;
