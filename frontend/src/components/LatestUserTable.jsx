import PropTypes from "prop-types";

import trash from "../assets/icons/trash.png";
import modify from "../assets/icons/modify.png";

function LatestUserTable({ userElem, setUserToUpdate, setUserToDelete }) {
  const handleDelete = () => {
    setUserToDelete(userElem);
    document.getElementById("deleteUser").showModal();
  };

  const handleUpdate = () => {
    setUserToUpdate(userElem);
    document.getElementById("updateUser").showModal();
  };

  return (
    <tbody>
      <tr
        key={userElem.user_id}
        className="hover:text-primary hover:font-bold text-lg"
      >
        <td>{userElem.pseudo}</td>
        <td className="text-center w-44">{userElem.nb_recipe}</td>
        <td>
          <div className="avatar flex justify-center">
            <button
              type="button"
              onClick={handleUpdate}
              className="rounded-full w-8 md:w-12"
            >
              <img src={modify} alt="Modifier" />
            </button>

            <button
              type="button"
              onClick={handleDelete}
              className="rounded-full w-8 md:w-12"
            >
              <img src={trash} alt="Supprimer" />
            </button>
          </div>
        </td>
      </tr>
    </tbody>
  );
}

LatestUserTable.propTypes = {
  userElem: PropTypes.shape({
    user_id: PropTypes.number.isRequired,
    pseudo: PropTypes.string.isRequired,
    nb_recipe: PropTypes.number.isRequired,
  }).isRequired,
  setUserToUpdate: PropTypes.func.isRequired,
  setUserToDelete: PropTypes.func.isRequired,
};

export default LatestUserTable;
