import React from 'react';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import ItemSkeleton from '@/components/ItemSkeleton';
import { useQuery, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/react';
import { CocktailQuery } from '@/graphql/queries';
import { DeleteMutation } from '@/graphql/mutations';
import Link from 'next/link';

const Cocktail: React.FC = () => {
  const router = useRouter();

  const [deleteCocktail] = useMutation(DeleteMutation);

  const confirmDeleteCocktail = async () => {
    if (confirm('Delete Cocktail?')) {
      await deleteCocktail({
        variables: {
          cocktailId: data?.cocktail?.id
        }
      }).then(() => router.push('/'));
    }
  };

  const cocktailId = useRouter().query.id;

  const { loading, error, data } = useQuery(CocktailQuery, {
    variables: { cocktailId }
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Head>
        <title>{data?.cocktail.title}</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/cocktail.png' />
      </Head>
      <Navbar />
      <div className='min-h-[100vh] flex flex-col justify-center items-center px-4 py-8'>
        {loading ? (
          <ItemSkeleton />
        ) : (
          <>
            <div className='sm:flex p-4 gap-4'>
              <div className='image w-full sm:w-1/2 '>
                <img src={data.cocktail.imageUrl} alt='' className='w-full object-cover' />
              </div>
              <div className='content w-full flex flex-col justify-center items-center text-center'>
                <h1 className='text-3xl text-darkgray font-light uppercase mb-8'>{data.cocktail.title}</h1>
                <ul className='mb-8 text-darkgray  text-center'>
                  <h3 className='text-xl text-golden font-light uppercase mb-4'>recipe</h3>
                  {data.cocktail.content.split('  ').map((string: string, index: number) => (
                    <li key={index} className='mb-2'>
                      {string}
                    </li>
                  ))}
                </ul>
                <ul>
                  {data.cocktail.recipe.split('.').map((string: string, index: number) => (
                    <li key={index} className='mb-2 text-darkgray text-lg '>
                      {string}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className=' my-8 flex flex-col justify-center items-center'>
              <h3 className='text-3xl text-golden font-light uppercase mb-4'>History</h3>
              <p className='w-[70%] text-darkgray leading-7'>{data.cocktail.history}</p>
            </div>
            <div className='actions flex'>
              <button className='py-1  sm:py-2 px-2  sm:px-4 border border-golden text-golden uppercase mx-2'>
                <Link href={`/edit/${data.cocktail.id}`}>Edit Cocktail</Link>
              </button>
              <button
                onClick={confirmDeleteCocktail}
                className='py-1  sm:py-2 px-2  sm:px-4 border border-carmin text-carmin uppercase mx-2 '
              >
                Delete Cocktail
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cocktail;
