import React, { useState } from 'react';
import Api from '../../services/api'; // Importe a função de fazer requisições HTTP
import { URL_PATHS } from '../../services/pathUrl'; // Verifique se o arquivo de caminhos está configurado corretamente
import Navbar from '../../components/navBar';

interface Consulta {
  emailMedico: string;
  data: string;
  // Adicione mais campos conforme necessário
}

const VisualizarMedico: React.FC = () => {
  const [consulta, setConsulta] = useState<Consulta | null>(null);
  const [erroConsulta, setErroConsulta] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await Api.get(URL_PATHS.VISUALISAR_MEDICO);

      setConsulta(response.data as Consulta);
      setErroConsulta(null);
    } catch (error) {
      setErroConsulta('Erro ao visualizar médico. Por favor, tente novamente.');
      setConsulta(null);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="pb-4">
            <h1 className="text-2xl font-semibold text-gray-900">Visualizar Médicos</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Visualizar
            </button>
          </form>
          {erroConsulta && (
          <div className="text-red-600 mt-4 text-center">{erroConsulta}</div>
        )}
        {consulta && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Médicos:</h3>
            <pre>{JSON.stringify(consulta, null, 2)}</pre>
          </div>
        )}
        </div>
      </div>
    </>
  );
};

export default VisualizarMedico;
