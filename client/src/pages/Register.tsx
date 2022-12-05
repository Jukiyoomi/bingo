import React from 'react';
import Button from "../components/Button";
import {CiUser} from "react-icons/ci";

const Register = () => {
	return (
		<div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
			<div className="mx-auto max-w-lg text-center">
				<h1 className="text-2xl font-bold sm:text-3xl">Register to the game!</h1>

				<p className="mt-4 text-gray-500">
					You will be redirected to the lobby. Please provide a username, it is required to play.
				</p>
			</div>

			<form className="mx-auto mt-8 mb-0 max-w-md space-y-4">
				<div>
					<label htmlFor="email" className="sr-only">Username</label>

					<div className="relative">
						<input
							type="email"
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
