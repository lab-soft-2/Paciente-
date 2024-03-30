import React, { useState } from 'react';
import Api from '../../services/api';
import { URL_PATHS } from '../../services/pathUrl';

const VisualizarReceitaGuia: React.FC = () => {
  const [emailPaciente, setEmailPaciente] = useState('');
  const [consulta, setConsulta] = useState<any | null>(null);
  const [erroConsulta, setErroConsulta] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await Api.get(URL_PATHS.VISUALIZAR_RECEITA_GUIA, {
        params: {
          email: emailPaciente
        }
      });

      setConsulta(response.data);
      setErroConsulta(null);
    } catch (error) {
      setErroConsulta('Ocorreu um erro ao buscar as receitas e guias do paciente. Por favor, tente novamente.');
      setConsulta(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Visualizar Receitas e Guias</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <input
              type="email"
              className="border-gray-300 border rounded-md p-2 mr-2"
              placeholder="Email Paciente"
              value={emailPaciente}
              onChange={(e) => setEmailPaciente(e.target.value)}
            />
            <button
              type="submit"
              className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
              Visualizar
            </button>
          </div>
        </form>
        {erroConsulta && (
          <div className="text-red-600 mt-4 text-center">
            {erroConsulta}
          </div>
        )}
        {consulta && (
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6">
              <p className="text-lg font-semibold text-gray-900">Consulta</p>
              <p className="text-sm text-gray-500">Email Médico: {consulta.emailMedico}</p>
              <p className="text-sm text-gray-500">Data: {consulta.data}</p>
              {/* Adicione mais informações das consultas conforme necessário */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisualizarReceitaGuia;
