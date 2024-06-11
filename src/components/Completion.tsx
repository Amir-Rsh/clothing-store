import { useNavigate } from "react-router-dom";

export default function Completion() {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate("/");
  }, 4000);
  return (
    <h1 style={{ marginTop: "130px", textAlign: "center" }}>
      Thank you for your purchase. redirecting you to home page...
    </h1>
  );
}
