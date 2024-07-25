const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    vscode.window.showInformationMessage('Vue3 Init extension is now active!');

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

    // Register the text change listener
    context.subscriptions.push(textChangeDisposable);
}

// This method is called when your extension is deactivated
function deactivate() {
    console.log('Vue3 Init extension is now deactivated.');
}

module.exports = {
    activate,
    deactivate
};
