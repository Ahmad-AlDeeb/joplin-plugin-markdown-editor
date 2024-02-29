import joplin from 'api';
import { ContentScriptType } from 'api/types';

joplin.plugins.register({
	onStart: async function() {
		const contentScriptId = 'some-content-script-id';
		joplin.contentScripts.register(
				ContentScriptType.CodeMirrorPlugin,
				contentScriptId,
				'./contentScript.js',
		);
	},
});
