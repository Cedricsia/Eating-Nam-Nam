import PropTypes from "prop-types";

function CurrentInfo({ user }) {
  return (
    <div className="flex flex-col bg-neutral">
      <div className="font-bold w-full">
        <h1 className="text-center md:text-left md:pl-8 text-2xl md:text-3xl pt-8 md:pt-8">
          Mes informations
        </h1>
        <form className="text-xl md:text-2xl grid grid-cols-[100px_200px] md:grid-cols-[150px_250px] lg:grid-cols-[180px_350px] xl:grid-cols-[120px_300px_130px_300px] lg:gap-x-6 items-center justify-center gap-y-6 md:gap-y-14 lg:gap-y-10 xl:gap-y-14 my-8 md:my-14 md:mx-10 ">
          <label htmlFor="lastname">Nom :</label>
          <input
            value={user.lastname}
            readOnly
            type="text"
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
          />
          <label htmlFor="firstname">Prénom :</label>
          <input
            type="text"
            value={user.firstname}
            readOnly
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
          />
          <label htmlFor="username">Pseudo :</label>
          <input
            type="text"
            value={user.pseudo}
            readOnly
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
          />
          <label htmlFor="age">Age :</label>
          <input
            type="number"
            value={user.age}
            readOnly
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
          />
          <label htmlFor="email">Email :</label>
          <input
            type="email"
            value={user.mail}
            readOnly
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
          />
          <label htmlFor="gender">Genre :</label>
          <input
            type="text"
            value={user.gender}
            readOnly
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
          />
          <label htmlFor="socio" className="whitespace-nowrap">
            Catégorie <br />
            socio pro. :
          </label>{" "}
          <input
            type="text"
            value={user.socio}
            readOnly
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
          />
          <label htmlFor="password" className="md:mr-4 lg:mr-0">
            Mot de passe :
          </label>
          <input
            type="password"
            value={user.password}
            readOnly
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
          />
          <label htmlFor="gender">Genre :</label>
          <input
            type="text"
            value={user.gender}
            readOnly
            className="bg-accent rounded-md h-10 py-2 px-2 lg:px-4 font-normal text-xl"
          />
        </form>
      </div>
    </div>
  );
}

CurrentInfo.propTypes = {
  user: PropTypes.shape({
    lastname: PropTypes.string.isRequired,
    firstname: PropTypes.string.isRequired,
    pseudo: PropTypes.string.isRequired,
    age: PropTypes.number,
    mail: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    socio: PropTypes.string,
    gender: PropTypes.string,
    image: PropTypes.string,
  }).isRequired,
};

export default CurrentInfo;
