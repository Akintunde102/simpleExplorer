import * as React from 'react';
import ReactPanZoom from 'react-image-pan-zoom-rotate';
import SyntaxHighlighter from 'react-syntax-highlighter';
import FileViewer from 'react-file-viewer';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './App.scss';
import { defaults } from './conf';

interface FormatProps {
    input: string;
    type: string;
    fullPath: string;
}

const Format: React.FunctionComponent<FormatProps> = ({ input, type, fullPath }: FormatProps) => {
    console.log('FORMAT');

    const ext = fullPath.split('.')[fullPath.split('.').length - 1];

    const fileTitle = <div className={styles.viewTitle}>{fullPath === defaults.ViewFile ? '' : fullPath}</div>;

    let output;

    if (defaults.FileViewerExt.includes(ext)) {
        output = <FileViewer fileType={ext} filePath={fullPath} />;
    } else {
        output =
            input === '' ? (
                <ReactPanZoom image={fullPath} alt={fullPath.split('.')[fullPath.split('.').length - 2]} />
            ) : (
                <SyntaxHighlighter language={type} style={vs2015}>
                    {input}
                </SyntaxHighlighter>
            );
    }

    return (
        <div>
            {fileTitle}
            {output}
        </div>
    );
};

export default Format;
