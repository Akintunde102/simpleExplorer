import * as React from 'react';
import { useState } from 'react';
import Explorer from './explorer';
import styles from './App.scss';
import { defaults } from './conf';
import { FaArrowLeft } from 'react-icons/fa';
import fs from 'fs';
import util from 'util';
import detect from 'language-detect';
import ReSlash from './ReSlash';
import Format from './Format';
import { isDir } from '../ui/usables/isDir';

const readFile = util.promisify(fs.readFile);

const defaultViewFile = defaults.ViewFile;
const defaultViewFileInput = fs.readFileSync(defaultViewFile, 'utf8');

const App = () => {
    const [location, setLocation] = useState(defaults.Folder);
    const [presentDir, setPresentDir] = useState('/home/akintunde/simpleExplorer');
    const [toOpen, setToOpen] = useState(defaultViewFile);
    const [openedFile, setOpenedFile] = useState({ input: '', type: '', fullPath: '' });
    const pourFile = async (filePath: string): Promise<string> => {
        const fileNameArray = filePath.split('.');
        const extension = fileNameArray[fileNameArray.length - 1];
        const unAllowed = defaults.FileViewerExt.concat(defaults.ReactPanZoomExt);
        let { input, type, fullPath } = { input: '', type: '', fullPath: filePath };
        if (!unAllowed.includes(extension.toLowerCase())) {
            type = detect(filePath, (err: string, language: string) => {
                err && console.log(err);
                console.log(filePath, language);
                return language.toLowerCase();
            });
            input = await readFile(filePath, 'utf8');
        }
        setOpenedFile({ input, type, fullPath });
        return input;
    };

    const back = (): void => {
        const newLocationArray = location.split('/');
        console.log(newLocationArray);
        newLocationArray.pop();
        const newLocation = newLocationArray.join('/');
        console.log({newLocationArray,newLocation});
        if (newLocationArray.length > 0) {
            if (isDir({ fullLocation: newLocation })) {
                setPresentDir(newLocation);
                return;
            } else {
                setToOpen(newLocation);
            }
            setLocation(newLocation);
        }
    };

    console.log({ location });

    return (
        <div className={styles.document}>
            <div className={styles.title}>
                <a onClick={back} href="#">
                    <span className={styles.iconista}> <FaArrowLeft /></span>
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
                    pourFile={pourFile}
                />
                <div className={styles.view}>
                    {toOpen === defaultViewFile ? (
                        <Format input={defaultViewFileInput} type="html" fullPath={defaultViewFile} />
                    ) : (
                        <Format input={openedFile.input} type={openedFile.type} fullPath={openedFile.fullPath} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
