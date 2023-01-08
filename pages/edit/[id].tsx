import React from 'react';
import Navbar from '@/components/Navbar';
import Form from '@/components/Form';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { CocktailQuery } from '@/graphql/queries';

const Edit = () => {
  const router = useRouter();
  const cocktailId = router.query.id;

  const { loading, error, data } = useQuery(CocktailQuery, {
    variables: { cocktailId }
  });

  if (loading) {
    return <div>Loading ...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Navbar />
      <Form cocktail={data?.cocktail} />
    </>
  );
};

export default Edit;
