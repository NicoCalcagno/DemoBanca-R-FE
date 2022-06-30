import { createContext, useState } from "react";
import LoadingSpinner from "../spinner/LoadingSpinner";
import BodyMovements from "./bodymovement/BodyMovements";


export const MovementContext = createContext({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {}
});


const Movements: React.FC = () => {


    const [isLoading, setIsLoading] = useState(false);
    return (<>
                {isLoading ? (<LoadingSpinner></LoadingSpinner>) : 
                            (<MovementContext.Provider value={{ isLoading, setIsLoading }}>
                                    <BodyMovements></BodyMovements>
                            </MovementContext.Provider>)
                }
            </>
    );
    
}

export default Movements;