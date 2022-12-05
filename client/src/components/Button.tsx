import React from 'react';

interface IButton {
	children: React.ReactNode,
	className?: string,
	type: "submit" | undefined,
	onClick?: React.MouseEventHandler<HTMLButtonElement>
}

const Button = ({children, className, type, onClick}: IButton) => {
	return (
		<button
			type={type}
			className={`ml-3 inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white ${className}`}
			onClick={onClick}
		>
			{children}
		</button>
	);
};

export default Button;
