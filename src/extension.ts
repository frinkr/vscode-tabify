// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	function escapeRegExp(str: string) {
		return str.replace(/[.*+\-?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
	}

	function tabSize() {
		let editor = vscode.window.activeTextEditor;
		if (editor && editor.options.tabSize) {
			return +editor.options.tabSize;
		}
		else {
			return 4;
		}
	}

	function replace(from: string, to: string) {
		let editor = vscode.window.activeTextEditor;

		if (editor) {
			let document = editor.document;

			let selection = editor.selection;

			// Get the word within the selection
			let text = document.getText(selection);
			var re = new RegExp(escapeRegExp(from), 'g');
			let newText = text.replace(re, to);
			editor.edit(editBuilder => {
				editBuilder.replace(selection, newText);
			});
		}
	};

	let disposableTabify = vscode.commands.registerCommand('vscode-tabify.tabify', () => {
		replace(" ".repeat(tabSize()), "\t");
	});

	let disposableUntabify = vscode.commands.registerCommand('vscode-tabify.untabify', () => {
		replace("\t", " ".repeat(tabSize()));
	});

	context.subscriptions.push(disposableTabify);
	context.subscriptions.push(disposableUntabify);
}

// this method is called when your extension is deactivated
export function deactivate() { }
