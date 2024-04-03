import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";


import Agenda from './pages/agenda'
import Cadastro from './pages/cadastro'
import Consulta from './pages/consulta'
import Exame from './pages/exame'
import Medico from './pages/medico'
import ReceitaGuia from './pages/receita&guia'
import PostarExames from './pages/postarExame';
import { auth } from './firebase-config'
import { User, signInWithCustomToken } from 'firebase/auth'

console.log("storage", localStorage)
const timout = () => new Promise(resolve => setTimeout(resolve, 10_000))

function App() {
  const [user, setUser] = useState<any | null >(null);

  const urlParams = new URLSearchParams(window.location.search);
  const customToken = urlParams.get('token') ?? ''


  useEffect(() => {
    signInWithCustomToken(auth, customToken).then((user) => {
      console.log('aqui', user)
      if (user) {
        console.log("Usuário logado:", user);
        setUser(user);
      } else {
        console.log('empty')
      }
    })
  }, []);

  if (!user) {
    // Renderize algum tipo de tela de carregamento ou retorne null
    return <div>Carregando...</div>;
  }
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
