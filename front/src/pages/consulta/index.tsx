import React, { useState } from 'react';
import Api from '../../services/api';
import { URL_PATHS } from '../../services/pathUrl';

interface Consulta {
  paciente: string;
  medico: string;
  data: number;
  duracao: number;
}

const ConsultaPaciente: React.FC = () => {
  const [emailPaciente, setEmailPaciente] = useState('');
  const [emailMedico, setEmailMedico] = useState('');
  const [data, setData] = useState('');
  const [duracao, setDuracao] = useState<number | undefined>(undefined);
  const [consulta, setConsulta] = useState<Consulta | null>(null);
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
    <div className="max-w-lg mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-4">Agendar Consulta</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Inputs do formulário */}
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
  );
}

export default ConsultaPaciente;
