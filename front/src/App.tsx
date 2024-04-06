import React, {useEffect, useState} from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase-config'
import { User, signInWithCustomToken } from 'firebase/auth'
import Routes from './routes';

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

//  if (!user) {
    // Renderize algum tipo de tela de carregamento ou retorne null
//    return <div>Carregando...</div>;
//  }
  return (
    <>
    <Routes />
    </>
  );
}

export default App;
