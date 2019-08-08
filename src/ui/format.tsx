import * as React from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface FormatProps {
    input: string;
    type: string;
}

const Format: React.FunctionComponent<FormatProps> = ({ input, type }: FormatProps) => {
    console.log('FORMAT');
    return (
        <SyntaxHighlighter language={type} style={docco}>
            {input}
        </SyntaxHighlighter>
    );
};

export default Format;
