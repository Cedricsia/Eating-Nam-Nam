import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CommentCard from "./Recipe/CommentCard";

function UserComment({ user }) {
  const { image, pseudo } = user;

  return (
    <div className="flex flex-col items-center max-w-7xl w-full ">
      <div className="md:flex flex-row w-full">
        <h1 className="flex justify-center mx-3 text-center">Commentaires</h1>
      </div>
      <div className=" mx-3 ">
        {user.com.length !== 0 ? (
          <div className="grid  md:grid-cols-2 lg:grid-cols-3 gap-4">
            {user &&
              user.com.map((elem) => (
                <div className="my-5">
                  <p className="text-lg md:text-xl  my-2 font-bold text-primary hover:text-secondary">
                    <Link to={`/recipes/${elem.recipe_id}`}>{elem.name}</Link>
                  </p>
                  <CommentCard
                    key={elem.content}
                    user={pseudo}
                    img={image}
                    note={elem.rate}
                    comment={elem.content}
                  />
                </div>
              ))}
          </div>
        ) : (
          <div>
            <p>{pseudo} n'a pas encore posté de commentaire</p>
          </div>
        )}
      </div>
    </div>
  );
}
UserComment.propTypes = {
  user: PropTypes.shape({
    image: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    com: PropTypes.arrayOf(
      PropTypes.shape({
        recipe_id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        rate: PropTypes.number.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
  }).isRequired,
};

export default UserComment;
