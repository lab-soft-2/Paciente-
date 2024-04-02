import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Agenda from '../pages/agenda'
import Cadastro from '../pages/cadastro'
import Consulta from '../pages/consulta'
import Exame from '../pages/exame'
import ReceitaGuia from '../pages/receita&guia'
import PostarExames from '../pages/postarExame';
import Home from '../pages/home';
import PageNotFound from '../pages/notFound'
import VisualizarMedico from '../pages/medico';

const Rotas: React.FC = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/patient/home" element={<Home />} />
                <Route path="/patient/signup" element={<Cadastro />} />
                <Route path="/patient/vizualizar/documento" element={<ReceitaGuia />} />
                <Route path="/patient/vizualizar/agenda" element={<Agenda />} />
                <Route path="/patient/vizualizar/exame" element={<Exame />} />
                <Route path="/patient/postar/exame" element={<PostarExames />} />
                <Route path="/patient/vizualizar/medicos" element={<VisualizarMedico />} />
                <Route path="/patient/fazer/consulta" element={<Consulta />} />
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Rotas;