import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const { data: session } = useSession();

  const avatar = session?.user?.image;

  return (
    <nav className='flex items-center justify-between flex-wrap  py-4 px-2 lg:px-10 text-golden border-b border-golden'>
      <div className='w-full  flex-grow flex justify-center items-center gap-4 '>
        <div className='text-sm lg:flex-grow'>
          <Link passHref href='/'>
            <h1 className='text-[#000] uppercase text-3xl font-thin'>
              <span className='text-golden'>Golden</span> Cocktails
            </h1>
          </Link>
        </div>
        <div className='flex justify-between items-center gap-4'>
          {session ? (
            <>
              <Link passHref href='/create'>
                <span className='text-golden uppercase text-lg font-thin mr-4'>Create Cocktail</span>
              </Link>
              <button className='text-carmin  py-2 px-4 uppercase text-lg font-thin' onClick={() => signOut()}>
                Log Out
              </button>
              {avatar ? (
                <img src={avatar as string} alt={session?.user?.name || ''} className='w-10 h-10 rounded-full' />
              ) : null}
            </>
          ) : (
            <Link href='/login'>
              <button className='text-golden  py-2 px-4  uppercase text-lg font-thin  hover:text-lightgray'>
                Log In
              </button>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
3;
