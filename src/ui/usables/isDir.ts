import fs from 'fs';

interface IisDir {
    dir?: string;
    file?: string | null;
    fullLocation?: null | string;
}
export const isDir = ({ dir, file, fullLocation = null }: IisDir): boolean => {
    try {
        const location = fullLocation === null ? `${dir}/${file}` : fullLocation;
        const status = fs.statSync(location);
        return status.isDirectory();
    } catch (error) {
        console.log({error});
        return false;
    }
};
