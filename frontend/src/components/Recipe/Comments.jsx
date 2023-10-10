import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import CommentCard from "./CommentCard";
import { useCurrentUserContext } from "../../contexts/CurrentUserContext";
import expressAPI from "../../services/expressAPI";

function Comments() {
  const [comments, setComments] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);
  const [userComment, setUserComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [selectedRating, setSelectedRating] = useState(-1);

  const { user } = useCurrentUserContext();
  const { id } = useParams();
  const userId = parseInt(user, 10);
  const recipeId = parseInt(id, 10);

  useEffect(() => {
    expressAPI
      .get(`/comment/${id}/${user}`)
      .then((response) => {
        if (response.status === 200) {
          setUserComment(response.data);
          setNewComment(response.data.content);
          setSelectedRating(response.data.rate - 1);
        }
      })
      .catch((err) => console.error(err));

    expressAPI
      .get(`/comment-rate/${id}`)
      .then((response) => {
        setComments(response.data);
        setIsLoading(false);
      })
      .catch((err) => console.error(err));
  }, [isUpdated]);

  const handleClick = (index) => {
    setSelectedRating(index);
  };

  const handleMouseOver = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseOut = () => {
    setHoveredIndex(-1);
  };

  function handleNewComment(e) {
    setNewComment(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const rate = selectedRating + 1;

    const data = {
      recipeId: parseInt(id, 10),
      userId: user,
      newComment,
      rate,
    };

    if (newComment.length > 0 && selectedRating >= 0) {
      if (userComment) {
        expressAPI.put("/comments", data).then(() => {
          toast.success("Votre commentaire a bien été mis à jour", {
            autoClose: 3000,
            pauseOnFocusLoss: false,
          });
          setIsUpdated(!isUpdated);
        });
      }

      if (!userComment) {
        expressAPI.post("/comments", data).then(() => {
          toast.success("Votre commentaire a bien été créé", {
            autoClose: 3000,
            pauseOnFocusLoss: false,
          });
          setIsUpdated(!isUpdated);
        });
      }
    } else {
      toast.error(
        "Sélectionner la note à attribuer à la recette et renseigner le champ commentaires",
        {
          autoClose: 3000,
          pauseOnFocusLoss: false,
        }
      );
    }
  }

  function handleDelete(e) {
    e.preventDefault();

    expressAPI
      .delete(`/comments/${recipeId}/${userId}`)
      .then(() => {
        toast.success("Votre commentaire a bien été supprimé");
        setUserComment(false);
        setNewComment("");
        setIsUpdated(!isUpdated);
        setHoveredIndex(-1);
        setSelectedRating(-1);
      })
      .catch(() => toast.error("Votre commentaire n'a pas pu être supprimé"));
  }

  return (
    <div>
      {isLoading ? (
        <h1>Chargement en cours</h1>
      ) : (
        <div>
          <div>
            <h2 className="mt-4 my-2 py-3">
              Commentaires <span className="text-lg">({comments.length})</span>
            </h2>
            {user ? (
              <div className="mb-8">
                {userComment ? (
                  <h3 className="font-heading text-xl font-bold mb-1">
                    Votre commentaire
                  </h3>
                ) : (
                  <h3 className="font-heading text-xl font-bold mb-1">
                    Donnez votre avis
                  </h3>
                )}
                <div className="mb-3">
                  <div>
                    {Array.from({ length: 5 }, (_, index) => (
                      <input
                        key={index}
                        name="rating-2"
                        className={`mask mask-star-2 bg-primary ${
                          (hoveredIndex >= 0 && index <= hoveredIndex) ||
                          (selectedRating >= 0 && index <= selectedRating)
                            ? "opacity-100"
                            : "opacity-30"
                        } mr-1 w-[1rem] lg:w-[1.5rem] cursor-pointer`}
                        type="button"
                        onClick={() => handleClick(index)}
                        onMouseOut={handleMouseOut}
                        onFocus={handleMouseOut}
                        onMouseOver={() => handleMouseOver(index)}
                        onBlur={() => handleMouseOver(index)}
                      />
                    ))}
                  </div>
                </div>
                <form>
                  <input
                    id="content"
                    name="content"
                    type="text"
                    placeholder="Tapez votre commentaire"
                    className="bg-accent rounded-md p-2 w-full pb-8"
                    value={newComment}
                    onChange={handleNewComment}
                  />
                  <div className="flex justify-end mt-2">
                    <button
                      type="submit"
                      className="mx-1 bg-secondary p-2 rounded-md text-neutral"
                      onClick={handleSubmit}
                    >
                      {userComment ? "MODIFIER" : "AJOUTER"}
                    </button>
                    {userComment && (
                      <button
                        type="button"
                        className="mx-1 bg-primary p-2 rounded-md text-neutral"
                        onClick={handleDelete}
                      >
                        SUPPRIMER
                      </button>
                    )}
                  </div>
                  <ToastContainer theme="colored" />
                </form>
              </div>
            ) : (
              <h3 className="font-heading text-xl font-bold mb-1">
                Connectez-vous pour pouvoir donner votre avis sur la recette
              </h3>
            )}
            <div className="mt-8 md:flex md:justify-around md:flex-wrap">
              {comments.map((item) => (
                <div className="w-80">
                  <CommentCard
                    key={item.content}
                    user={item.pseudo}
                    img={item.image}
                    note={item.rate}
                    comment={item.content}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
