import PropTypes from "prop-types";

function RatingStarShow({ rate }) {
  const stars = [1, 2, 3, 4, 5];

  return (
    <div>
      {stars.map((elem) => (
        <input
          key={elem}
          name={elem}
          className={`mask mask-star-2 bg-primary w-[1rem] lg:w-[1.5rem] ${
            elem <= rate ? "opacity-1" : "opacity-30"
          }`}
        />
      ))}
    </div>
  );
}

RatingStarShow.propTypes = {
  rate: PropTypes.number.isRequired,
};

export default RatingStarShow;
