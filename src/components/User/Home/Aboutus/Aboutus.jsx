import "./Aboutus.css";
import "../../Header/header.css";
import img1 from "../../../../assets/LE-GRENIER_13490-1.jpg";

export default function AboutUs() {
  return (
    <div className="aboutus-section">
      <div className="aboutus-content">
        <h2>
          ABOUT US <span></span>
        </h2>
        <p>
          The passage experienced a surge in popularity during the 1960s when Letraset used it on their dry-transfer sheets, and again during the 90s as desktop publishers bundled the text with their software. Today it's seen all around the web; on templates, websites, and stock designs. Use our generator to get your own, or read on for the authoritative history of lorem ipsum.
        </p>
        <button className="read-more-btn">Read More</button>
      </div>

      <div className="aboutus-image">
       <img src={img1} alt="About Us" />
      </div>
    </div>
  );
}
