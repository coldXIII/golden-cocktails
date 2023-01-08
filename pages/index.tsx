import Cocktails from '@/components/Cocktails';
import Head from 'next/head';
import Navbar from '@/components/Navbar';
import Intro from '@/components/Intro';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Golden Cocktails</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/cocktail.png' />
      </Head>
      <div className='w-full overflow-hidden'>
        <Intro />
        <Navbar />
        <Cocktails />
      </div>
    </div>
  );
}
