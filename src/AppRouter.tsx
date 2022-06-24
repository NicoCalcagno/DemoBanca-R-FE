import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Accounts from "./pages/Account";
import Client from "./pages/Client";
import Movements from './pages/Movement';

import "bootstrap/dist/css/bootstrap.min.css";



const AppRouter: React.FC = () => {
  
  return (
    <BrowserRouter>
      <Routes>
            
          <Route path="/" element={<Client />} />
          <Route path="/account" element={<Accounts />} />
          <Route path="/movement" element={<Movements />}/>
        
      </Routes>
    </BrowserRouter>
  
  );
}

export default AppRouter;
