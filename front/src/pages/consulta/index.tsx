import React, { useState } from 'react';

const ConsultaPaciente: React.FC = () => {
  const [emailPaciente, setEmailPaciente] = useState('');
  const [emailMedico, setEmailMedico] = useState('');
  const [data, setData] = useState('');
  const [duracao, setDuracao] = useState<number | undefined>(undefined);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada para a API para enviar os dados da consulta
    // Por enquanto, apenas exibimos os dados inseridos
    console.log('Dados da consulta:', { emailPaciente, emailMedico, data, duracao });
  };

  return (
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
    </div>
  );
}

export default ConsultaPaciente;
