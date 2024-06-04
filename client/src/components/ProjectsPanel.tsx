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
} from '../store';
// import addCode from '../../../server/src/models/projects';

const OrganizationsPanel: React.FC = () => {
	/* States */
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

	/* Built in Methods */
	const dispatch = useDispatch();

	/* HTTP Requests */
	/* GET Projects */

	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch('/project/allprojects', {
					// Needs endpoint
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
				console.log(result);
				dispatch(setProjects(result));
				console.log('projects:', projects);
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
			setShowInput(false);
		}
	};
	/* POST (Store Code) Project */
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
			const result = await response.json();
			setAccessCode('');
			setJoinInput(false);
		}
	};

	/* POST (Join) Project */
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
			console.log(result);
			setAccessCode('');
			setJoinInput(false);
		}
	};

	/* DELETE Project */
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

	/* LEAVE Project */
	const leaveProject = async () => {
		if (selectedProject) {
			try {
				const response = await fetch(`project/leave/${selectedProjectId}`, {
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

	/* Dropdown Logic */
	const handleChooseProject = async (
		e: React.ChangeEvent<HTMLSelectElement>
	) => {
		const selectedOption = e.target.selectedOptions[0].dataset.projectRole;
		dispatch(
			setProjectId(
				!e.target.value ? '' : e.target.selectedOptions[0].dataset.projectId
			)
		);
		console.log('projectiD: ', selectedProjectId);
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

	/* Button Logic */
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

	const handlePopperYes = (btnText: string | null) => {
		dispatch(setSelectedProject(''));
		// We will dispatch for users table and make it an empty string to clear
		if (btnText === 'delete') {
			deleteProject();
		} else if (btnText === 'leave') {
			leaveProject();
			console.log('left successfully');
		}
		setIsOpen(false);
	};

	const handleLeave = () => {
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
				<p>Choose Project</p>
				<select
					value={selectedProject}
					onChange={e => {
						handleChooseProject(e);
						handleProjectChange(e);
					}}
				>
					<option value="">-- Select a Project --</option>
					{mapProjectOptions}
				</select>
				<div className="projectButtons">
					<button onClick={handleCreate}>
						<FontAwesomeIcon icon={faHammer} />
					</button>
					<button onClick={handleJoin}>
						<FontAwesomeIcon icon={faUserPlus} />
					</button>

					<button onClick={handleLeave}>
						<FontAwesomeIcon icon={faUserMinus} />
					</button>

					{(userRole === 'Owner' || userRole === 'Admin') && (
						<button onClick={handlePopperDelete}>
							<FontAwesomeIcon icon={faTrashCan} />
						</button>
					)}
					{/* If you press create */}
					{showInput && (
						<form onSubmit={createProject}>
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
					{/* If you press join */}
					{joinInput && (
						<form onSubmit={joinProject}>
							<p>Join Project:</p>
							<input
								type="text"
								value={accessCode}
								onChange={handleCodeInputChange}
								placeholder="Enter access code"
							></input>
							<button>+</button>
						</form>
					)}
					{/* Popper for Delete */}
					{selectedProject && isOpen && (
						<div>
							<p>Delete Project:</p>
							<p>Are you sure?</p>
							<div>
								<button onClick={e => handlePopperYes('delete')}>Yes</button>
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
					{/* Popper for Leave */}
					{selectedProject && promptLeave && (
						<div>
							<p>Leave Project:</p>
							<p>Are you sure?</p>
							<div>
								<button onClick={e => handlePopperYes('leave')}>Yes</button>
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
				<div className="generateCode">
					<form onSubmit={handleGenerate}>
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
