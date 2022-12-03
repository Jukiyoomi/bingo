import {useState} from "react";

export default function useUsername() {
	const [username, setUsername] = useState<string | null>(null)

	return {username, setUsername}
}
