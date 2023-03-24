import styles from "../styles/Navbar.module.css";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import getUsernameFromAddress from "../utils/getUsernameFromAddress";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useAuth } from "@polybase/react";
import { Button } from "@chakra-ui/react";

export default function Navbar() {
	const address = useAddress();
	const router = useRouter();
	const [userName, setUserName] = useState(null);
	const { auth } = useAuth();
	const [publicKey, setPublicKey] = useState(null);

	async function signIn() {
		const response = await auth.signIn();
		console.log(response);
		setPublicKey(response.publicKey);
	}

	
	if (!publicKey) {
		return (
			<div className={styles.container}>
				<div className={styles.profile}></div>
				<div className={styles.wallet}>
					<Button
						color="white"
						bg="brand.100"
						size="lg"
						onClick={signIn}
					>
						Login
					</Button>
				</div>
			</div>
		);
	} else {
		router.push("/dashboard/myFiles");
	}
}
