import React, { useState } from 'react';
import Api from '../../services/api'; // Importe sua função de chamada de API aqui
import { URL_PATHS } from '../../services/pathUrl';

import Navbar from '../../components/navBar';

interface Consulta {
  emailMedico: string;
  data: string; // Ajuste o tipo conforme necessário
  // Adicione mais campos conforme necessário
}

const Agenda: React.FC = () => {
  const [emailPaciente, setEmailPaciente] = useState('');
  const [consultaJSON, setConsultaJSON] = useState<any>(null);
  const [erroConsulta, setErroConsulta] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await Api.get(URL_PATHS.VISUALIZAR_AGENDA, {
        params: {
          email: emailPaciente
        }
      });

      setConsultaJSON(response.data);
      setErroConsulta(null);
    } catch (error) {
      setErroConsulta('Ocorreu um erro ao visualizar a agenda. Por favor, tente novamente.');
      setConsultaJSON(null);
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Visualizar Agenda</h1>
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
              className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Visualizar
            </button>
          </div>
        </form>
        {erroConsulta && (
          <div className="text-red-600 mt-4 text-center">{erroConsulta}</div>
        )}
        {consultaJSON && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold text-gray-900">Agendamentos:</h3>
            <pre>{JSON.stringify(consultaJSON, null, 2)}</pre>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default Agenda;