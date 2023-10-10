import PropTypes from "prop-types";

import expressAPI from "../services/expressAPI";
import trash from "../assets/icons/trash.png";

function LatestCommentTable({ comment, setComments, comments, setIsUpdated }) {
  const handleDelete = () => {
    expressAPI
      .delete(`admin/comment/${comment.id}`)
      .then((res) => {
        if (res.status === 204) {
          setComments(comments.filter((element) => element.id !== comment.id));
          setIsUpdated(true);
        }
      })
      .catch((error) => console.error(error));
  };

  return (
    <tr key={comment.id} className="hover:text-primary hover:font-bold text-lg">
      <td>{comment.user_pseudo}</td>
      <td>
        <p className="font-bold mb-2 ">{comment.recipe_name} :</p>{" "}
        {comment.content}
      </td>
      <td>
        <button
          type="button"
          onClick={handleDelete}
          className="rounded-full w-8 md:w-12"
        >
          <img src={trash} alt="Supprimer" />
        </button>
      </td>
    </tr>
  );
}

LatestCommentTable.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    user_pseudo: PropTypes.string.isRequired,
    recipe_name: PropTypes.string.isRequired,
  }).isRequired,
  comments: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.object),
    PropTypes.instanceOf(Array),
  ]).isRequired,
  setComments: PropTypes.func.isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};

export default LatestCommentTable;
