import Layout from "../../layout/layout";
import styles from "../../styles/Create.module.css";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { useEffect, useRef, useState } from "react";
import {
	Tabs,
	TabList,
	TabPanels,
	Tab,
	TabPanel,
	FormControl,
	FormLabel,
	FormErrorMessage,
	FormHelperText,
	Input,
	Button,
	Stack,
	Tag,
	TagLabel,
	TagCloseButton,
	useDisclosure,
} from "@chakra-ui/react";

export default function create() {
	const wrapperRef = useRef(null);
	const [fileList, setFileList] = useState([]);
	const [shareWith, setShareWith] = useState([]);
	const { isOpen, onToggle } = useDisclosure();
	const [tabIndex, setTabIndex] = useState(0);
	const [fileName, setFileName] = useState("");

	function handleNextTab() {
		setTabIndex(1);
	}

	function handleKeyDown(e) {
		const inputValue = e.target.value;
		if (e.key === "Enter" && inputValue) {
			setShareWith([...shareWith, inputValue]);
			e.target.value = "";
		}
	}

	function removeTag(tagToRemove) {
		setShareWith(shareWith.filter((email) => email !== tagToRemove));
	}

	function onDragEnter() {
		return wrapperRef.current.classList.add("dragover");
	}

	function onDragLeave() {
		return wrapperRef.current.classList.remove("dragover");
	}

	function onDrop() {
		return wrapperRef.current.classList.remove("dragover");
	}

	function onFileDrop(e) {
		const newFile = e.target.files[0];
		if (newFile) {
			const updatedList = [...fileList, newFile];
			setFileList(updatedList);
		}
	}

	function fileRemove(item) {
		const updatedList = [...fileList];
		updatedList.splice(fileList.indexOf(item), 1);
		setFileList(updatedList);
	}

	function handleSubmit() {
		console.log("submit");
	}

	useEffect(() => {
		console.log(fileList);
	}, [fileList]);

	return (
		<Layout>
			<div className={styles.container}>
				<div className={styles.tabHoldler}>
					<Tabs
						index={tabIndex}
						onChange={setTabIndex}
						variant="soft-rounded"
						colorScheme="brand"
						size="lg"
						align="center"
						isFitted
					>
						<TabList>
							<Tab>Enter Details</Tab>
							<Tab>Upload Files</Tab>
						</TabList>
						<TabPanels>
							<TabPanel>
								<div className={styles.formHolder}>
									<FormControl isRequired color="white">
										<FormLabel>File Name</FormLabel>
										<Input
											placeholder="Enter the name of the file"
											size="lg"
											type="name"
											value={fileName}
											onChange={(e) =>
												setFileName(e.target.value)
											}
										/>
									</FormControl>
									<FormControl isRequired color="white">
										<FormLabel>Share with</FormLabel>
										<Input
											type="text"
											placeholder="Add username of the people to share with"
											size="lg"
											onKeyDown={handleKeyDown}
										/>
									</FormControl>
									{shareWith.length > 0 && (
										<div className={styles.emailsHolder}>
											{shareWith.map((email) => (
												<Tag
													key={email}
													size="lg"
													borderRadius="full"
													variant="solid"
													bg="brand.100"
												>
													<TagLabel>{email}</TagLabel>
													<TagCloseButton
														onClick={() => {
															removeTag(email);
														}}
													/>
												</Tag>
											))}
										</div>
									)}
									<Button
										color="white"
										bg="brand.100"
										size="lg"
										onClick={handleNextTab}
									>
										Continue
									</Button>
								</div>
							</TabPanel>
							<TabPanel>
								<div className={styles.dndBox}>
									<div
										ref={wrapperRef}
										className={styles.dndContainer}
										onDragEnter={onDragEnter}
										onDragLeave={onDragLeave}
										onDrop={onDrop}
									>
										<div className={styles.dndLabel}>
											<AiOutlineCloudUpload size={120} />
											<p>Drag & Drop your files here</p>
										</div>
										<input
											className={styles.dndInput}
											type="file"
											value=""
											onChange={onFileDrop}
										/>
									</div>
									{fileList.length > 0 && (
										<div className={styles.previewFiles}>
											{fileList.map((item, index) => (
												<div
													key={index}
													className={styles.filebox}
												>
													<p>{item.name}</p>
													<p>{item.size}B</p>
													<div
														className={
															styles.cancelHolder
														}
													>
														<RxCross1
															onClick={() =>
																fileRemove(item)
															}
															size={20}
														/>
													</div>
												</div>
											))}
											<div
												className={
													styles.buttonContainer
												}
											>
												<Button
													color="white"
													bg="brand.100"
													size="lg"
													onClick={handleSubmit}
												>
													Share Files
												</Button>
											</div>
										</div>
									)}
								</div>
							</TabPanel>
						</TabPanels>
					</Tabs>
				</div>
			</div>
		</Layout>
	);
}
