import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

import RatingStar from "./RatingStar";
import { useCurrentUserContext } from "../contexts/CurrentUserContext";

function RecipeCards({ id, img, title, time, userImg }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [hoveredCard, setHoveredCard] = useState(null);
  const { user } = useCurrentUserContext();
  const navigate = useNavigate();

  function handleClick() {
    if (user) {
      navigate(`/recipes/${id}`);
    } else {
      document.getElementById("connectionModal").showModal();
    }
  }

  return (
    <div className=" relative flex flex-col justify-start items-center  bg-secondary bg-opacity-[75%] rounded-2xl  lg:overflow-visible">
      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={() => setHoveredCard(id)}
        onMouseLeave={() => setHoveredCard(null)}
        className="h-72 "
        title={title}
      >
        <div key={id} className=" w-44 md:w-48 h-full  ">
          <div className=" h-1/2 flex  justify-center  m-3 z-10">
            <img
              src={`${backendUrl}/uploads/recipes/${img}`}
              alt="Recipe"
              className=" bg-accent w-full h-full object-cover rounded-2xl "
            />

            <img
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/profilePicture/${userImg}`}
              alt="Avatar"
              className="absolute z-20 bottom-[102px] h-16 w-16 border-4 border-secondary border-solid flex justify-end bg-accent rounded-full drop-shadow-md object-cover"
            />
          </div>
          <div className="w-full  flex flex-col  justify-between pl-3 pr-2  items-center">
            <p
              className={` mt-5  font-bold w-[10em] truncate overflow-hidden ${
                hoveredCard === id && " "
              } `}
            >
              {title}
            </p>
            <div>
              <p className="">⌛{time} min</p>
            </div>
            <div className={`m-1  ${hoveredCard === id ? "mb-0.2" : ""} `}>
              <RatingStar id={id} />
            </div>
          </div>
        </div>
      </button>
    </div>
  );
}

RecipeCards.propTypes = {
  id: PropTypes.number.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  time: PropTypes.number.isRequired,
  userImg: PropTypes.string.isRequired,
};

export default RecipeCards;
