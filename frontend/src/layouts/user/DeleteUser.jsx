import React, { useState } from 'react';

function DeleteUser() {
  const [deleted, setDeleted] = useState(false);

  const deleteUser = () => {
    const user_id = 'user_2XCMXA7m8ioJiH9DGJ9QGLxCwdH'; // Remplacez 'your_user_id' par l'ID de l'utilisateur que vous souhaitez supprimer.
    const url = `https://api.clerk.com/v1/users/${user_id}`;
    const config = {
      headers: {
        Authorization: 'sk_test_XVRsRdFub0bUUwaITS9rkLjC7J3xhBcfWzrvhuiIKA',
        'Access-Control-Allow-Origin': 'http://localhost:5173',
        // Remplacez par votre clé secrète Clerk.
      },
    };

    axios
      .delete(url, config)
      .then((response) => {
        // La requête DELETE a réussi, vous pouvez effectuer des actions supplémentaires ici si nécessaire.
        setDeleted(true);
        alert(response);
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la suppression de l'utilisateur :",
          error
        );
      });
  };

  return (
    <div>
      <button className='bg-indigo-600' onClick={deleteUser}>
        Supprimer l'utilisateur
      </button>
      {deleted && <p>L'utilisateur a été supprimé avec succès.</p>}
    </div>
  );
}

export default DeleteUser;
