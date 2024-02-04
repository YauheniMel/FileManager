import {readdir} from "node:fs/promises";

export const ls = async (currentPath) => {
    const content = await readdir(currentPath, {withFileTypes: true})

    const parsedContent = content.map((item, index) => {
        const isFile = item[Object.getOwnPropertySymbols(item)[0]] === 1;

        return {
            Name: item.name,
            type: isFile ? 'file' : 'directory'
        }
    })

    const sortedContent = parsedContent.sort((a, b) => {
        if(a.type === b.type) return a.Name.localeCompare(b.Name);

        if(a.type === 'directory') return -1;
        if(a.type === 'file') return 1;
    });

    console.table(sortedContent);
}