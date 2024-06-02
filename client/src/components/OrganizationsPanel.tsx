import * as React from 'react';

const OrganizationsPanel: React.FC = () => {
	const handleCreate = () => {};
	const handleJoin = () => {};
	const handleDelete = () => {};
	const handleLeave = () => {};
	const handleGenerate = () => {};
	return (
		<div className="organizationsPanel">
			{/* I want icons here eventually */}
			<div className="chooseProject">
				<button onClick={handleCreate}>Create</button>
				<button onClick={handleJoin}>Join</button>
				<button onClick={handleDelete}>Delete</button>
				<button onClick={handleLeave}>Leave</button>
				<select>Choose Organization</select>
			</div>
			<div className="generateCode">
				<button onClick={handleGenerate}>Generate Access Code</button>
				<input></input>
			</div>
		</div>
	);
};

export default OrganizationsPanel;
