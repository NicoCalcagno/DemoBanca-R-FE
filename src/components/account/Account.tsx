import { createContext,  useState } from "react";

import LoadingSpinner from "../spinner/LoadingSpinner";
import BodyAccounts from "./bodyaccount/BodyAccount";

export const AccountContext = createContext({
    isLoading: false,
    setIsLoading: (isLoading: boolean) => {}
});


const Accounts: React.FC = () => {


    const [isLoading, setIsLoading] = useState(false);
    return (<>
                {isLoading ? (<LoadingSpinner></LoadingSpinner>) : 
                            (<AccountContext.Provider value={{ isLoading, setIsLoading }}>
                                    <BodyAccounts></BodyAccounts>
                            </AccountContext.Provider>)
                }
            </>
    );
}

export default Accounts;