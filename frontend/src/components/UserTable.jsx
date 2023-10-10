/* eslint-disable */
import React from "react";

function UserTable({ user, setSelectedUser }) {
  const commentCount = user.com.length;
  const badgeCount = user.badge.length;

  return (
    <tr className="md:text-xl">
      <td className="flex flex-col  items-center md:flex md:flex-row md:gap-2">
        <div className="avatar">
          <div className="rounded-full h-16">
            <button
              type="button "
              className="rounded-full h-16"
              onClick={() => setSelectedUser(user)}
            >
              <img
                src={`${import.meta.env.VITE_BACKEND_URL}/profilePicture/${
                  user.image
                }`}
                alt=""
              />
            </button>
          </div>
        </div>
        <p> {user.pseudo}</p>
      </td>
      <td className="text-center">{user.recipes}</td>
      <td className="text-center">{commentCount}</td>
      <td className="text-center">{badgeCount}</td>

      <td className="hidden lg:table-cell  ">
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => setSelectedUser(user)}
        >
          info
        </button>
      </td>
    </tr>
  );
}

export default UserTable;
