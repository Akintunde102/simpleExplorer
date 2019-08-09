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
    console.log('APP');
    const [location, setLocation] = useState('C:\\Users\\akintunde\\Desktop\\Hmmm');
    const [presentDir, setPresentDir] = useState('C:\\Users\\akintunde\\Desktop\\Hmmm');
    const [toOpen, setToOpen] = useState(defaultViewFile);
    const [openedFile, setOpenedFile] = useState({ input: '', type: '', fullPath: '' });

    const pourFile = async (filePath: string): Promise<string> => {
        const fileNameArray = filePath.split('.');
        const extension = fileNameArray[fileNameArray.length - 1];
        const unAllowed = ['jpg', 'jpeg', 'png', 'gif', 'doc'];
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
        const newLocationArray = location.split('\\');
        newLocationArray.pop();
        const newLocation = newLocationArray.join('\\');
        if (newLocationArray.length > 0) {
            if (isDir({ fullLocation: newLocation })) {
                setPresentDir(newLocation);
            } else {
                setToOpen(newLocation);
            }
            setLocation(newLocation);
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
