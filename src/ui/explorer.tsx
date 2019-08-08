import * as React from 'react';
import styles from './App.scss';
import { FaFolder } from 'react-icons/fa';
import { isDir } from '../ui/usables/isDir';
import * as fs from 'fs';

interface ExplorerProps {
    location: string;
    setLocation: Function;
    presentDir: string;
    setPresentDir: Function;
    setToOpen: Function;
}

const explorer: React.FunctionComponent<ExplorerProps> = ({
    location,
    setLocation,
    presentDir,
    setPresentDir,
    setToOpen,
}: ExplorerProps) => {
    
    console.log('Explorer');
    const getFiles = (location: string): string[] => {
        const files = fs.readdirSync(location);
        return files;
    };

    const analyse = (location: string): { name: string; type: string } => {
        if (isDir({ dir: presentDir, file: location })) {
            return { name: location, type: 'folder' };
        }
        return { name: location, type: 'file' };
    };

    const takeTo = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
        let file = e.currentTarget.getAttribute('data-file');
        let fullDir = presentDir;
        if (isDir({ dir: presentDir, file: file })) {
            fullDir = `${presentDir}\\${file}`;
            setPresentDir(fullDir);
        } else {
            setToOpen(`${presentDir}\\${file}`);
        }
        setLocation(fullDir);
    };

    const getIcon = (type: string) => {
        if (type === 'folder') {
            return <FaFolder />;
        } else {
            return false;
        }
    };

    return (
        <div className={styles.explorer}>
            <div className={styles.list}>
                {getFiles(location).map((file, index) => (
                    <div key={index} className={styles.item}>
                        <a present-dir={presentDir} data-file={file} onClick={takeTo}>
                            <span className={styles.icon}>
                                {getIcon(analyse(file).type)} {analyse(file).name}
                            </span>
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default explorer;
