import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import expressAPI from "../services/expressAPI";
import UserBannerDesktop from "../components/Banners/UserBannerDesktop";
import UserBannerMobile from "../components/Banners/UserBannerMobile";
import LatestUserTable from "../components/LatestUserTable";
import ModalUpdateUser from "../components/modal/ModalUpdateUser";

import loupe from "../assets/icons/loupe.png";
import ModalDeleteUser from "../components/modal/ModalDeleteUser";

function UsersManagement() {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [value, setValue] = useState("");
  const [userToUpdate, setUserToUpdate] = useState("");
  const [userToDelete, setUserToDelete] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    expressAPI
      .get(`/users/${id}`)
      .then((res) => setUser(res.data))
      .catch((error) => console.error(error));

    expressAPI
      .get("/users-by-recipe")
      .then((res) => setUsers(res.data))
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
            <div className="w-full lg:ml-8">
              <h1 className="font-bold text-center md:text-left md:px-8 text-2xl lg:text-3xl pt-8 md:pt-14">
                Rechercher un utilisateur
              </h1>
              <div className="bg-accent h-10 rounded-3xl flex items-center m-4 md:mx-4 md:my-8 md:w-80 xl:w-[40rem]">
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
                  Derniers utilisateurs créés
                </h1>
                <div className=" mx-4 my-8 md:mr-12 md:ml-8 lg:ml-5 h-full">
                  <table className="table">
                    <thead className="text-lg text-base-content md:text-xl">
                      <tr>
                        <th className="flex justify-start">Utilisateur</th>
                        <th colSpan={2}>
                          Nombre de <br /> recettes créées
                        </th>
                      </tr>
                    </thead>
                    {users &&
                      users
                        .filter((userElem) =>
                          userElem.pseudo
                            .toLocaleLowerCase()
                            .includes(value.toLocaleLowerCase())
                        )
                        .sort((a, b) => b.user_id - a.user_id)
                        .map(
                          (userElem, index) =>
                            index < 10 && (
                              <LatestUserTable
                                key={userElem.user_id}
                                userElem={userElem}
                                users={users}
                                setUsers={setUsers}
                                userToUpdate={userToUpdate}
                                setUserToUpdate={setUserToUpdate}
                                isUpdated={isUpdated}
                                setIsUpdated={setIsUpdated}
                                setUserToDelete={setUserToDelete}
                              />
                            )
                        )}
                  </table>
                </div>
              </div>
            </div>
            <ModalUpdateUser
              userToUpdate={userToUpdate}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
            />

            <ModalDeleteUser
              userToDelete={userToDelete}
              isUpdated={isUpdated}
              setIsUpdated={setIsUpdated}
              users={users}
              setUsers={setUsers}
            />
          </div>
          <ToastContainer theme="colored" />
        </>
      )}
    </div>
  );
}

export default UsersManagement;
