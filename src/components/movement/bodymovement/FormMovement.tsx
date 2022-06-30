import { useFormContext } from "react-hook-form";
import { Account } from "../../../InterfaceData";

const FormMovement: React.FC<Account[]> = (accounts) => {
    const { register } = useFormContext();
    return (<>
        
        <div>
                                <label htmlFor="type">Type</label>
                                <input {...register("type")} type="text" placeholder="Prelievo o Deposito" />
                            </div>
                            <div>
                                <label htmlFor="amount">Amount</label>
                                <input {...register("amount")} type="number" placeholder="Amount" />
                            </div>
                            <div>
                                <label htmlFor="accountId">Select account</label><br />
                                <select {...register("accountId")}>
                                    {accounts.map((account) => {
                                        return <option value={account.accountId}>{account.accountId}</option>;
                                    })}
                                </select>
                            </div>
        </>
    );
}

export default FormMovement;