const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
    vscode.window.showInformationMessage('Vue3 Init extension is now active!');

    // Listener
    const watchText = vscode.workspace.onDidChangeTextDocument(event => {
        const editor = vscode.window.activeTextEditor;

        if (editor && editor.document.languageId === 'vue') {
            const document = editor.document;
            const text = document.getText();

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

            if (text.includes('vue3initts') || text.includes('vue3init-ts')) {
              const template = `<script setup lang="ts">

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

    // Register listener
    context.subscriptions.push(watchText);
}

function deactivate() {
    console.log('Vue3 Init extension is now deactivated.');
}

module.exports = {
    activate,
    deactivate
};
