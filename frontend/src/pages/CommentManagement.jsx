import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";

import expressAPI from "../services/expressAPI";
import UserBannerDesktop from "../components/Banners/UserBannerDesktop";
import UserBannerMobile from "../components/Banners/UserBannerMobile";
import LatestCommentTable from "../components/LatestCommentTable";

import loupe from "../assets/icons/loupe.png";

function CommentsManagement() {
  const [comments, setComments] = useState([]);
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    expressAPI
      .get(`/admin/comments`)
      .then((res) => setComments(res.data))
      .catch((error) => console.error(error));

    expressAPI
      .get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((error) => console.error(error));

    if (isUpdated) {
      toast.success("Les modifications ont bien été prises en compte", {
        autoClose: 3000,
        pauseOnFocusLoss: false,
      });
    }
    setIsUpdated(false);
  }, [isUpdated]);

  const handleValue = (event) => {
    setValue(event.target.value);
  };

  return (
    <div className="bg-neutral">
      {user && (
        <>
          <UserBannerMobile user={user} />
          <div className="md:flex">
            <UserBannerDesktop user={user} />
            <div className="w-full lg:pl-8">
              <h1 className="font-bold text-center md:text-left md:px-8 text-2xl lg:text-3xl pt-8 md:pt-14">
                Rechercher par utilisateur
              </h1>
              <div className="bg-accent h-10 rounded-3xl flex items-center m-4 md:mx-8 md:my-8 md:w-80 xl:w-[40rem]">
                <input
                  type="text"
                  value={value}
                  onChange={handleValue}
                  className="bg-accent ml-5 mb-1 w-full h-8 focus:outline-none focus:ring-0"
                />
                <div type="button" className="mx-3 rounded-full">
                  <img
                    src={loupe}
                    alt="Logo loupe"
                    className="w-8 text-center"
                  />
                </div>
              </div>
              <div>
                <h1 className="font-bold text-center md:text-left md:px-8 text-xl lg:text-2xl pt-8 md:pt-14">
                  Derniers commentaires créés
                </h1>
                <div className=" px-4 py-8 md:pr-12 md:pl-8 lg:pl-5 h-full">
                  <table className="table ">
                    <thead className="text-lg text-base-content lg:text-xl">
                      <tr>
                        <th>Utilisateur</th>
                        <th colSpan={2}>Commentaires</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comments &&
                        comments
                          .filter((userelem) =>
                            userelem.user_pseudo
                              .toLocaleLowerCase()
                              .includes(value.toLocaleLowerCase())
                          )
                          .sort((a, b) => b.id - a.id)
                          .map((comment, index) =>
                            index < 10 ? (
                              <LatestCommentTable
                                key={comment.id}
                                comments={comments}
                                setComments={setComments}
                                comment={comment}
                                setIsUpdated={setIsUpdated}
                              />
                            ) : null
                          )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer theme="colored" />
        </>
      )}
    </div>
  );
}

export default CommentsManagement;
