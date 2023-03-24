import styles from "../styles/Sidebar.module.css";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAuth } from "@polybase/react";

import { Button } from "@chakra-ui/react";

export default function Sidebar() {
	const router = useRouter();
	const path = router.asPath.split("/").pop();
	const { auth, state } = useAuth();

	async function handleLogout() {
		await auth.signOut();
		router.push("/");
	}

	return (
		<div className={styles.container}>
			<div>
				<div className={styles.title}>FileShare.io</div>
				<div className={styles.linkContainer}>
					<div className={styles.dashboardTitleHolder}>
						<h1 className={styles.dashboardTitle}>Dashboard</h1>
					</div>
					<div className={styles.linksBox}>
						<div className={styles.bar}>.</div>
						<div className={styles.linkHolder}>
							<Link href="/dashboard/myFiles">
								<div
									className={
										path === "myFiles"
											? styles.selectedLink
											: styles.link
									}
								>
									My Files
								</div>
							</Link>
							<Link href="/dashboard/sharedFiles">
								<div
									className={
										path === "sharedFiles"
											? styles.selectedLink
											: styles.link
									}
								>
									Shared with me
								</div>
							</Link>
							<Link href="/dashboard/create">
								<div
									className={
										path === "create"
											? styles.selectedLink
											: styles.link
									}
								>
									Add new files
								</div>
							</Link>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.profileContainer}>
				<div className={styles.profile}>
					<div className={styles.profileIcon}></div>
					<div className={styles.profileName}>@username</div>
				</div>
				<div className={styles.logout}>
					<Button
						onClick={handleLogout}
						color="white"
						bg="brand.100"
						size="lg"
					>
						Logout
					</Button>
				</div>
			</div>
		</div>
	);
}
