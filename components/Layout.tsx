type Props = {
  children: JSX.Element[];
};

const Layout = ({ children }: Props) => {
  return (
    <div className='flex min-h-screen w-full bg-[rgba(208,175,81,0.6)] p-4'>
      <div className='m-auto bg-white rounded-md w-3/5 h-3/4 grid lg:grid-cols-2 p-2'>
        <div className='relative min-h-screen'>
          <div className='barmen'></div>
        </div>
        <div className='right flex flex-col justify-evenly bg-red-700'>
          <div className='text-center py-10'>{children}</div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
