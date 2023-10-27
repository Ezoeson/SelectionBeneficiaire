const formatDate = (date) => {
  const newDate = new Date(date).toLocaleDateString();

  const tab = newDate.split("/");

  const dateN = `${tab[2]}-${tab[1]}-${tab[0]}`;

  return dateN;
};


export default formatDate