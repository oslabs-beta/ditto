import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHammer,
	faUserPlus,
	faTrash,
	faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { setProjects, setSelectedProject, setProjectId } from '../store';

const OrganizationsPanel: React.FC = () => {
	/* States */
	const projects = useSelector((state: any) => state.projects);
	const selectedProject = useSelector((state: any) => state.selectedProject);
	const [isOpen, setIsOpen] = useState(false);
	const token = sessionStorage.getItem('token');

	/* Built in Methods */
	const dispatch = useDispatch();

	/* HTTP Requests */
	/* GET Projects */
	useEffect(() => {
		const fetchProjects = async () => {
			try {
				const response = await fetch('', {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				});
				if (!response.ok) {
					throw new Error(`HTTP error! status: ${response.status}`);
				}
				const results = await response.json();
				dispatch(setProjects(results));
			} catch (error) {
				console.error('Error fetching projects:', error);
			}
		};
		fetchProjects;
	}, []);

	/* DELETE Project */
	const deleteProject = async () => {
		if (selectedProject) {
		}
	};

	/* Dropdown Logic */
	const handleChooseProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(
			setProjectId(
				!e.target.value ? '' : e.target.selectedOptions[0].dataset.projectId
			)
		);
		dispatch(setSelectedProject(e.target.value));
	};

	const mapProjectOptions = projects.map(
		(project: { project_id: string; project_name: string }) => {
			<option
				key={project.project_id}
				value={project.project_name}
				data-project-id={project.project_id}
			>
				{project.project_name}
			</option>;
		}
	);

	/* Button Logic */
	const handleCreate = () => {};

	const handleJoin = () => {};

	const handleDelete = () => {
		if (selectedProject && !isOpen) setIsOpen(true);
		else if (selectedProject && isOpen) setIsOpen(false);
	};

	const handlePopperYes = () => {
		dispatch(setSelectedProject(''));
		// dispatch(setSelectedUsers(''));
		// handleButtonClick('deletedb');
		setIsOpen(false);
	};

	const handleLeave = () => {};

	const handleGenerate = () => {};

	return (
		<div className="projectsPanel">
			<div className="chooseProject">
				<p>Choose Project</p>
				<select value={selectedProject} onChange={handleChooseProject}>
					<option>-- Select a Project --</option>
					{mapProjectOptions}
				</select>
				<div className="projectButtons">
					<button onClick={handleCreate}>
						<FontAwesomeIcon icon={faHammer} />
					</button>
					<button onClick={handleJoin}>
						<FontAwesomeIcon icon={faUserPlus} />
					</button>
					{/* Conditional if Owner, Admin, User determines what button renders */}
					<button onClick={handleDelete}>
						<FontAwesomeIcon icon={faTrash} />
					</button>
					{selectedProject && isOpen && (
						<div className="popper">
							<p>Are you sure?</p>
							<div className="popperbtns">
								<button className="whitebtn" onClick={handlePopperYes}>
									Yes
								</button>
								<button
									className="whitebtn"
									onClick={() => {
										setIsOpen(false);
									}}
								>
									No
								</button>
							</div>
						</div>
					)}
					<button onClick={handleLeave}>
						<FontAwesomeIcon icon={faUserMinus} />
					</button>
				</div>
			</div>
			<div className="generateCode">
				<button onClick={handleGenerate}>Generate Access Code</button>
				<input></input>
			</div>
		</div>
	);
};

export default OrganizationsPanel;
