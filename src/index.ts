import joplin from 'api';
import { ContentScriptType, SettingItemType } from 'api/types';



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
		
		const contentScriptId = 'some-content-script-id';
		joplin.contentScripts.register(
				ContentScriptType.CodeMirrorPlugin,
				contentScriptId,
				'./contentScript.js',
		);
	},
});
