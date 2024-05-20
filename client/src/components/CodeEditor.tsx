// CodeEditor.tsx
import React from 'react';
// import { UnControlled as CodeMirror } from '@uiw/react-codemirror';
// import 'codemirror/lib/codemirror.css';
// import 'codemirror/theme/material.css';
// import 'codemirror/mode/sql/sql';
import UnControlled from '@uiw/react-codemirror';

type CodeEditorProps = {
	initialCode: string;
	onCodeChange: (code: string) => void;
};

const CodeEditor: React.FC<CodeEditorProps> = ({
	initialCode,
	onCodeChange,
}) => {
	return (
		<UnControlled
		// value={initialCode}
		// options={{
		// 	mode: 'sql',
		// 	theme: 'material',
		// 	lineNumbers: true,
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
