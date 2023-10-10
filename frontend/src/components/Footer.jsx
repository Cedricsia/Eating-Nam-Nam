import { Link } from "react-router-dom";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-primary text-neutral p-4 h-26 flex justify-between items-center font-bold">
      <div>
        <Link to="/about" onClick={scrollToTop}>
          <p className="mb-4">À propos</p>
        </Link>
        <Link to="/general-conditions" onClick={scrollToTop}>
          <p>Conditions Générales</p>
        </Link>
      </div>
      <p>© 2023</p>
    </div>
  );
}

export default Footer;
