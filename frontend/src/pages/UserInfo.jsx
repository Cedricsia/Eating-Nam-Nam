import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import expressAPI from "../services/expressAPI";
import UserBannerDesktop from "../components/Banners/UserBannerDesktop";
import UserBannerMobile from "../components/Banners/UserBannerMobile";
import CurrentInfo from "../components/UserInfo/CurrentInfo";
import UpdateInfo from "../components/UserInfo/UpdateInfo";
import UpdatePassword from "../components/UserInfo/UpdatePassword";

function UserInfo() {
  const [user, setUser] = useState(null);
  const [isBeingModified, setIsBeingModified] = useState(false);
  const [passwordIsBeingModified, setPasswordIsBeingModified] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    expressAPI.get(`/users/${id}`).then((res) => {
      setUser(res.data);
    });
  }, [isUpdated]);

  return (
    <main className="bg-neutral">
      {user && (
        <>
          <UserBannerMobile user={user} />
          <div className="bg-neutral md:flex">
            <UserBannerDesktop user={user} />
            <div className="w-full">
              <div className="w-full">
                {isBeingModified ? (
                  <UpdateInfo
                    user={user}
                    isBeingModified={isBeingModified}
                    setIsBeingModified={setIsBeingModified}
                    isUpdated={isUpdated}
                    setIsUpdated={setIsUpdated}
                  />
                ) : (
                  <CurrentInfo user={user} />
                )}
              </div>
              {passwordIsBeingModified && (
                <UpdatePassword
                  user={user}
                  passwordIsBeingModified={passwordIsBeingModified}
                  setPasswordIsBeingModified={setPasswordIsBeingModified}
                  isUpdated={isUpdated}
                  setIsUpdated={setIsUpdated}
                />
              )}
              {!isBeingModified && !passwordIsBeingModified && (
                <div className=" bg-neutral flex flex-col pb-12 px-10 md:justify-around lg:flex-row">
                  <button
                    type="button"
                    onClick={() => setIsBeingModified(!isBeingModified)}
                    className="text-neutral bg-secondary text-xl md:text-xl h-12 md:h-14 px-8 py-1 rounded-md mt-8 lg:mt-14 --transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                  >
                    Modifier les informations
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setPasswordIsBeingModified(!passwordIsBeingModified)
                    }
                    className="text-neutral bg-secondary text-xl md:text-xl h-12 md:h-14 px-8 py-1 rounded-md mt-8 lg:mt-14 --transition ease-in-out hover:-translate-y-1 hover:scale-110 duration-300"
                  >
                    Modifier le mot de passe
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </main>
  );
}

export default UserInfo;
