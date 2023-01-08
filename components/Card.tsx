import Link from 'next/link';
import React from 'react';
import { StarOutlined } from '@ant-design/icons';

type Drink = {
  drink: {
    id: string;
    title: string;
    imageUrl: string;
    rating: number;
  };
};

const Card = ({ drink }: Drink) => {
  return (
    <div className='p-2 flex flex-col justify-center items-center gap-2'>
      <Link href={`/cocktail/${drink.id}`}>
        <div className='image w-full'>
          <img src={drink.imageUrl} alt='' className='w-full cursor-pointer' />
        </div>
        <h1 className='text-xl text-center font-light uppercase text-darkgray'>{drink.title}</h1>
      </Link>
      <div className='rating w-full p-2 text-golden flex justify-center items-center gap-[3px]'>
        {[...Array(drink.rating)].map((_, index) => (
          <StarOutlined key={index} />
        ))}
      </div>
    </div>
  );
};

export default Card;
