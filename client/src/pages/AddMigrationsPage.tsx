// popup foir migration, it will include version, description and the script.
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

interface FormData {
	version: string;
	description: string;
	// executed_At: string;
	script: string;
}

// interface FormProps {
// 	onSubmit: (data: FormData) => void;
// }

const AddMigrationsPage: React.FC = () => {
	const [version, setVersion] = useState('');
	const [description, setDescription] = useState('');
	const [script, setScript] = useState('');
	const dbId = useSelector((state: any) => state.dbId);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const token = sessionStorage.getItem('token');
			const response = await fetch(`/migrationlog/:${dbId}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					version,
					script,
					description,
				}), // Will need to include executed_At
			});
		} catch (error) {
			console.error('Error posting new migration version', error);
		}
	};

	return (
		<div className="addMigrationsPage">
			<h1>Add Migrations</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>
						Version:
						<input
							type="text"
							value={version}
							onChange={e => setVersion(e.target.value)}
							required
						/>
					</label>
				</div>
				<div>
					<label>
						Description:
						<input
							type="text"
							value={description}
							onChange={e => setDescription(e.target.value)}
							required
						/>
					</label>
				</div>
				<div>
					<label>
						Script:
						<textarea
							value={script}
							onChange={e => setScript(e.target.value)}
							required
						/>
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
};

export default AddMigrationsPage;
