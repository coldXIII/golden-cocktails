import React from 'react';

type Props = {};

const Intro = (props: Props) => {
  return (
    <section className='h-[87vh] w-full flex '>
      <div className='w-1/2 h-full'>
        <img src='intro1.jpg' alt='' className='w-full h-full object-cover' />
      </div>
      <div className='w-1/2 h-full'>
        <img src='intro2.jpg' alt='' className='w-full h-full object-cover' />
      </div>
    </section>
  );
};

export default Intro;
