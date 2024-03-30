import React from 'react';

import Agenda from './pages/agenda'
import Cadastro from './pages/cadastro'
import Consulta from './pages/consulta'
import Exame from './pages/exame'
import Medico from './pages/medico'
import ReceitaGuia from './pages/receita&guia'
import PostarExames from './pages/postarExame';

function App() {
  return (
    <>
    <Agenda />
    <Cadastro />
    <Consulta />
    <Exame />
    <Medico />
    <ReceitaGuia />
    <PostarExames />
    </>
  );
}

export default App;
