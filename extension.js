const vscode = require('vscode');
const path = require('path');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const disposable = vscode.commands.registerCommand('vue3init.createVue3Template', function () {
		vscode.window.showInformationMessage('vue3init installed!');

		const panel = vscode.window.createWebviewPanel(
			'vue3init',
			'vue3init',
			vscode.ViewColumn.One,
			{ enableScripts: true }
		);
		panel.webview.html = getWebViewContent(context, panel.webview);
	});

	context.subscriptions.push(disposable);

	// Event listener for text document changes
	const textChangeDisposable = vscode.workspace.onDidChangeTextDocument(event => {
		const editor = vscode.window.activeTextEditor;

		if (editor && editor.document.languageId === 'vue') {
			const document = editor.document;
			const text = document.getText();

			// Check if 'vue3init' was typed
			if (text.includes('vue3init')) {
				const template = `<script setup>

</script>

<template>

</template>

<style scoped>

</style>`;

				editor.edit(editBuilder => {
					editBuilder.delete(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(document.lineCount, 0)));
					editBuilder.insert(new vscode.Position(0, 0), template);
				});
			}
		}
	});

	context.subscriptions.push(textChangeDisposable);
}

function getWebViewContent(context, webview) {
	const imagePath = vscode.Uri.file(
		path.join(context.extensionPath, 'images', 'demo.gif')
	);
	const imageSrc = webview.asWebviewUri(imagePath);
	return `
	<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>VUE 3 INIT</title>
</head>
<body>
    <header>
        <h1>VUE 3 INIT</h1>
    </header>
	<hr>
    <main>
        <h2>Inicialize vue 3 templates with the following structure:</h2>
		<img src="${imageSrc}" alt="vue 3 template">
    </main>
    <footer>
    </footer>
</body>
</html>
	`;
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
