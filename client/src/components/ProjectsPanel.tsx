import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHammer,
	faUserPlus,
	faTrashCan,
	faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import {
	setProjects,
	setSelectedProject,
	setProjectId,
	setUserRole,
	setDatabases,
	setMigrationVersions,
	setSelectedDatabase,
	setdbId,
} from '../store';

const OrganizationsPanel: React.FC = () => {
	const userRole = useSelector((state: any) => state.userRole);
	const projects = useSelector((state: any) => state.projects);
	const selectedProject = useSelector((state: any) => state.selectedProject);
	const selectedProjectId = useSelector(
		(state: { projectId: number }) => state.projectId
	);
	const databases = useSelector((state: any) => state.databases) || [];
	const [projectName, setProjectName] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [promptLeave, setPromptLeave] = useState(false);
	const [showInput, setShowInput] = useState(false);
	const [joinInput, setJoinInput] = useState(false);
	const [accessCode, setAccessCode] = useState('');
	const token = sessionStorage.getItem('token');

	const dispatch = useDispatch();

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch('/project/allprojects', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const result = await response.json();
				dispatch(setProjects(result));
			} catch (error) {
				console.error('Error fetching projects:', error);
			}
		};
		fetchProjects();
	}, []);

	/* POST (Create) Project */
	const createProject = async () => {
		const response = await fetch('/project/create', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				project_name: projectName,
				role: 'owner',
			}),
		});
		if (response.ok) {
			const result = await response.json();
			setProjectName('');
			dispatch(setProjects(result));
			setShowInput(false);
		}
	};
	const storeCode = async (code: string) => {
		const response = await fetch('project/generate', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				code: code,
				project_id: selectedProjectId,
				role: userRole,
			}),
		});
		if (response.ok) {
			setJoinInput(false);
		}
	};

	const joinProject = async () => {
		const response = await fetch('project/join', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				code: accessCode,
			}),
		});
		if (response.ok) {
			const result = await response.json();
			setAccessCode('');
			setJoinInput(false);
		}
	};

	const deleteProject = async () => {
		if (selectedProject) {
			try {
				const response = await fetch(`project/delete/${selectedProjectId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				setIsOpen(false);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const results = await response.json();
				dispatch(setProjects(results));
			} catch (error) {
				console.error('Error deleting project:', error);
			}
		}
	};

	const leaveProject = async () => {
		if (selectedProject) {
			try {
				const response = await fetch(`/project/leave/${selectedProjectId}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				setPromptLeave(false);
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const results = await response.json();
				dispatch(setProjects(results));
			} catch (error) {
				console.error('Error deleting project:', error);
			}
		}
	};

	const handleChooseProject = async (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedOption = e.target.selectedOptions[0].dataset.projectRole;
		dispatch(
			setProjectId(
				!e.target.value ? '' : e.target.selectedOptions[0].dataset.projectId
			)
		);
		dispatch(setSelectedProject(e.target.value));
		dispatch(setUserRole(selectedOption));
	};

	const handleProjectChange = async (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		try {
			const response = await fetch(
				`/db/connectionStrings/${e.target.selectedOptions[0].dataset.projectId}`,
				{
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();
			dispatch(setDatabases(result));
			dispatch(setMigrationVersions([]));
			dispatch(setSelectedDatabase(''));
			dispatch(setdbId(''));
		} catch (error) {
			console.error('Error fetching databases:', error);
		}
	};

	const mapProjectOptions = projects.map(
		(project: {
			project_id: string;
			project_name: string;
			role: string | undefined;
		}) => (
			<option
				key={project.project_id}
				value={project.project_name}
				data-project-role={project.role}
				data-project-id={project.project_id}
			>
				{project.project_name}
			</option>
		)
	);

	const handleCreate = () => {
		setIsOpen(false);
		setPromptLeave(false);
		setJoinInput(false);
		setShowInput(showInput ? false : true);
	};

	const handleProjectNameInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		setProjectName(e.target.value);
	};

	const handleJoin = () => {
		setIsOpen(false);
		setPromptLeave(false);
		setShowInput(false);
		setJoinInput(joinInput ? false : true);
	};

	const handlePopperDelete = () => {
		setPromptLeave(false);
		setShowInput(false);
		setJoinInput(false);
		if (selectedProject && !isOpen) setIsOpen(true);
		else if (selectedProject && isOpen) setIsOpen(false);
	};

	const handlePopperYes = () => {
		dispatch(setSelectedProject(''));
		deleteProject();
		setIsOpen(false);
	};

	const handleLeave = async () => {
		setIsOpen(false);
		setShowInput(false);
		setJoinInput(false);
		if (selectedProject && !promptLeave) setPromptLeave(true);
		else if (selectedProject && promptLeave) setPromptLeave(false);
	};

	const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const code = Math.random().toString(36).substring(7);
		setAccessCode(code);
		await storeCode(code);
	};

	const handleCodeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAccessCode(e.target.value);
		console.log(accessCode);
	};

	return (
		<div className="projectsPanel">
			<div className="chooseProject">
				<p className="font-bold">Project</p>
				<select
					value={selectedProject}
					onChange={e => {
						handleChooseProject(e);
						handleProjectChange(e);
					}}
				>
					<option value="">Select</option>
					{mapProjectOptions}
				</select>
				<div className="projectButtons">
					<button onClick={handleCreate} title="Create Project">
						<FontAwesomeIcon icon={faHammer} />
					</button>

					<button onClick={handleJoin} title="Join Project">
						<FontAwesomeIcon icon={faUserPlus} />
					</button>

					<button onClick={handleLeave} title="Leave Project">
						<FontAwesomeIcon icon={faUserMinus} />
					</button>

					{(userRole === 'Owner' || userRole === 'Admin') && (
						<button onClick={handlePopperDelete} title="Delete Project">
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					)}
					{showInput && (
						<form
							onSubmit={e => {
								e.preventDefault();
								if (projectName) createProject();
							}}
						>
							<p>Create Project:</p>
							<input
								type="text"
								value={projectName}
								onChange={handleProjectNameInputChange}
								placeholder="Enter project name"
							/>
							<button>+</button>
						</form>
					)}
					{joinInput && (
						<form onSubmit={joinProject}>
							<p>Join Project:</p>
							<input
								type="text"
								onChange={handleCodeInputChange}
								placeholder="Enter access code"
							></input>
							<button>+</button>
						</form>
					)}
					{selectedProject && isOpen && (
						<div>
							<p>Delete Project:</p>
							<p>Are you sure?</p>
							<div>
								<button onClick={e => handlePopperYes()}>Yes</button>
								<button
									onClick={() => {
										setIsOpen(false);
									}}
								>
									No
								</button>
							</div>
						</div>
					)}
					{selectedProject && promptLeave && (
						<div>
							<p>Leave Project:</p>
							<p>Are you sure?</p>
							<div>
								<button
									onClick={() => {
										handlePopperYes();
										leaveProject();
									}}
								>
									Yes
								</button>
								<button
									onClick={() => {
										setPromptLeave(false);
									}}
								>
									No
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
			{(userRole === 'Owner' || userRole === 'Admin') && (
				<div className="generateCode" title="Generate Access Code">
					<form
						onSubmit={e => {
							e.preventDefault();
							handleGenerate(e);
						}}
					>
						<input
							type="text"
							value={accessCode}
							onChange={handleCodeInputChange}
							placeholder="access code"
						/>
						<button>Generate Code</button>
					</form>
				</div>
			)}
		</div>
	);
};

export default OrganizationsPanel;
