import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { signIn } from 'next-auth/react';
import Layout from '../components/Layout';

const Login: React.FC = () => {

  const handleGoogleSignIn = async () => {
    signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_API_URL });
  };
  async function handleGithubSignin() {
    signIn('github', { callbackUrl: process.env.NEXT_PUBLIC_API_URL });
  }

  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <section className='w-3/4 mx-auto flex flex-col gap-8 p-4'>
        <form className='flex flex-col gap-3' >
          <div className='mb-6'>
            <button
              type='button'
              className='w-full border border-golden py-3 flex justify-center gap-2 hover:bg-[rgba(208,175,81,0.5)] '
              onClick={handleGoogleSignIn}
            >
              Sign In with Google
              <Image src={'/assets/google.svg'} width='20' height={20} alt={'image'} />
            </button>
          </div>
          <div className='input-button'>
            <button
              type='button'
              className='w-full border border-golden py-3 flex justify-center gap-2 hover:bg-[rgba(208,175,81,0.5)] '
              onClick={handleGithubSignin}
            >
              Sign In with Github
              <Image src={'/assets/github.svg'} width={25} height={25} alt={'image'} />
            </button>
          </div>
        </form>
      </section>
    </Layout>
  );
};

export default Login;
