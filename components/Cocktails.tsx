import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Card from './Card';
import { MainCocktailsQuery } from '@/graphql/queries';
import GridSkeleton from './GridSkeleton';

type Cocktail = {
  id: string;
  title: string;
  recipe: string;
  imageUrl: string;
  rating: number;
};

const Cocktails: React.FC = () => {
  const [search, setSearch] = useState<string>('');

  const { loading, error, data } = useQuery(MainCocktailsQuery, {
    fetchPolicy: 'cache-and-network'
  });

  const filteredCocktails = data?.cocktails.filter((cocktail: Cocktail) => cocktail.recipe.includes(search));

  if (error) {
    return <p>Error {error.message}</p>;
  }

  return (
    <section className='w-screen'>
      <form className='w-full p-8 flex justify-center items-center gap-4'>
        <input
          type='text'
          className='p-2 w-[40vw] border border-golden outline-none '
          placeholder='Search Cocktails by Spirit'
          onChange={e => setSearch(e.target.value)}
        />
      </form>
      <div className='w-5/6 mx-auto p-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading
          ? [...Array(data?.cocktails?.length)]
          : filteredCocktails?.map((drink: Cocktail, index: number) =>
              loading ? <GridSkeleton key={index} /> : <Card key={drink.id} drink={drink} />
            )}
      </div>
    </section>
  );
};

export default Cocktails;
