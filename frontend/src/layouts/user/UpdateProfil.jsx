import React from 'react';
import clsx from 'clsx';
import React from 'react';
import { useContext, useState } from 'react';

import { SidebarContext } from '../../contexts/SidebarContext';
import { AiOutlineLeft } from 'react-icons/ai';
import SlideOver from '../../components/Modal/SlideOver';

import { motion } from 'framer-motion';

import { BiLogOut, BiLogOutCircle } from 'react-icons/bi';
import { MdSpaceDashboard, MdLightMode, MdDarkMode } from 'react-icons/md';
import { IoInvertModeOutline } from 'react-icons/io5';
import { AiFillSetting } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { useGetOneEnqueteurQuery } from '../../redux/slices/enqueteurSlice';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';

function UpdateProfil() {
  const {
    data: enqueteur,
    isSuccess: EnqueteurSuccess,
    status,
  } = useGetOneEnqueteurQuery();
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const schema = yup.object().shape({
    nom: yup.string().required('veuillez entrer votre nom'),

    age: yup.number().required(' veuillez entrer votre age '),
  });

  const [uploadImage] = useUploadImageMutation();

  const [updateEnqueteur, { isLoading, isError, isSuccess }] =
    useUpdateEnqueteurMutation();

  const [image, setImage] = useState('');

  const handleUpload = async (e) => {
    try {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('image', file);
      const res = await uploadImage(formData).unwrap();
      setImage(res.image);
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
    if (status === 'fulfilled') {
      setValue('nom', enqueteur.nom);
      setValue('age', enqueteur.age);

      setImage(enqueteur.image);
    }
  }, [status]);

  return <div>UpdateProfil</div>;
}

export default UpdateProfil;
