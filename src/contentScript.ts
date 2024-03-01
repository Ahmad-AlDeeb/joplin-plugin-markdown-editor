// 1. Import a CodeMirror extension
// linenumber is built-in CodeMirror extension to add line numbers in editor
// highlightActiveLine is another built-in CodeMirror extension. It adds the cm-activeLine class to all lines that have a cursor on them.
import { lineNumbers, highlightActiveLine } from '@codemirror/view';

export default (context: { contentScriptId: string, postMessage: any }) => {
    return {
        
        // An `async` was also added so that we can `await` the result of `context.postMessage`:
        plugin: async (codeMirrorWrapper: any) => {
            // 2. Adds the built-in CodeMirror 6 extension to the editor
            codeMirrorWrapper.addExtension(lineNumbers());

            // Get settings from the main script with postMessage:
            //  We get settings from index.ts with context.postMessage('getSettings')
            // This calls the onMessage listener that was registered in index.ts file
            const settings = await context.postMessage('getSettings');
            if (settings.highlightActiveLine) {
                codeMirrorWrapper.addExtension(highlightActiveLine());
            }
        },

        
    };
};