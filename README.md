# Payload CMS lexical editor extend

## 🚀 Overview

Ideal for content creators and developers who want to enrich their text content with more visual appeal.<br />

This plugin adds new features to the **Payload CMS lexical editor**. You can use any of the features on its own or all of them togehter:

- **Text Color** – Customize the color of selected text.
- **Text Highlight** – Highlight text with a background color.
- **Block Background Color** – Apply background colors to entire blocks of content.
- **Embed videos** - Add embedded youtube or vimeo videos to the content of the editor

**New features will be added** - Create issues for new features or create them yourself and create a PR to share it with the community

## 📸 Screenshots
### Text Color Feature
![Text Color Example](https://raw.githubusercontent.com/rubn-g/payloadcms-lexical-ext/refs/heads/main/screenshots/screenshot-3.png)

### Text Highlight Feature
![Text Highlight Example](https://raw.githubusercontent.com/rubn-g/payloadcms-lexical-ext/refs/heads/main/screenshots/screenshot-2.png)

### Block Background Feature
![Block Background Example](https://raw.githubusercontent.com/rubn-g/payloadcms-lexical-ext/refs/heads/main/screenshots/screenshot-1.png)

### Embed Video Feature
![Embed Video Example](https://raw.githubusercontent.com/rubn-g/payloadcms-lexical-ext/refs/heads/main/screenshots/screenshot-4.png)

## 📦 Installation
```bash
npm install payloadcms-lexical-ext
```

or

```bash
yarn add payloadcms-lexical-ext
```

## 🛠️ Usage
1. Import the features you want to use:
```javascript
import { BgColorFeature, HighlightColorFeature, TextColorFeature, YoutubeFeature, VimeoFeature } from 'payloadcms-lexical-ext';
```

2. If you're using any of the color features, import required css
```javascript
import 'payloadcms-lexical-ext/client/client.css'
```

3. Add features to your lexical editor configuration:
```javascript
lexicalEditor({
	features: [
		...defaultEditorFeatures,
		...YourFeatures...
		TextColorFeature(),
		HighlightColorFeature(),
		BgColorFeature(),
		YoutubeFeature(),
		VimeoFeature()
	]
});
```

4. Add JSX or HTML converters

	4.1 JSX Converters

	components/RichText/index.tsx

	```javascript
	import { JSXConverters } from 'payloadcms-lexical-ext'

	const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
		...defaultConverters,
		...JSXConverters
	})
	```

	4.2 HTML Converters

	```javascript
	import { consolidateHTMLConverters, convertLexicalToHTML, sanitizeServerEditorConfig } from '@payloadcms/richtext-lexical'
	import { HTMLConverters } from 'payloadcms-lexical-ext'

	...

	const sanitizedEditorConfig = await sanitizeServerEditorConfig(editorConfig, req.payload.config)

	await convertLexicalToHTML({
		converters: [
			...HTMLConverters,
			...consolidateHTMLConverters({ editorConfig: sanitizedEditorConfig })
		],
		data: jsonEditorContent,
		req,
	})
	```

## ⚙️ Configuration Options
The plugin comes with several customizable options:

```javascript
TextColorFeature({
	colors: [{
		type: 'button',
		label: 'Custom color',
		color: '#1155aa'
	}]
});
```

## 🧑‍💻 Contributing
Contributions are welcome! To get started:
1. Fork the repository.
2. Create a new branch for your feature.
3. Submit a pull request.

## 📝 License
This project is licensed under the [MIT License](./LICENSE).

## 📬 Contact
For questions or suggestions, feel free to open an issue or reach out to the Payload CMS community.
