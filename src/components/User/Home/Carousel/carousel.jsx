import { useEffect, useState } from "react";
import "./carousel.css";
import "../../Header/header.css";
import img1 from "../../../../assets/tongquan.jpg";
import img2 from "../../../../assets/Copy-of-Deluxe-Twins.jpg";
import img3 from "../../../../assets/Copy-of-Le317Bistro-07.202010091-HDR-1.jpg";

export default function Carousel() {
  const slides = [img1, img2, img3];  // ❤️ SỬA TẠI ĐÂY

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="carousel-container">
      <div
        className="carousel-track"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((img, i) => (
          <div className="carousel-slide" key={i}>
            <img src={img} alt={`Slide ${i}`} />
          </div>
        ))}
      </div>

      <div className="carousel-dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>
    </div>
  );
}
