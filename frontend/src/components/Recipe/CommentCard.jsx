import PropTypes from "prop-types";

import RatingStarShow from "../RatingStarShow";

function CommentCard({ user, img, note, comment }) {
  return (
    <div className="">
      <div className="flex">
        <div className="avatar">
          <div className="rounded-full h-12 ml-2">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/profilePicture/${img}`}
              alt="Avatar"
              className=""
            />
          </div>
        </div>
        <div className="ml-2">
          <div className="font-bold text-lg -mt-1">{user}</div>
          <RatingStarShow rate={note} />
        </div>
      </div>
      <div className="ml-2 mb-5 mt-2">{comment}</div>
    </div>
  );
}

export default CommentCard;

CommentCard.propTypes = {
  user: PropTypes.string.isRequired,
  img: PropTypes.string,
  note: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
};

CommentCard.defaultProps = {
  img: null,
};
