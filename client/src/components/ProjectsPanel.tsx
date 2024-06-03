import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHammer,
	faUserPlus,
	faTrash,
	faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import {
	setProjects,
	setSelectedProject,
	setProjectId,
	setUserRole,
} from '../store';

const OrganizationsPanel: React.FC = () => {
	/* States */
	const userRole = useSelector((state: any) => state.userRole);
	const projects = useSelector((state: any) => state.projects);
	const selectedProject = useSelector((state: any) => state.selectedProject);
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

	/* POST (Join) Project */
	const joinProject = async () => {
		const response = await fetch('', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				project_name: projectName,
			}),
		});
		if (response.ok) {
			const result = await response.json();
			setAccessCode('');
			setJoinInput(false);
		}
	};

	/* DELETE Project */
	const deleteProject = async () => {
		if (selectedProject) {
			try {
				const response = await fetch('', {
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
				const response = await fetch('', {
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
	const handleChooseProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
		console.log(projects);
		const selectedOption = e.target.selectedOptions[0].dataset.projectRole;
		console.log('selectedOption: ', selectedOption);
		dispatch(
			setProjectId(
				!e.target.value ? '' : e.target.selectedOptions[0].dataset.projectId
			)
		);
		dispatch(setSelectedProject(e.target.value));
		dispatch(setUserRole(selectedOption));
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

	const handledbNameInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
		// We will dispatch for users table and make it an empty string to clear
		deleteProject();
		setIsOpen(false);
	};

	const handleLeave = () => {
		setIsOpen(false);
		setShowInput(false);
		setJoinInput(false);
		if (selectedProject && !promptLeave) setPromptLeave(true);
		else if (selectedProject && promptLeave) setPromptLeave(false);
	};

	const handleGenerate = () => {
		const accessCode = Math.random().toString(36).substring(7);
		setAccessCode(accessCode);
	};

	return (
		<div className="projectsPanel">
			<div className="chooseProject">
				<p>Choose Project</p>
				<select value={selectedProject} onChange={handleChooseProject}>
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

					{(userRole === 'owner' || userRole === 'admin') && (
						<button onClick={handlePopperDelete}>
							<FontAwesomeIcon icon={faTrash} />
						</button>
					)}
					{(userRole === 'owner' || userRole === 'admin') && (
						<button onClick={handleLeave}>
							<FontAwesomeIcon icon={faUserMinus} />
						</button>
					)}
					{/* If you press create */}
					{showInput && (
						<form onSubmit={createProject}>
							<p>Create Project:</p>
							<input
								type="text"
								value={projectName}
								onChange={handledbNameInputChange}
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
								value={projectName}
								onChange={handledbNameInputChange}
								placeholder="Enter project name"
							/>
							<input
								type="text"
								value={accessCode}
								onChange={handledbNameInputChange}
								placeholder="Enter access code"
							/>
							<button>+</button>
						</form>
					)}
					{/* Popper for Delete */}
					{selectedProject && isOpen && (
						<div>
							<p>Delete Project:</p>
							<p>Are you sure?</p>
							<div>
								<button onClick={handlePopperYes}>Yes</button>
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
								<button onClick={handlePopperYes}>Yes</button>
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
			{(userRole === 'owner' || userRole === 'admin') && (
				<div className="generateCode">
					<button onClick={handleGenerate}>Generate Access Code</button>
					<input type="text" value={accessCode} />
				</div>
			)}
		</div>
	);
};

export default OrganizationsPanel;
