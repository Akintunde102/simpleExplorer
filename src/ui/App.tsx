import React, { useState } from 'react';
import Explorer from './explorer';
import styles from './App.scss';
import { FaArrowLeft } from 'react-icons/fa';
import fs from 'fs';
import util from 'util';
import ReSlash from './ReSlash';
import Format from './Format';

const readFile = util.promisify(fs.readFile);

const App = () => {
    const [location, setLocation] = useState(process.cwd());
    const [presentDir, setPresentDir] = useState(process.cwd());
    const [toOpen, setToOpen] = useState('C:\\Users\\akintunde\\museeks\\src\\ui\\usables\\defaultOpen.html');
    const [openedFile, setOpenedFile] = useState({ input: '', type: '' });

    const pourFile = (filePath: string): void => {
        console.log(filePath);
        const nameArray = filePath.split('.');
        const type = nameArray[nameArray.length - 1];

        readFile(filePath, 'utf8').then(data => {
            setOpenedFile({ input: data, type });
        });
    };

    console.log(`presentDir:` + presentDir);

    pourFile(toOpen);

    const back = (): void => {
        const newLocationArray = location.split('\\');
        newLocationArray.pop();
        const newLocation = newLocationArray.join('\\');
        if (newLocationArray.length > 0) {
            setLocation(newLocation);
            setPresentDir(presentDir);
        }
    };

    return (
        <div className={styles.document}>
            <div className={styles.title}>
                <a onClick={back}>
                    <span className={styles.iconista}>{location.split('\\').length > 1 && <FaArrowLeft />}</span>
                </a>
                <span className={styles.titleName}>
                    <ReSlash toSlash={location} />
                </span>
            </div>
            <div className={styles.full}>
                <Explorer
                    presentDir={presentDir}
                    setPresentDir={setPresentDir}
                    location={location}
                    setLocation={setLocation}
                    setToOpen={setToOpen}
                />
                <div className={styles.view}>
                    <Format input={openedFile.input} type={openedFile.type} />
                </div>
            </div>
        </div>
    );
};

export default App;
