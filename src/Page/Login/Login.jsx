import {useForm} from "react-hook-form";
import {LoginForm} from "../../lib/constant.js";
import {yupResolver} from "@hookform/resolvers/yup";
import {Link} from "react-router-dom";


export default function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(LoginForm),
    });

    console.log(errors)
    const submitUser = (values) => {
        console.log(values)
    }

    return (
        <div className="bg-light-primary p-4 mx-[30%] mt-32 flex rounded-3xl">
            <img src="./Login.jpg" alt="LoginImage" className="size-[50%] rounded-xl basis-1/2"/>
            <form onSubmit={handleSubmit(submitUser)} className="flex flex-col basis-1/2 items-center justify-center gap-8">
                <div className="flex flex-col justify-center gap-1">
                    <label className="text-light-base-100">Username</label>
                    <input
                        {...register("email")}
                        className="border rounded-lg p-1"
                        placeholder="Enter your email"
                        type="email"
                    />
                    <small className="text-light-error">{errors.email?.message}</small>
                </div>

                <div className="flex flex-col justify-center gap-1">
                    <label className="text-light-base-100">Password</label>
                    <input
                        {...register("password")}
                        className="border rounded-lg p-1"
                        placeholder="Enter your password"
                        type="text"
                    />
                    <small className="text-light-error">{errors.password?.message}</small>
                </div>

                <div className="flex gap-4">
                    <button className="rounded-lg w-24 p-2 bg-light-base-100">Sing in</button>
                    <Link className="rounded-lg w-24 p-2 bg-light-error text-center" to="">Sing up</Link>
                </div>
            </form>
        </div>
    );
}