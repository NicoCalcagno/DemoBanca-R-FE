import { useFormContext } from "react-hook-form";
import { Client } from "../../../InterfaceData";

const FormAccount: React.FC<Client[]> = (clients) => {
    const { register } = useFormContext();
    return (<>
        <div>
            <label htmlFor="balance">Amount</label>
            <input {...register("balance")} type="number" placeholder="Balance" />
        </div>
        <div>
            <label htmlFor="clientId">Select client</label><br />
            <select {...register("clientId")}>
                {clients.map((client) => {
                    return <option value={client.clientId}>{client.clientId}-{client.name} {client.surname}</option>;
                })}
            </select>
        </div>
        </>
    );
}

export default FormAccount;