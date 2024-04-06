import React from 'react';
import Navbar from '../../components/navBar';

const Home: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Bem-vindo à nossa plataforma
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <p className="text-center text-gray-700">
            Aqui você pode encontrar uma variedade de recursos e funcionalidades para melhorar sua experiência de saúde.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;