import { useState } from 'react';
import { useQuery } from '@apollo/client';
import Card from './Card';
import { MainCocktailsQuery } from '@/graphql/queries';
import GridSkeleton from './GridSkeleton';

type Drink = {
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

  const filteredCocktails = data?.cocktails.filter((cocktail: Drink) => cocktail.recipe.includes(search));

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
      <div className='w-5/6 mx-auto p-2 grid grid-cols-3 gap-4'>
        {loading
          ? [...Array(data?.cocktails?.length)]
          : filteredCocktails?.map((drink: Drink, index: number) =>
              loading ? <GridSkeleton key={index} /> : <Card key={drink.id} drink={drink} />
            )}
      </div>
    </section>
  );
};

export default Cocktails;
