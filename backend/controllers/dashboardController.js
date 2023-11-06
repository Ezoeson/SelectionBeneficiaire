import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import { getISOWeek } from 'date-fns';

export const nombreBeneficiaireByJourBysemaine = async (req, res, next) => {
  const countBeneficiaire = await prisma.beneficiaire.count();
  const countCommune = await prisma.commune.count();
  const countEnqueteur = await prisma.enqueteur.count();

  const question = await prisma.question.count();

  const statistic = [
    {
      label: 'Nombre des communes',
      data: countCommune,
    },
    {
      label: 'Nombre des Menages',
      data: countBeneficiaire,
    },
    {
      label: 'Nombre des enqueteurs',
      data: countEnqueteur,
    },
    {
      label: 'Nombre des questions',
      data: question,
    },
  ];
  const beneficiaire = await prisma.beneficiaire.findMany();
  const jour = [
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
  ];

  // Initialize an object to store the most recent date and count for each day
  const result = {};
  jour.forEach((jour) => {
    result[jour] = {
      date: null,
      count: 0,
    };
  });
  beneficiaire.forEach((record) => {
    const createdAt = new Date(record.createdAt);
    const dayOfWeek = createdAt.getDay();
    const dateString = createdAt.toISOString().split('T')[0]; // Extract the date in 'YYYY-MM-DD' format;

    // If the result object does not have an entry for the day, or the date is more recent, update it
    if (
      !result[jour[dayOfWeek]] ||
      new Date(dateString) > new Date(result[jour[dayOfWeek]].date)
    ) {
      result[jour[dayOfWeek]] = {
        date: dateString,
        count: 0,
      };
    }

    result[jour[dayOfWeek]].count++;
  });

  const jours = Object.keys(result);
  const nombreBeneficiaire = jours.map((jour) => result[jour].count);

  const topNotes = await prisma.note.findMany({
    select: {
      value: true,
      beneficiaire: {
        select: {
          personne: {
            where: {
              type: 'RECEPTEUR',
            },
            select: {
              nom: true,
            },
          },
        },
      },
    },
    orderBy: {
      value: 'desc',
    },
    take: 10,
  });

  const Note = topNotes.map((note) => note.value);
  const nomPersonne = topNotes.map(
    (note) => note.beneficiaire?.personne[0].nom
  );

  // res.status(200).json({ Note, nomPersonne });

  res
    .status(200)
    .json({ jours, nombreBeneficiaire, statistic, Note, nomPersonne });
};

// const personneNote = async (req, res, next) => {
//   const topNotes = await prisma.note.findMany({
//     select: {
//       value: true,
//       beneficiaire: {
//         select: {
//           personne: {
//             where: {
//               type: 'RECEPTEUR',
//             },
//             select: {
//               nom: true,
//             },
//           },
//         },
//       },
//     },
//     orderBy: {
//       value: 'desc',
//     },
//     take: 10,
//   });

//   const Note = topNotes.map((note) => note.value);
//   const nomPersonne = topNotes.map((note) => note.beneficiaire.personne[0].nom);

//   res.status(200).json({ Note, nomPersonne });
// };

export const nombreBeneficiaire = async (req, res, next) => {
  const beneficiaire = await prisma.beneficiaire.findMany();
  const jour = [
    'dimanche',
    'lundi',
    'mardi',
    'mercredi',
    'jeudi',
    'vendredi',
    'samedi',
  ];

  // Initialize an object to store the count for each day and week
  const result = {};

  beneficiaire.forEach((record) => {
    const createdAt = new Date(record.createdAt);
    const dayOfWeek = createdAt.getDay();
    const dateString = createdAt.toISOString().split('T')[0]; // Extract the date in 'YYYY-MM-DD' format;

    const year = createdAt.getFullYear();
    const week = getISOWeek(createdAt); // You may need to use a library like 'date-fns' to get the ISO week number.

    // If the result object does not have an entry for the week, initialize it with an empty object
    if (!result[year]) {
      result[year] = {};
    }

    // If the week object does not have an entry for the week, initialize it with counts
    if (!result[year][week]) {
      result[year][week] = {
        jours: jour.map((day) => day),
        nombres: jour.map(() => 0),
      };
    }

    // Increment the count for the specific day of the week
    result[year][week].nombres[dayOfWeek]++;
  });

  // Extract the day names and counts for each week
  const semaines = Object.keys(result).reduce((weeks, year) => {
    const weekData = Object.keys(result[year]).map((week) => {
      return {
        jours: result[year][week].jours,
        nombres: result[year][week].nombres,
      };
    });
    return weeks.concat(weekData);
  }, []);

  res.status(200).json(semaines);
};

export const userDashboard = async (req, res, next) => {
  const countFormulaire = await prisma.formulaire.count();
  const countCategorie = await prisma.categorieQuestion.count();
  const countQuestion = await prisma.question.count();

  const statistic = [
    {
      label: 'Nombre des Formulaires',
      data: countFormulaire,
    },
    {
      label: 'Nombre des Categories',
      data: countCategorie,
    },
    {
      label: 'Nombre des Questions',
      data: countQuestion,
    },
  ];

  const nombreBeneficiaire = await prisma.fokontany.findMany({
    where: {
      enqueteur: {
        id: req.params.id,
      },
    },
    select: {
      _count: {
        select: {
          beneficiaire: true,
        },
      },
    },
  });
  const nombre = nombreBeneficiaire.map((item) => item._count.beneficiaire);

  const total = nombre.reduce((acc, current) => acc + current, 0);

  res.status(200).json({ total, statistic });
};

export const getBeneficiaireCountByDate = async (req, res, next) => {
  const results = await prisma.beneficiaire.groupBy({
    by: ['createdAt'], // Remplacez 'createdAt' par le nom du champ de date dans votre modèle
    _count: {
      _all: true,
    },
  });

  const groupedDates = {};

  results.forEach((result) => {
    const date = new Date(result.createdAt).toLocaleDateString();
    if (groupedDates[date]) {
      groupedDates[date] += result._count._all;
    } else {
      groupedDates[date] = result._count._all;
    }
  });

  const date = Object.keys(groupedDates);
  const nombre = Object.values(groupedDates);

  res.status(200).json({ date, nombre });
};
