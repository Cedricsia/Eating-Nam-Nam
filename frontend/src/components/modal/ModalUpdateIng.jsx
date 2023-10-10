/* eslint-disable react/jsx-props-no-spreading */

import PropTypes from "prop-types";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import expressAPI from "../../services/expressAPI";

function ModalUpdateIng({ ingredientToUpdate, setIsUpdated }) {
  const [newValues, setNewValues] = useState(ingredientToUpdate);

  const handleNewValues = (e, key) => {
    setNewValues({ ...newValues, [key]: e.target.value });
  };

  const closeModal = () => {
    document.getElementById("updateIng").close();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    expressAPI.put(`/ingredient/${ingredientToUpdate.id}`, data).then((res) => {
      if (res.status === 204) {
        document.getElementById("updateIng").close();
        setIsUpdated(true);
      } else {
        toast.error("Un problème inattendu est survenu", {
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
      }
    });
  };

  return (
    <dialog id="updateIng" className="bg-transparent drop-shadow-lg modal">
      <form
        onSubmit={handleSubmit(onSubmit)}
        method="dialog"
        className="modal-box shadow-none bg-neutral text-base-content md:w-[56rem]"
      >
        <h1 className="text-center">Modifier l'ingrédient</h1>
        <div className="mt-8">
          <div className="flex flex-col gap-2">
            <label className="font-bold my-2">
              Nom:
              <input
                type="text"
                defaultValue={ingredientToUpdate.name}
                onChange={(e) => handleNewValues(e, "name")}
                className="bg-accent ml-6 pl-3 py-2 font-normal rounded-xl"
                {...register("name", { required: true })}
                aria-invalid={errors.name ? "true" : "false"}
              />
              {errors.name && (
                <span className="text-red-600">Ce champ est requis.</span>
              )}
            </label>
            <label className="font-bold my-2">
              Protéines:
              <input
                type="number"
                step="0.01"
                defaultValue={ingredientToUpdate.proteins}
                onChange={(e) => handleNewValues(e, "proteins")}
                maxLength={4}
                min={0}
                {...register("proteins", {
                  required: true,
                  valueAsNumber: true,
                  minLength: 0,
                })}
                className="bg-accent ml-6 mr-2 pl-3 py-2 rounded-xl w-20 font-normal "
              />
              g/100g
            </label>
            {errors.proteins && (
              <span className="text-red-600">Ce champ est requis.</span>
            )}
            <label className="font-bold my-2">
              Lipides:
              <input
                type="number"
                step="0.01"
                defaultValue={ingredientToUpdate.fat}
                onChange={(e) => handleNewValues(e, "fat")}
                maxLength={4}
                min={0}
                {...register("fat", {
                  required: true,
                  minLength: 0,
                  valueAsNumber: true,
                })}
                className="bg-accent ml-6 mr-2 pl-3 py-2 rounded-xl w-20 font-normal "
              />
              g/100g
            </label>
            {errors.fat && (
              <span className="text-red-600">Ce champ est requis.</span>
            )}
            <label className="font-bold my-2">
              Glucides:
              <input
                type="number"
                step="0.01"
                defaultValue={ingredientToUpdate.sugar}
                onChange={(e) => handleNewValues(e, "sugar")}
                maxLength={4}
                min={0}
                {...register("sugar", {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                })}
                className="bg-accent ml-6 mr-2 pl-3 py-2 rounded-xl w-20 font-normal "
              />
              g/100g
            </label>
            {errors.sugar && (
              <span className="text-red-600">Ce champ est requis.</span>
            )}
            <label className="font-bold my-2">
              Fibres:
              <input
                type="number"
                step="0.01"
                defaultValue={ingredientToUpdate.fiber}
                onChange={(e) => handleNewValues(e, "fiber")}
                maxLength={4}
                min={0}
                {...register("fiber", {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                })}
                className="bg-accent ml-6 mr-2 pl-3 py-2 rounded-xl w-20 font-normal "
              />
              g/100g
            </label>
            {errors.fiber && (
              <span className="text-red-600">Ce champ est requis.</span>
            )}
            <label className="font-bold my-2">
              Energies:
              <input
                type="number"
                step="0.01"
                defaultValue={ingredientToUpdate.energy}
                onChange={(e) => handleNewValues(e, "energy")}
                maxLength={4}
                min={0}
                {...register("energy", {
                  required: true,
                  valueAsNumber: true,
                  min: 0,
                })}
                className="bg-accent ml-6 mr-2 pl-3 py-2 rounded-xl w-20 font-normal "
              />
              kcal/100g
            </label>
            {errors.energy && (
              <span className="text-red-600">Ce champ est requis.</span>
            )}
            <label className="font-bold my-2">
              Unité
              <select
                defaultValue={ingredientToUpdate.unit}
                onChange={(e) => handleNewValues(e, "unit")}
                {...register("unit", { required: true })}
                aria-invalid={errors.unite ? "true" : "false"}
                className="bg-accent ml-6 mr-2 pl-3 py-3 rounded-xl font-normal w-36"
              >
                <option value="">Selectionner</option>
                <option value="g">g</option>
                <option value="cL">cL</option>
              </select>
              {errors.unite && (
                <span className="text-red-600">Ce champ est requis.</span>
              )}
            </label>
            <button
              type="submit"
              className="btn btn-secondary mt-8 text-neutral"
            >
              Enregistrer les modifications
            </button>
          </div>
        </div>
        <button
          type="button"
          onClick={closeModal}
          className="btn btn-sm btn-circle btn-ghost bg-accent text-neutral hover:text-base-content absolute right-2 top-2"
        >
          ✕
        </button>
      </form>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={closeModal}>
          Fermer
        </button>
      </form>
      <ToastContainer theme="colored" />
    </dialog>
  );
}

ModalUpdateIng.propTypes = {
  ingredientToUpdate: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    proteins: PropTypes.string.isRequired,
    fat: PropTypes.string.isRequired,
    sugar: PropTypes.string.isRequired,
    fiber: PropTypes.string.isRequired,
    energy: PropTypes.string.isRequired,
    unit: PropTypes.string.isRequired,
  }).isRequired,
  setIsUpdated: PropTypes.func.isRequired,
};

export default ModalUpdateIng;
