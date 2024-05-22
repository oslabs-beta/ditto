// CodeEditor.tsx
import React from 'react';
// import { UnControlled as CodeMirror } from '@uiw/react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import 'codemirror/mode/sql/sql';
import UnControlled from '@uiw/react-codemirror';

interface Uncontrolled {
	value: string;
	options: {
		mode: string;
		theme: string;
		lineNumbers: boolean;
		readOnly: boolean;
	};
}

type CodeEditorProps = {
	initialCode: string;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ initialCode }) => {
	return (
		<UnControlled
			value={initialCode}
			readOnly={true}
			// options={{
			// 	mode: 'sql',
			// 	theme: 'material',
			// 	lineNumbers: true,
			// 	readOnly: true,
			// }}
			// onChange={(
			// 	editor: CodeMirror.Editor,
			// 	data: CodeMirror.EditorChange,
			// 	value: string
			// ) => {
			// 	onCodeChange(value);
			// }}
		/>
	);
};

export default CodeEditor;
