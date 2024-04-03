import React from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";


import Agenda from './pages/agenda'
import Cadastro from './pages/cadastro'
import Consulta from './pages/consulta'
import Exame from './pages/exame'
import Medico from './pages/medico'
import ReceitaGuia from './pages/receita&guia'
import PostarExames from './pages/postarExame';
import { auth } from './firebase-config'

console.log("storage", sessionStorage)
const timout = () => new Promise(resolve => setTimeout(resolve, 10_000))

onAuthStateChanged(auth, async (user) => {
  await timout()
  if (user) {
    const storedToken = sessionStorage.getItem('userToken')
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
