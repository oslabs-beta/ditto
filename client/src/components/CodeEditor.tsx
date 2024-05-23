import React from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { sql } from '@codemirror/lang-sql';

type CodeEditorProps = {
	initialCode: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode }) => {
	return (
		<CodeMirror
			value={initialCode}
			readOnly={true}
			theme="dark"
			extensions={[sql({})]}

			// onChange={(
			// 	editor,
			// 	data,
			// 	value
			// ) => {
			// 	onCodeChange(value);
			// }}
		/>
	);
};

export default CodeEditor;
