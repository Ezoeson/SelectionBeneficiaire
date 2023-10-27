import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';

const items = [
  {
    id: 1,
    title: 'Back End Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
  },
  {
    id: 2,
    title: 'Front End Developer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
  },
  {
    id: 3,
    title: 'User Interface Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote',
  },
];

export default function Pagination({ page, pages,total }) {
  return (
    pages > 1 && (
      <div className='flex items-center justify-between border-t dark:bg-slate-900  border-gray-200 bg-white px-4 py-3 sm:px-6'>
        <div className='flex flex-1 justify-between sm:hidden'>
          <Link
            to={`/enqueteur/${page - 1}`}
            className='relative inline-flex items-center dark:bg-slate-900 dark:text-white rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
          >
            Precedent
          </Link>
          {page < pages && (
            <Link
              to={`/enqueteur/${page + 1}`}
              className='relative ml-3 inline-flex dark:bg-slate-900 dark:text-white items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50'
            >
              Next
            </Link>
          )}
        </div>
        <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
          <div>
            <p className='text-sm text-gray-700 dark:text-white'>
              Affichage <span className='font-medium'>{page}</span> a{' '}
              <span className='font-medium'>{pages}</span> sur{' '}
              <span className='font-medium'>{total}</span> resultats
            </p>
          </div>

          <div>
            <nav
              className='isolate inline-flex -space-x-px rounded-md shadow-sm'
              aria-label='Pagination'
            >
              <Link
                to={`/enqueteur/${page - 1}`}
                className='relative inline-flex dark:text-white items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
              >
                <span className='sr-only dark:text-white'>Precedent</span>
                <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
              </Link>
              {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
              {[...Array(pages).keys()].map((x) => (
                <Link
                  key={x + 1}
                  to={`/enqueteur/${x + 1}`}
                  aria-current={page}
                  className={clsx(
                    `relative z-10 inline-flex items-center border dark:text-white text-black  px-4 py-2 text-sm font-semibold  focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600`,
                    page === x + 1 && 'bg-indigo-600  text-white'
                  )}
                >
                  {x + 1}
                </Link>
              ))}
              {page < pages && (
                <Link
                  to={`/enqueteur/${page + 1}`}
                  className='relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset  ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0'
                >
                  <span className='sr-only '>Next</span>
                  <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
                </Link>
              )}
            </nav>
          </div>
        </div>
      </div>
    )
  );
}
