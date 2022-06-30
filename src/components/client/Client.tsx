
import  "./Client.css"

import "bootstrap/dist/css/bootstrap.min.css";

import LoadingSpinner from "../spinner/LoadingSpinner";
import BodyClients from "./bodyclient/BodyClient";
import { createContext, useState } from "react";
import React from "react";

export const ClientContext = createContext({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {}
});

const Clients: React.FC = () => {
    
    const [isLoading, setIsLoading] = useState(false);

    return (<>
                {isLoading ? (<LoadingSpinner></LoadingSpinner>) : 
                            (<ClientContext.Provider value={{ isLoading, setIsLoading }}>
                                    <BodyClients></BodyClients>
                            </ClientContext.Provider>)
                }
            </>
    );
}

export default Clients;