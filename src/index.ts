import joplin from 'api';
import { ContentScriptType, SettingItemType } from 'api/types';

const registerMessageListener = async (contentScriptId: string) => {
	await joplin.contentScripts.onMessage(
			contentScriptId,
			
			// Sending messages with `context.postMessage`
			// from the content script with `contentScriptId`
			// calls this onMessage listener:
			async (message: any) => {
					if (message === 'getSettings') {
							const settingValue = await joplin.settings.value(highlightLineSettingId);
							return {
									highlightActiveLine: settingValue,
							};
					}
			},
	);
};
////////// Register a setting //////////
const highlightLineSettingId = 'highlight-active-line';
const registerSettings = async () => {
	const sectionName = 'example-cm6-plugin';
	
	// The call to joplin.settings.registerSection creates a new section in Joplin's settings.
	// This is where we'll put new settings.
	await joplin.settings.registerSection(sectionName, {
			label: 'CodeMirror 6 demo plugin',
			description: 'Settings for the CodeMirror 6 example plugin.',
			iconName: 'fas fa-edit',
	});

	//  register a setting with highlightLineSettingId as its ID
	await joplin.settings.registerSettings({
		[highlightLineSettingId]: {
				section: sectionName,
				value: true, // Default value
				public: true, // Show in the settings screen
				type: SettingItemType.Bool,
				label: 'Highlight active line',
		},
	});
};

////////// Register Plugin //////////
joplin.plugins.register({
	onStart: async function() {
		await registerSettings();
		
		// Add this:
		const contentScriptId = 'some-content-script-id';
		await registerMessageListener(contentScriptId);

		joplin.contentScripts.register(
				ContentScriptType.CodeMirrorPlugin,
				contentScriptId,
				'./contentScript.js',
		);
	},
});
