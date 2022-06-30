import React from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Accounts from "./components/account/Account";
import Client from "./components/client/Client";
import Movements from './components/movement/Movement';

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
