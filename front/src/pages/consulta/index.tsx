import React, { useState } from 'react';
import Api from '../../services/api';
import { URL_PATHS } from '../../services/pathUrl';
import Navbar from '../../components/navBar';

const ConsultaPaciente: React.FC = () => {
  const [emailPaciente, setEmailPaciente] = useState('');
  const [emailMedico, setEmailMedico] = useState('');
  const [data, setData] = useState('');
  const [duracao, setDuracao] = useState<number | undefined>(undefined);
  const [consulta, setConsulta] = useState<any>(null);
  const [erroConsulta, setErroConsulta] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Api.post(URL_PATHS.FAZER_CONSULTA, {
        paciente: emailPaciente,
        medico: emailMedico,
        data: new Date(data).getTime(),
        duracao: duracao || 0,
      });
      setConsulta(response.data);
      setErroConsulta(null);
    } catch (error) {
      setErroConsulta('Ocorreu um erro ao agendar a consulta. Por favor, tente novamente.');
      setConsulta(null);
    }
  };

  return (
    <>
    <Navbar />
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Agendar Consulta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label htmlFor="emailPaciente" className="block text-sm font-medium leading-6 text-gray-900">
            Email do Paciente
          </label>
          <input
            type="email"
            id="emailPaciente"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Digite o email do paciente"
            value={emailPaciente}
            onChange={(e) => setEmailPaciente(e.target.value)}
            required
          />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label htmlFor="emailMedico" className="block text-sm font-medium leading-6 text-gray-900">
            Email do Médico
          </label>
          <input
            type="email"
            id="emailMedico"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Digite o email do médico"
            value={emailMedico}
            onChange={(e) => setEmailMedico(e.target.value)}
            required
          />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label htmlFor="data" className="block text-sm font-medium leading-6 text-gray-900">
            Data
          </label>
          <input
            type="date"
            id="data"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            value={data}
            onChange={(e) => setData(e.target.value)}
            required
          />
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <label htmlFor="duracao" className="block text-sm font-medium leading-6 text-gray-900">
            Duração (em segundos)
          </label>
          <input
            type="number"
            id="duracao"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Digite a duração da consulta em segundos"
            value={duracao || ''}
            onChange={(e) => setDuracao(parseInt(e.target.value))}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Agendar Consulta
        </button>
      </form>
      {/* Mostrar mensagem de erro */}
      {erroConsulta && (
        <div className="text-red-600 mt-4 text-center">
          {erroConsulta}
        </div>
      )}
      {/* Mostrar consulta agendada */}
      {consulta && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Consulta Agendada</h2>
          <div className="py-4">
            <div className="flex justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Consulta</h3>
                <p className="text-sm text-gray-500">{`Paciente: ${consulta.paciente}`}</p>
                <p className="text-sm text-gray-500">{`Médico: ${consulta.medico}`}</p>
                <p className="text-sm text-gray-500">{`Data: ${new Date(consulta.data).toLocaleDateString()}`}</p>
                <p className="text-sm text-gray-500">{`Duração: ${consulta.duracao} segundos`}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default ConsultaPaciente;