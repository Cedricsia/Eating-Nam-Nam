import React, { useEffect, useState } from "react";
import UserBannerDesktop from "../components/Banners/UserBannerDesktop";
import UserBannerMobile from "../components/Banners/UserBannerMobile";
import expressAPI from "../services/expressAPI";
import loupe from "../assets/icons/loupe.png";
import UserTable from "../components/UserTable";
import UserRecipeInfo from "../components/UserRecipeInfo";

function SearchUser() {
  const [user, setUser] = useState(null);
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  useEffect(() => {
    const id = JSON.parse(localStorage.getItem("user"));
    expressAPI.get(`/users/${id}`).then((res) => {
      setUser(res.data);
    });
  }, []);
  const handleName = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    expressAPI.get(`/users/search`).then((res) => {
      setResult(res.data);
    });
  }, []);

  return (
    <div>
      {user && (
        <div>
          <UserBannerMobile user={user} />
          <div className="md:flex">
            <UserBannerDesktop user={user} />
            <div className="w-full flex-col  flex bg-neutral  ">
              {selectedUser !== null ? (
                <UserRecipeInfo
                  selectedUser={selectedUser}
                  setSelectedUser={setSelectedUser}
                />
              ) : (
                <div className="flex flex-col mt-10 mb-5 ">
                  <h1 className="text-2xl text-center m-2 font-bold">
                    Rechercher un utilisateur :
                  </h1>
                  <div className="flex flex-col items-center">
                    <div className="bg-accent  h-10 rounded-3xl flex items-center   m-4 md:mx-4 md:my-8 md:w-80">
                      <input
                        onChange={handleName}
                        type="text"
                        className="bg-accent ml-5 mb-1 w-full h-8 focus:outline-none focus:ring-0"
                      />
                      <img
                        src={loupe}
                        alt="Logo loupe"
                        className=" h-8 text-center"
                      />
                    </div>
                  </div>

                  <div className="">
                    <table className=" table max-w-7xl mx-auto  ">
                      <tr className="border-b-2 border-black">
                        <th className="text-center">Nom</th>
                        <th className="text-center">Recettes </th>
                        <th className="text-center">Avis</th>
                        <th className="text-center">Badge</th>
                      </tr>
                      <tbody>
                        {result &&
                          result
                            .filter((elem) =>
                              elem.pseudo
                                .toLowerCase()
                                .includes(search.toLocaleLowerCase())
                            )
                            .map((elem) => (
                              <UserTable
                                key={elem.id}
                                user={elem}
                                setSelectedUser={setSelectedUser}
                              />
                            ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchUser;
