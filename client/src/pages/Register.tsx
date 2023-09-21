import React, {FormEvent, MutableRefObject, useRef} from 'react';
import Button from "../components/Button";
import {CiUser} from "react-icons/ci";
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";
import useUsernameStore from "../../store/user";

const Register = () => {
	const usernameRef = useRef() as MutableRefObject<HTMLInputElement>
	const setUsername = useUsernameStore((state) => state.setUsername)
	const navigate = useNavigate()

	const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		toast.dismiss()
		if (!usernameRef.current.value) {
			toast.error("Please provide a username")
			return
		}
		setUsername(usernameRef.current.value)
		navigate("/game")
	}

	return (
		<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">Register to the game!</h1>

				<p className="mt-4 text-gray-500">
					You will be redirected to the lobby. Please provide a username, it is required to play.
				</p>
			</div>

			<form className="mx-auto mt-8 mb-0 max-w-md space-y-4" onSubmit={handleSubmit}>
				<div>
					<label htmlFor="username" className="sr-only">Username</label>

					<div className="relative">
						<input
							id="username"
							name="username"
							type="text"
							ref={usernameRef}
							className="w-full rounded-lg border-gray-200 p-4 pr-12 text-sm shadow-sm"
							placeholder="Username"
						/>

						<span className="absolute inset-y-0 right-4 inline-flex items-center">
							<CiUser/>
        				</span>
					</div>
				</div>

				<div className="flex items-center justify-end">
					<Button type="submit">
						Register
					</Button>
				</div>
			</form>
		</div>
	);
};

export default Register;
