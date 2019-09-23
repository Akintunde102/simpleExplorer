import * as React from 'react';
import ReactPanZoom from 'react-image-pan-zoom-rotate';
import SyntaxHighlighter from 'react-syntax-highlighter';
import FileViewer from 'react-file-viewer';
import ICO from 'icojs';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import styles from './App.scss';
import fs from 'fs';
import { defaults } from './conf';
import { asyncReactor } from 'async-reactor';

interface FormatProps {
    input: string;
    type: string;
    fullPath: string;
}

function Loader() {
    return <h2>Loading ...</h2>;
}

async function asyncFormat({ input, type, fullPath }: FormatProps) {
    console.log('FORMAT');

    const ext = fullPath.split('.')[fullPath.split('.').length - 1];

    const fileTitle = <div className={styles.viewTitle}>{fullPath === defaults.ViewFile ? '' : fullPath}</div>;

    let output;

    if (defaults.FileViewerExt.includes(ext)) {
        output = <FileViewer fileType={ext} filePath={fullPath} />;
    } else if (defaults.ICOjs.includes(ext)) {
        const buffer = fs.readFileSync(fullPath);
        const [image] = await ICO.parse(buffer, 'image/png');
        const file = `${image.width}x${image.height}-${image.bpp}bit.png`;
        const data = Buffer.from(image.buffer);
        fs.writeFileSync(file, data);
        output = <ReactPanZoom image={file} alt={file.split('.')[file.split('.').length - 2]} />;
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
}

export default asyncReactor(asyncFormat, Loader);
