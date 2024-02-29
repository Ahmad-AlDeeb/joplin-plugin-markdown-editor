// 1. Import a CodeMirror extension
import joplin from "api";
const { lineNumbers } = joplin.require('@codemirror/view');

export default (_context: { contentScriptId: string, postMessage: any }) => {
    return {
        plugin: (codeMirrorWrapper: any) => {
            // 2. Adds the built-in CodeMirror 6 extension to the editor
            codeMirrorWrapper.addExtension(lineNumbers());
        },
    };
};