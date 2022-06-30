import { useFormContext } from "react-hook-form";

const FormClient: React.FC = () => {
    const { register } = useFormContext();
    return (<>
        <div>
            <label htmlFor="name">Name</label>
            <input {...register("name")} type="text" placeholder="Name" />
        </div>
        <div>
            <label htmlFor="surname">Surname</label>
            <input {...register("surname")} type="text" placeholder="Surname" />
        </div>
        <div>
            <label htmlFor="email">Email</label>
            <input {...register("email")} type="text" placeholder="Email" />
        </div>
        <div>
            <label htmlFor="tel">Phone</label>
            <input {...register("tel")} type="text" placeholder="Phone" />
        </div>
        <div>
            <label htmlFor="name">Image Url</label>
            <input {...register("imageUrl")} type="text" placeholder="https://...." />
        </div>
        </>
    );
}

export default FormClient;