import React from 'react';
import Navbar from '../../components/navBar';

const NotFoundPage: React.FC = () => {
    
    return (
      <>
        <Navbar />
        <div>
        <h1>404 - Página não encontrada</h1>
        <p>A página que você está procurando não existe.</p>
        </div>
      </>
    );
};

export default NotFoundPage;