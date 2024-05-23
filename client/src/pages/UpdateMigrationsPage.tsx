// popup foir migration, it will include version, description and the script.
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setdbId, setSelectedMigration, setSelectedScript } from '../store';

interface FormData {
	version: string;
	description: string;
	// executed_At: string;
	script: string;
}

const UpdateMigrationsPage: React.FC = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [version, setVersion] = useState('');
	const [description, setDescription] = useState('');
	const [script, setScript] = useState('');
	const migrationId = useSelector((state: any) => state.selectedMigration);
	const selectedScript = useSelector(
		(state: { selectedScript: string }) => state.selectedScript
	);

	useEffect(() => {
		const getMigrationLog = async () => {
			const token = sessionStorage.getItem('token');
			console.log(migrationId);
			const response = await fetch(`/migrationlog/${migrationId}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
			});
			const log = await response.json();
			setVersion(log.version);
			setDescription(log.description);
			setScript(log.script);
		};
		getMigrationLog();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const token = sessionStorage.getItem('token');
			const response = await fetch(`/migrationlog/${migrationId}`, {
				method: 'PATCH',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify({
					version,
					script,
					description,
				}),
			});
			dispatch(setSelectedScript(script));
			navigate('/migration');
		} catch (error) {
			console.error('Error posting new migration version', error);
		}
	};

	return (
		<div className="updateMigrationsPage">
			<h1>Update Migrations</h1>
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
				<button type="submit">Update</button>
			</form>
		</div>
	);
};

export default UpdateMigrationsPage;
