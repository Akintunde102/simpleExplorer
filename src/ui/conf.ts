const appRoot = process.cwd();

console.log({ appRoot });

interface Idefault {
    Folder: string;
    ViewFile: string;
    FileViewerExt: string[];
    ReactPanZoomExt: string[];
    ICOjs: string[];
}

export const defaults: Idefault = {
    Folder: `${appRoot}`,
    ViewFile: `${appRoot}/src/ui/usables/defaultOpen.html`,
    FileViewerExt: ['bmp', 'pdf', 'csv', 'xslx', 'docx', 'mp4', 'webm', 'mp3'],
    ReactPanZoomExt: ['jpg', 'jpeg', 'png', 'gif', 'doc'],
    ICOjs: ['ico'],
};
