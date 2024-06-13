import { useEffect, useState } from "react";

export default function Home() {
  const homeImages = [
    "https://images.pexels.com/photos/7026411/pexels-photo-7026411.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3775120/pexels-photo-3775120.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/6050412/pexels-photo-6050412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % homeImages.length);
    }, 1200);

    return () => clearInterval(interval);
  }, [homeImages.length]);

  return (
    <div id="imageSlider" style={{ marginTop: "130px" }}>
      <h1 className="slogan">Shop Safe</h1>
      <h1 id="overImg"></h1>
      <img id="imageChange" src={homeImages[index]} alt="Image" />
      <button id="nextImg" disabled>
        Next
      </button>
      <h1 className="slogan">Stay in Style</h1>
    </div>
  );
}
