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
import { User } from 'firebase/auth'

console.log("storage", localStorage)
const timout = () => new Promise(resolve => setTimeout(resolve, 10_000))

onAuthStateChanged(auth, async (user) => {
  console.log(user)
  await timout()
  if (user) {
    const storedToken = localStorage.getItem('userToken')
    user.getIdToken().then((currentToken) => {
      if (storedToken === currentToken) {
        console.log("Acesso permitido")
      } else {
        window.location.href = 'https://auth-web-app-url.com'
      }
    });
  } else {
    window.location.href = 'https://auth-web-app-url.com'
  }
})

function App() {
  const [user, setUser] = useState<User | null >(null);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        console.log("Usuário logado:", user);
        setUser(user);
      } else {
        console.log('empty')
        await timout()
      }
    });
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
