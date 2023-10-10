import React, { useState } from "react";
import PropTypes from "prop-types";

function UserBadge({ selectedUser }) {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [num, setNum] = useState(0);
  const handleWatch = (id) => {
    if (num === 0) {
      setNum(id);
    } else {
      setNum(0);
    }
  };

  return (
    <div className="flex flex-col items-center max-w-7xl w-full">
      <div className="md:flex flex-row w-full">
        <h1 className="flex justify-center mx-3 text-center">Succès</h1>
      </div>
      <div className=" mx-3 my-5">
        {selectedUser.badge.length !== 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {selectedUser.badge.map((elem) => (
              <div key={elem.id} className="flex flex-col items-center ">
                <h2 className="text-primary text-center  ">{elem.name}</h2>
                <button type="button" onClick={() => handleWatch(elem.id)}>
                  <img
                    src={`${backendUrl}/${elem.image}`}
                    alt=""
                    className="h-16 md:h-20"
                    title={elem.content}
                  />
                </button>
                {num === elem.id && (
                  <p className="text-center lg:hidden ">{elem.content}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div>
            <p>
              {selectedUser.pseudo} n'a pas de succès déverouillé pour le moment
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
UserBadge.propTypes = {
  selectedUser: PropTypes.shape({
    badge: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
      })
    ).isRequired,
    pseudo: PropTypes.string.isRequired,
  }).isRequired,
};
export default UserBadge;
