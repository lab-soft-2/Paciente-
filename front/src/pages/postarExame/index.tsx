import React, { useState } from 'react';
import Api from '../../services/api';
import { URL_PATHS } from '../../services/pathUrl';

const PostarExames: React.FC = () => {
  const [email, setEmail] = useState('');
  const [exame, setExame] = useState('');
  const [resultadoExame, setResultadoExame] = useState<object | null>(null);
  const [erroExame, setErroExame] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await Api.post<object>(URL_PATHS.POSTAR_EXAMES, {
        email,
        exame
      });

      if (response.status === 200) {
        // Define o resultado do exame para mostrar sucesso
        setResultadoExame(response.data);
        setErroExame(null);
      }
    } catch (error) {
      // Define uma mensagem de erro para mostrar falha no cadastro
      setErroExame('Ocorreu um erro ao postar o exame. Por favor, tente novamente.');
      setResultadoExame(null);
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Postar Exames
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email do Paciente
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="exame" className="block text-sm font-medium leading-6 text-gray-900">
                Exame
              </label>
              <div className="mt-2">
                <input
                  id="exame"
                  name="exame"
                  type="text"
                  required
                  value={exame}
                  onChange={(e) => setExame(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Postar
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Mostrar mensagem de sucesso ou erro */}
      {resultadoExame && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-900">Exame Postado com Sucesso:</h3>
          <pre className="mt-2 p-4 bg-gray-100 rounded-md overflow-auto">{JSON.stringify(resultadoExame, null, 2)}</pre>
        </div>
      )}
      {erroExame && (
        <div className="text-red-600 mt-4 text-center">
          {erroExame}
        </div>
      )}
    </>
  );
};

export default PostarExames;
