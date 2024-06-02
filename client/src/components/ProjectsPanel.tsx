import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHammer,
	faUserPlus,
	faTrash,
	faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { setProjects, setSelectedProjects } from '../store';

const OrganizationsPanel: React.FC = () => {
	/* States */
	const projects = useSelector((state: any) => state.projects);
	const selectedProjects = useSelector((state: any) => state.selecteProjects);

	/* Built in Methods */
	const dispatch = useDispatch();

	/* Dropdown Logic */
	const handleChooseProject = (e: React.ChangeEvent<HTMLSelectElement>) => {
		dispatch(setSelectedProjects(''));
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
	const handleDelete = () => {};
	const handleLeave = () => {};
	const handleGenerate = () => {};

	return (
		<div className="projectsPanel">
			<div className="chooseProject">
				<p>Choose Project</p>
				<select value={selectedProjects} onChange={handleChooseProject}>
					<option>-- Select a Project --</option>
					{/* Will map our options for projects based on user */}
					{/* {projects.map((project: string) => {
						<option>project</option>;
					})} */}
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
