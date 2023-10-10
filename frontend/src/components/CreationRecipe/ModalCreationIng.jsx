/* eslint-disable react/jsx-props-no-spreading */

import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";

import expressAPI from "../../services/expressAPI";

function ModalCreationIng() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleClose = () => {
    document.getElementById("ingCreation").close();
  };
  const onSubmit = (data) => {
    expressAPI.post(`/ingredient`, data).then((res) => {
      if (res.status === 201) {
        toast.success(
          "Ingredient créé avec succès, vous pouvez maintenant le retrouver en le recherchant",
          {
            autoClose: 3000,
            pauseOnFocusLoss: false,
          }
        );
        document.getElementById("ingCreation").close();
        document.getElementById("ingSearch").close();
      } else {
        toast.error("Un problème inattendu est survenu", {
          autoClose: 3000,
          pauseOnFocusLoss: false,
        });
      }
    });
  };

  return (
    <div>
      <dialog id="ingCreation" className="modal  ">
        <form
          method="dialog"
          className="modal-box bg-neutral"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h1 className="text-center">Créer un ingrédient</h1>
          <div className="mt-8 md:w-2/3  mx-auto">
            <div className="flex flex-col gap-2 ">
              <label className="font-bold my-2">
                Nom:
                <input
                  type="text"
                  className="bg-accent ml-6 px-3 py-2 font-normal rounded-xl"
                  {...register("name", { required: true })}
                  aria-invalid={errors.name ? "true" : "false"}
                />
                {errors.name && (
                  <span className="text-red-600">Ce champ est requis.</span>
                )}
              </label>
              <label className="font-bold my-2 grid grid-cols-3 items-center">
                Protéines :
                <input
                  type="number"
                  maxLength={4}
                  min={0}
                  {...register("proteins", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="bg-accent ml-6 mr-2 px-3 py-2 rounded-xl w-20 font-normal  "
                />
                <p className="ml-2">g/100g</p>
              </label>
              {errors.proteins && (
                <span className="text-red-600">Ce champ est requis.</span>
              )}
              <label className="font-bold my-2 grid grid-cols-3 items-center">
                Lipides :
                <input
                  type="number"
                  maxLength={4}
                  min={0}
                  {...register("fat", { required: true, valueAsNumber: true })}
                  className="bg-accent ml-6 mr-2 px-3 py-2 rounded-xl w-20 font-normal"
                />
                <p className="ml-2">g/100g</p>
              </label>
              {errors.fat && (
                <span className="text-red-600">Ce champ est requis.</span>
              )}
              <label className="font-bold my-2 grid grid-cols-3 items-center">
                Glucides :
                <input
                  type="number"
                  maxLength={4}
                  min={0}
                  {...register("sugar", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="bg-accent ml-6 mr-2 px-3 py-2 rounded-xl w-20 font-normal "
                />
                <p className="ml-2">g/100g</p>
              </label>
              {errors.sugar && (
                <span className="text-red-600">Ce champ est requis.</span>
              )}
              <label className="font-bold my-2 grid grid-cols-3 items-center">
                Fibres:
                <input
                  type="number"
                  maxLength={4}
                  min={0}
                  {...register("fiber", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="bg-accent ml-6 mr-2 px-3 py-2 rounded-xl w-20 font-normal "
                />
                <p className="ml-2">g/100g</p>
              </label>
              {errors.fiber && (
                <span className="text-red-600">Ce champ est requis.</span>
              )}
              <label className="font-bold my-2 grid grid-cols-3 items-center">
                Energies:
                <input
                  type="number"
                  maxLength={4}
                  min={0}
                  {...register("energy", {
                    required: true,
                    valueAsNumber: true,
                  })}
                  className="bg-accent ml-6 mr-2 px-3 py-2 rounded-xl w-20 font-normal "
                />
                <p className="ml-2">kcal/100g</p>
              </label>
              {errors.energy && (
                <span className="text-red-600">Ce champ est requis.</span>
              )}
              <label className="font-bold my-2">
                Unité
                <select
                  {...register("unit", { required: true })}
                  aria-invalid={errors.unite ? "true" : "false"}
                  className="bg-accent ml-6 mr-2 px-3 py-3 rounded-xl font-normal w-36"
                >
                  <option value="">Sélectionner</option>
                  <option value="g">g</option>
                  <option value="cL">cL</option>
                </select>
                {errors.unite && (
                  <span className="text-red-600">Ce champ est requis.</span>
                )}
              </label>
              <button
                type="submit"
                className="btn btn-secondary mt-8 text-neutral "
              >
                Soumettre
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="btn btn-sm btn-circle btn-ghost bg-accent text-neutral hover:text-base-content absolute right-2 top-2"
          >
            ✕
          </button>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button type="button" onClick={handleClose}>
            X
          </button>
        </form>
        <ToastContainer theme="colored" />
      </dialog>
    </div>
  );
}

export default ModalCreationIng;
