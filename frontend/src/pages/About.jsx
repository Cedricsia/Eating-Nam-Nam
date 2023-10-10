import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function About() {
  const [ourTeam, setOurTeam] = useState();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/team`)
      .then((res) => {
        setOurTeam(res.data);
      })
      .catch((error) => {
        console.error("Erreur", error);
      });
  }, []);

  return (
    <div className="flex flex-col justify-center items-center min-h-screen max-w-[80%] ml-auto mr-auto">
      <h1 className="flex justify-center text-4xl m-10">À Propos</h1>
      <p>
        Voici notre formidable équipe de gourmands, composée de développeur web
        issue de la Wild Code School. Nous avons eu le privilège de travailler
        tous ensemble sur ce projet particulièrement intéressant. Si vous
        souhaitez en savoir plus sur nous, n'hésitez pas à cliquer sur nos
        profils :
      </p>
      <div className="flex flex-wrap w-[80%] justify-center items-center m-10">
        {ourTeam &&
          ourTeam.map((member) => (
            <Link to={`${member.lien}`}>
              <div
                className="flex flex-col m-10 items-center justify-center"
                key={`${member.id}`}
              >
                <button
                  type="button"
                  className="w-52 h-52 rounded-full border-solid border-secondary border-8 drop-shadow-lg hover:scale-105 duration-700 ease-in-out"
                >
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/profilePicture/${
                      member.image
                    }`}
                    alt={`avatar de ${member.name}`}
                    className="object-contain"
                  />
                </button>
                <p className="text-2xl text-primary m-5">{`${member.name}`}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default About;
