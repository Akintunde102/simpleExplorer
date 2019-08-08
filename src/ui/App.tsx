import * as React from 'react';
import { useState } from 'react';
import Explorer from './explorer';
import styles from './App.scss';
import { FaArrowLeft } from 'react-icons/fa';
import fs from 'fs';
import util from 'util';
import detect from 'language-detect';
import ReSlash from './ReSlash';
import Format from './Format';
import { isDir } from '../ui/usables/isDir';

const readFile = util.promisify(fs.readFile);

const defaultViewFile = 'C:\\Users\\akintunde\\museeks\\src\\ui\\usables\\defaultOpen.html';
const defaultViewFileInput = fs.readFileSync(defaultViewFile, 'utf8');
const App = () => {
    console.log('APP');
    const [location, setLocation] = useState('C:\\Users\\akintunde\\Desktop\\Hmmm');
    const [presentDir, setPresentDir] = useState('C:\\Users\\akintunde\\Desktop\\Hmmm');
    const [toOpen, setToOpen] = useState(defaultViewFile);
    const [openedFile, setOpenedFile] = useState({ input: '', type: '' });

    const pourFile = async (filePath: string): Promise<string> => {
        const type = detect(filePath, (err: string, language: string) => {
            err && console.log(err);
            console.log(filePath, language);
            return language.toLowerCase();
        });

        const data = await readFile(filePath, 'utf8');
        setOpenedFile({ input: data, type });
        return data;
    };

    if (toOpen !== defaultViewFile) {
        pourFile(toOpen).then(() => {
            console.log('File is Open');
        });
    }

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
                />
                <div className={styles.view}>
                    {toOpen === defaultViewFile ? (
                        <Format input={defaultViewFileInput} type="html" />
                    ) : (
                        <Format input={openedFile.input} type={openedFile.type} />
                    )}
                </div>
            </div>
        </div>
    );
};

export default App;
