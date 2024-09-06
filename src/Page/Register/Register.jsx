import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {RegisterSchema} from "../../lib/constant.js";
import {registerUser} from "../../api.js";
import {Link, useNavigate} from "react-router-dom";
import {formError} from "../../lib/utils.js";
import {userSwal} from "../../helper.js";

export default function Register() {
    const navigate = useNavigate();
    const { register,handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(RegisterSchema),
    });

    const onSubmit = (values) => {
        registerUser(values)
            .then(res => {
                userSwal(2500, "success","You registered successfully!.");
                navigate('/')
            })
            .catch(res => formError(res.response.data.errors, setError))
    }

    return <div className="bg-gray-500 p-4 mx-[30%] mt-32 flex rounded-3xl justify-center">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col basis-1/2 items-center justify-center gap-8">
            <div className="flex flex-col justify-center gap-1">
                <label>name</label>
                <input
                    {...register("name")}
                    className="p-1 border rounded-lg"
                    placeholder="Enter your name..."
                    type="text"
                />
                <small className="text-dark-error">{errors.name?.message}</small>
            </div>

            <div className="flex flex-col justify-center gap-1">
                <label>email</label>
                <input
                    {...register("email")}
                    className="p-1 border rounded-lg"
                    placeholder="Enter your email..."
                    type="email"
                />
                <small className="text-dark-error">{errors.email?.message}</small>
            </div>

            <div className="flex flex-col justify-center gap-1">
                <label>username</label>
                <input
                    {...register("username")}
                    className="p-1 border rounded-lg"
                    placeholder="Enter your username..."
                    type="text"
                />
                <small className="text-dark-error">{errors.username?.message}</small>
            </div>

            <div className="flex flex-col justify-center gap-1">
                <label>password</label>
                <input
                    {...register("password")}
                    className="p-1 border rounded-lg"
                    placeholder="Enter your password..."
                    type="text"
                />
                <small className="text-dark-error">{errors.password?.message}</small>
            </div>

            <div className="flex gap-3">
                <button className="rounded-lg w-24 p-2 bg-light-primary">Sing up</button>
                <Link to='/' className='p-2 bg-light-error w-24 rounded-lg text-center'>Back</Link>
            </div>
        </form>
    </div>
}