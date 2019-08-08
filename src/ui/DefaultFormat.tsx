import * as React from 'react';

interface DefaultFormatProps {
    input: string;
}
const DefaultFormat: React.FunctionComponent<DefaultFormatProps> = ({ input }: DefaultFormatProps) => {
    return <span>{input}</span>;
};

export default DefaultFormat;
