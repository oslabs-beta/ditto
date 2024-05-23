import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setScript } from '../store';

type CodeEditorProps = {
	code: string;
	inMigration: boolean;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ code, inMigration }) => {
	const dispatch = useDispatch();
	const selectedScript = useSelector(
		(state: { selectedScript: string }) => state.selectedScript
	);
	const script = useSelector((state: any) => state.script);

	useEffect(() => {
		dispatch(setScript(code));
	}, [selectedScript]);

	const handleChange = (value: string) => {
		dispatch(setScript(value));
	};

	return (
		<CodeMirror
			value={script}
			readOnly={inMigration}
			theme="dark"
			extensions={[sql({})]}
			onChange={handleChange}
		/>
	);
};

export default CodeEditor;
