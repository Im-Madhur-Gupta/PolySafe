import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "../styles/Register.module.css";


export default function register() {
    const router = useRouter();

	const [username, setUsername] = useState("");

    function proceed(){
		// add user to database
		axios.post('/api/register', {
			username: username,
			address: "0x1234567890" // TODO: get address from metamask
		})
			.then((res) => {
				console.log(res);
			})
			.catch((err) => {
				console.log(err);
			})

        router.push('/dashboard/myFiles');
    }

	return (
		<div className={styles.container}>
			<div className={styles.registerBox}>
				<div className={styles.title}>Enter your Username</div>
				<input
                    className={styles.input}
                    type="text" 
                    placeholder="for example: @username"
					value={username}
					onChange={(e) => setUsername(e.target.value)}
                />
				<div className={styles.btnBox}>
					<button onClick={proceed} className={styles.proceed}>Proceed</button>
					<div className={styles.back}>
						<Link href="/">Go back</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
