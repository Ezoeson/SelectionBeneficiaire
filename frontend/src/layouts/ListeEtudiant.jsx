import React, { useEffect, useState } from "react";
import TableHeader from "../components/Tables/TableHeader";
import TableRow from "../components/Tables/TableRow";

import { HiMiniTrash, HiMiniPencil, HiMiniUserCircle } from "react-icons/hi2";
import { FcDeleteDatabase, FcCheckmark } from "react-icons/fc";

import {
  useGetEtudiantsQuery,
  useDeleteEtudiantMutation,
  useGetClassesQuery,
  useCreateEtudiantMutation,
  useGetStudentByIdQuery,
  useUpdateEtudiantMutation,
} from "../redux/slices/etudiantSlice";
import Loader from "../components/Loader/Loader";
import Modal from "../components/Modal/Modal";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { Dialog, Transition } from "@headlessui/react";
import Message from "../components/Message/Message";
import SlideOver from "../components/Modal/SlideOver";
import Input from "../components/Input/Input";

import { useForm } from "react-hook-form";
import * as yup from "yup";

import { yupResolver } from "@hookform/resolvers/yup";
import { BiSolidCameraPlus } from "react-icons/bi";

import { useUploadImageMutation } from "../redux/slices/uploadSlice";
import formatDate from "../utils/formatDate";

const ListeEtudiant = () => {
  const {
    data: etudiants,
    isLoading,
    isSuccess,
    isError,
    refetch,
    isFetching,
  } = useGetEtudiantsQuery();

  const [selectedId, setSelectedId] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [addModal, setAddModal] = useState(false);
  const [updateModal, setUpdateModal] = useState(false);

  const toggleDeleteModal = () => setDeleteModal(!deleteModal);
  const toggleAddModal = () => setAddModal(!addModal);
  const toggleUpdateModal = () => setUpdateModal(!addModal);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold">Liste de tous les étudiants</h2>
      <div className="flex items-center justify-end my-3">
        <button
          onClick={toggleAddModal}
          className="bg-blue-600 text-white py-2 px-8 rounded cursor-pointer"
        >
          Add student
        </button>
      </div>
      <div className="w-full min-h-[150px] bg-slate-50  rounded-lg overflow-hidden  max-w-[1366px] xl:mx-auto ">
        <TableHeader col="md:grid-cols-[1fr,2fr,1fr,1fr,100px,max-content]">
          <div className="md:hidden">Informations</div>
          <div className="hidden md:block">Numéro inscription</div>
          <div className="hidden md:block">Nom et prénoms</div>
          <div className="hidden md:block">Date de naissance</div>
          <div className="hidden md:block">Email</div>
          <div className="hidden md:block">Classe</div>
          <div className="hidden md:block">Actions</div>
        </TableHeader>
        <div className="flex flex-col">
          {(isLoading || isFetching) && (
            <div className="flex items-center justify-center mt-12">
              <Loader />
            </div>
          )}

          {(!isLoading || !isFetching) && isSuccess ? (
            <>
              {etudiants.map((item) => (
                <TableRow
                  key={item.id}
                  col={
                    "md:grid-cols-[1fr,2fr,1fr,1fr,100px,max-content] items-center"
                  }
                >
                  <div className="flex items-center space-x-2">
                    {item.image === null ? (
                      <HiMiniUserCircle className="w-10 h-10" />
                    ) : (
                      <img
                        src={"http://localhost:5000" + item.image}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    )}
                    <span className="md:hidden font-bold">
                      Numero inscription :{" "}
                    </span>{" "}
                    <span>{item.numMat}</span>
                  </div>
                  <div className="">
                    <span className="md:hidden font-bold">
                      Nom et prénoms :{" "}
                    </span>
                    {item.name}
                  </div>
                  <div className="">
                    <span className="md:hidden font-bold">
                      Date de naissance :{" "}
                    </span>{" "}
                    {new Date(item.birth).toLocaleDateString()}
                  </div>

                  <div className="">
                    {" "}
                    <span className="md:hidden font-bold">Email: </span>{" "}
                    {item.email}
                  </div>
                  <div className="">
                    <span className="md:hidden font-bold">Classe: </span>{" "}
                    {item.classe.name}
                  </div>
                  <Actions
                    id={item.id}
                    setSelectedId={setSelectedId}
                    toggleDeleteModal={toggleDeleteModal}
                    toggleUpdateModal={toggleUpdateModal}
                  />
                </TableRow>
              ))}
            </>
          ) : (
            isError && <ErrorPage refetch={refetch} />
          )}
        </div>
      </div>

      <DeleteModal
        open={deleteModal}
        setOpen={setDeleteModal}
        id={selectedId}
        refetch={refetch}
      />

      <AddModal open={addModal} setOpen={setAddModal} refetch={refetch} />
      <UpdateModal
        open={updateModal}
        setOpen={setUpdateModal}
        refetch={refetch}
        id={selectedId}
      />
    </div>
  );
};

const Actions = ({
  id,
  setSelectedId,
  toggleDeleteModal,
  toggleUpdateModal,
}) => {
  const deleteFunc = () => {
    setSelectedId(id);
    toggleDeleteModal();
  };

  const updateFunc = () => {
    setSelectedId(id);
    toggleUpdateModal();
  };

  return (
    <div className="flex items-center justify-center space-x-4">
      <HiMiniTrash onClick={deleteFunc} className="text-xl" />
      <HiMiniPencil onClick={updateFunc} className="text-xl" />
    </div>
  );
};

const ErrorPage = ({ refetch }) => {
  return (
    <div className="w-full flex items-center flex-col justify-center h-60">
      <FcDeleteDatabase className="text-[150px]" />
      <h2 className="text-xl text-center">Une erreur s'est produite</h2>
      <button
        onClick={refetch}
        className="bg-slate-950 rounded text-white py-2 px-6 cursor-pointer mt-3"
      >
        Actualiser
      </button>
    </div>
  );
};

const DeleteModal = ({ open, setOpen, id, refetch }) => {
  const [show, setShow] = useState(true);

  const [deleteEtudiant, { isLoading, isError, isSuccess }] =
    useDeleteEtudiantMutation();

  const handleDelete = async () => {
    try {
      setShow(false);
      const res = await deleteEtudiant(id).unwrap();
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setOpen(false);
        setShow(true);
      }, 2500);
    }
  }, [isSuccess, isError]);

  return (
    <Modal open={open} setOpen={setOpen}>
      {show ? (
        <>
          <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                <ExclamationTriangleIcon
                  className="h-6 w-6 text-red-600"
                  aria-hidden="true"
                />
              </div>
              <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <Dialog.Title
                  as="h3"
                  className="text-base font-semibold leading-6 text-gray-900"
                >
                  Delete this student {id}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    Are you sure you want to delete this student? All of your
                    data will be permanently removed. This action cannot be
                    undone.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
              onClick={handleDelete}
            >
              Delete
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
          </div>
        </>
      ) : isLoading ? (
        <Message title="Suppression en cours" icon={Loader} />
      ) : isSuccess ? (
        <Message title="Suppression success" icon={FcCheckmark} />
      ) : (
        isError && (
          <Message title="Something went wrong" icon={FcDeleteDatabase} />
        )
      )}
    </Modal>
  );
};

const AddModal = ({ open, setOpen, refetch }) => {
  // Create a schema
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    birth: yup
      .date()
      .typeError("Please enter a date")
      .required("Please enter your birth"),
    numMat: yup.string().required("Please enter your numMat"),
    email: yup
      .string()
      .email("Email invalid")
      .required("Please enter your email"),
  });

  const [uploadImage] = useUploadImageMutation();

  const [createEtudiant, { isLoading, isSuccess, isError }] =
    useCreateEtudiantMutation();

  const [image, setImage] = useState("");

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadImage(formData).unwrap();
      setImage(res.url);
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const {
    data: classes,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetClassesQuery();

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await createEtudiant({ ...data, image }).unwrap();
      refetch();
    } catch (error) {}
  };

  useEffect(() => {
    if (!open) {
      reset();
      setImage("");
    }
  }, [open]);

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setOpen(false);
        setShow(true);
      }, 2500);
    }
  }, [isSuccess, isError]);

  return (
    <SlideOver open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className="text-center font-bold text-xl">Add student</h1>

          <div className="flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-dashed border-slate-950 flex items-center justify-center relative">
              {image === "" ? (
                <BiSolidCameraPlus className="text-[100px]" />
              ) : (
                <img
                  src={"http://localhost:5000" + image}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <input
                type="file"
                onChange={handleUpload}
                name=""
                className="w-full h-full absolute opacity-0"
                id=""
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-4">
            <Input
              state={{ ...register("name") }}
              label={"Name"}
              type={"text"}
              error={errors?.name}
            />
            <p className="text-sm text-rose-500">{errors?.name?.message}</p>
            <Input
              state={{ ...register("birth") }}
              label={"Birth"}
              type={"date"}
              error={errors?.birth}
            />

            <p className="text-sm text-rose-500">{errors?.birth?.message}</p>
            <Input
              state={{ ...register("numMat") }}
              label={"Num matricule"}
              type={"text"}
              error={errors?.numMat}
            />
            <p className="text-sm text-rose-500">{errors?.numMat?.message}</p>

            <Input
              state={{ ...register("email") }}
              label={"Email"}
              type={"text"}
              error={errors?.email}
            />
            <p className="text-sm text-rose-500">{errors?.email?.message}</p>

            <div className="mt-2 flex items-center space-x-3">
              <label htmlFor="">Classe : </label>
              <select
                id="classe"
                name="classe"
                {...register("classeId")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {!loadingClasse &&
                  successClasse &&
                  classes.map((classe) => (
                    <option key={classe.id} value={classe.id}>
                      {classe.name}
                    </option>
                  ))}
              </select>
            </div>

            <button className=" mt-5 bg-blue-600 text-white py-2 px-8 rounded cursor-pointer">
              Add Student
            </button>
          </form>
        </div>
      ) : isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Message title="Ajout en cours" icon={Loader} />
        </div>
      ) : isSuccess ? (
        <div className="h-full w-full flex items-center justify-center">
          <Message title="Ajout success" icon={FcCheckmark} />
        </div>
      ) : (
        isError && (
          <div className="h-full w-full flex items-center justify-center">
            <Message title="Something went wrong" icon={FcDeleteDatabase} />
          </div>
        )
      )}
    </SlideOver>
  );
};

const UpdateModal = ({ open, setOpen, refetch, id }) => {
  const {
    data: etudiant,
    isSuccess: etudiantSuccess,
    status,
  } = useGetStudentByIdQuery(id, {
    skip: !open,
  });

  // Create a schema
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    birth: yup
      .date()
      .typeError("Please enter a date")
      .required("Please enter your birth"),
    numMat: yup.string().required("Please enter your numMat"),
    email: yup
      .string()
      .email("Email invalid")
      .required("Please enter your email"),
  });

  const [uploadImage] = useUploadImageMutation();

  const [updateEtudiant, { isLoading, isError, isSuccess }] =
    useUpdateEtudiantMutation();

  const [image, setImage] = useState("");

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("image", file);
      const res = await uploadImage(formData).unwrap();
      setImage(res.url);
    } catch (error) {
      console.log(error);
    }
  };

  const [show, setShow] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (status === "fulfilled") {
      setValue("name", etudiant.name);
      setValue("birth", formatDate(etudiant.birth));
      setValue("numMat", etudiant.numMat);
      setValue("email", etudiant.email);
      setValue("classeId", etudiant.classeId);
      setImage(etudiant.image);
    }
  }, [status]);

  const {
    data: classes,
    isLoading: loadingClasse,
    isSuccess: successClasse,
  } = useGetClassesQuery();

  const onSubmit = async (data) => {
    try {
      setShow(false);
      const res = await updateEtudiant({
        data: {
          ...data,
          image,
        },
        id,
      }).unwrap();
      refetch();
    } catch (error) {}
  };

  useEffect(() => {
    if (!open) {
      reset();
      setImage("");
    }
  }, [open]);

  useEffect(() => {
    if (isSuccess || isError) {
      setTimeout(() => {
        setOpen(false);
        setShow(true);
      }, 2500);
    }
  }, [isSuccess, isError]);

  return (
    <SlideOver open={open} setOpen={setOpen}>
      {show ? (
        <div>
          <h1 className="text-center font-bold text-xl">Update student {id}</h1>

          <div className="flex items-center justify-center">
            <div className="w-40 h-40 rounded-full border border-dashed border-slate-950 flex items-center justify-center relative">
              {image === "" || image === null ? (
                <BiSolidCameraPlus className="text-[100px]" />
              ) : (
                <img
                  src={"http://localhost:5000" + image}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              )}
              <input
                type="file"
                onChange={handleUpload}
                name=""
                className="w-full h-full absolute opacity-0"
                id=""
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="px-4">
            <Input
              state={{ ...register("name") }}
              label={"Name"}
              type={"text"}
              error={errors?.name}
            />
            <p className="text-sm text-rose-500">{errors?.name?.message}</p>
            <Input
              state={{ ...register("birth") }}
              label={"Birth"}
              type={"date"}
              error={errors?.birth}
            />

            <p className="text-sm text-rose-500">{errors?.birth?.message}</p>
            <Input
              state={{ ...register("numMat") }}
              label={"Num matricule"}
              type={"text"}
              error={errors?.numMat}
            />
            <p className="text-sm text-rose-500">{errors?.numMat?.message}</p>

            <Input
              state={{ ...register("email") }}
              label={"Email"}
              type={"text"}
              error={errors?.email}
            />
            <p className="text-sm text-rose-500">{errors?.email?.message}</p>

            <div className="mt-2 flex items-center space-x-3">
              <label htmlFor="">Classe : </label>
              <select
                id="classe"
                name="classe"
                {...register("classeId")}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                {!loadingClasse &&
                  successClasse &&
                  classes.map((classe) => (
                    <option key={classe.id} value={classe.id}>
                      {classe.name}
                    </option>
                  ))}
              </select>
            </div>

            <button className=" mt-5 bg-blue-600 text-white py-2 px-8 rounded cursor-pointer">
              Update Student
            </button>
          </form>
        </div>
      ) : isLoading ? (
        <div className="h-full w-full flex items-center justify-center">
          <Message title="Mofication en cours" icon={Loader} />
        </div>
      ) : isSuccess ? (
        <div className="h-full w-full flex items-center justify-center">
          <Message title="Modification success" icon={FcCheckmark} />
        </div>
      ) : (
        isError && (
          <div className="h-full w-full flex items-center justify-center">
            <Message title="Something went wrong" icon={FcDeleteDatabase} />
          </div>
        )
      )}
    </SlideOver>
  );
};

export default ListeEtudiant;
