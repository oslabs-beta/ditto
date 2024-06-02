import * as React from 'react';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faHammer,
	faUserPlus,
	faTrash,
	faUserMinus,
} from '@fortawesome/free-solid-svg-icons';
import { setSelectedProjects } from '../store';

const OrganizationsPanel: React.FC = () => {
	/* States */
	// I'm pretty sure these states are supposed to have parameter string and return void
	const selectedProjects = useSelector((state: any) => state.selecteDatabase);

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
				<select>Choose Project</select>
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
