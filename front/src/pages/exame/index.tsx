import React, { useState } from 'react';

const Agenda: React.FC = () => {
  const [emailMedico, setEmailMedico] = useState('');
  const [consultas, setConsultas] = useState<any[]>([]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você faria a chamada para a API para enviar o email do médico
    // e receberia as consultas como resposta
    // Por enquanto, apenas atualizamos o estado com dados de exemplo
    const response = await fetch('sua-url-da-api/consultas', {
      method: 'POST',
      body: JSON.stringify({ emailMedico }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    setConsultas(data);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-8">
        <div className="pb-4">
          <h1 className="text-2xl font-semibold text-gray-900">Visualizar Exames</h1>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex mb-4">
            <input
              type="email"
              className="border-gray-300 border rounded-md p-2 mr-2"
              placeholder="Email Paciente"
              value={emailMedico}
              onChange={(e) => setEmailMedico(e.target.value)}
            />
           <button
            type="submit"
            className="py-2 px-4 bg-indigo-600 text-white rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50">
            Visualizar
          </button>
          </div>
        </form>
        <div className="grid grid-cols-1 gap-8">
          {consultas.map((consulta, index) => (
            <div key={index} className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
              <div className="p-6">
                <p className="text-lg font-semibold text-gray-900">Consulta {index + 1}</p>
                <p className="text-sm text-gray-500">Email Médico: {consulta.emailMedico}</p>
                <p className="text-sm text-gray-500">Data: {consulta.data}</p>
                {/* Adicione mais informações das consultas conforme necessário */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Agenda;
