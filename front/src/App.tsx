import React, {useEffect, useState} from 'react';

import Agenda from './pages/agenda'
import Cadastro from './pages/cadastro'
import Consulta from './pages/consulta'
import Exame from './pages/exame'
import Medico from './pages/medico'
import ReceitaGuia from './pages/receita&guia'
import PostarExames from './pages/postarExame';

import { auth } from './firebase-config'
import { signInWithCustomToken } from 'firebase/auth'

import Routes from './routes';

function App() {

  const [user, setUser] = useState<any | null >(null);

  const urlParams = new URLSearchParams(window.location.search);
  const customToken = urlParams.get('token') ?? ''


  useEffect(() => {
    signInWithCustomToken(auth, customToken).then((user) => {
      if (user) {
        console.log("Usuário logado:", user);
        setUser(user);
      } else {
        console.log('empty')
      }
    })
  }, []);

  if (!user) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Routes />
    </>
  );
}

export default App;
