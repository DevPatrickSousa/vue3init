const vscode = require('vscode');
const { jsTemplate } = require('./templates/jsTemplate');
const { tsTemplate } = require('./templates/tsTemplate');

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
  vscode.window.showInformationMessage('Vue3 Init extension is now active!');
  let timeout;

  // Listener
  const watchText = vscode.workspace.onDidChangeTextDocument(event => {
    const editor = vscode.window.activeTextEditor;

    if (editor && editor.document.languageId === 'vue') {
      const document = editor.document;
      const text = document.getText();
      let template = '';

      if (text.includes('vue3init')) {
        template = jsTemplate();
      }

      if (text.includes('vue3initts') || text.includes('vue3init-ts')) {
        template = tsTemplate();
      }

      clearTimeout(timeout);
      timeout = setTimeout(() => {
        if (template) {
          editor.edit(editBuilder => {
            editBuilder.delete(new vscode.Range(new vscode.Position(0, 0), new vscode.Position(document.lineCount, 0)));
            editBuilder.insert(new vscode.Position(0, 0), template);
          });
        }
      }, 500);
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
