import React from 'react';
import ReactMarkdown from 'react-markdown';
import DefaultFormat from './DefaultFormat';

interface FormatProps {
    input: string;
    type: string;
}

const Format: React.FunctionComponent<FormatProps> = ({ input, type }: FormatProps) => {
    let formatted = <DefaultFormat input={input} />;
    if (type === 'md') {
        formatted = <ReactMarkdown source={input} />;
    }
    return formatted;
};

export default Format;
