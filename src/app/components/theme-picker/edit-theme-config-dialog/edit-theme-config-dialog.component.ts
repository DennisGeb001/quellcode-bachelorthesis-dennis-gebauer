import {Component, Inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {MatLabel} from "@angular/material/input";
import {MatButton, MatIconButton, MatMiniFabButton} from "@angular/material/button";
import {EditThemeConfigDialogData} from "./EditThemeConfigDialogData";
import {MatDivider} from "@angular/material/divider";
import {ThemeConfig} from "../../../model/ThemeConfig";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {ThemeVariablesImport} from "../../../model/util/ThemeVariablesImport";

@Component({
  selector: 'app-edit-theme-config-dialog',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatLabel,
    MatDialogActions,
    MatButton,
    MatDialogClose,
    MatDivider,
    MatIconButton,
    MatIcon,
    MatMiniFabButton,
    MatTooltip
  ],
  templateUrl: './edit-theme-config-dialog.component.html',
  styleUrl: './edit-theme-config-dialog.component.scss'
})
export class EditThemeConfigDialogComponent {
  currentConfig!: ThemeConfig
  newFile?: File;
  importedDarkTheme?: string;
  importedLightTheme?: string;

  constructor(
    public dialogRef: MatDialogRef<EditThemeConfigDialogData>,
    @Inject(MAT_DIALOG_DATA) public data: { currentConfig: ThemeConfig; }
  ) {
    this.currentConfig = data.currentConfig;
  }

  dismiss() {
    this.dialogRef.close();
  }

  handleFilesSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) return;

    const files = Array.from(input.files);
    if (files.length > 2) {
      throw new Error('Es dürfen maximal 2 Dateien hochgeladen werden.');
    }

    const fileNames = files.map(file => file.name.toLowerCase());

    if (fileNames.some(name => !this.isCssFile(name))) {
      throw new Error('Bitte lade nur Dateien mit der Endung .css hoch.');
    }

    const validFileNames = ['light.css', 'dark.css'];
    const fileNamesAreValid = fileNames.every(name => validFileNames.includes(name));

    if (!fileNamesAreValid) {
      if (files.length > 1) {
        throw new Error('Die hochgeladenen Dateien müssen "light.css" und "dark.css" sein.');
      } else {
        throw new Error('Die hochgeladene Datei muss entweder "light.css" oder "dark.css" heißen.');
      }
    }

    files.forEach(file => this.readVariablesFromFile(file));
  }

  private isCssFile(fileName: string): boolean {
    return fileName.endsWith('.css');
  }

  private readVariablesFromFile(file: File) {
    const reader = new FileReader();

    this.newFile = file;

    reader.onload = (e: ProgressEvent<FileReader>) => {
      const rawConfig = e.target?.result as string;

      if (file.name.toLowerCase() === 'light.css') {
        this.importedLightTheme = this.formatParsedConfig(rawConfig);
      } else {
        this.importedDarkTheme = this.formatParsedConfig(rawConfig);
      }
    };

    reader.readAsText(file);
  }

  private formatParsedConfig(str: string): string {
    const lines = str.split('\n');

    if (lines.length <= 2) {
      return '';
    }

    // exclude first line (class selector) and last 2 lines (empty line and closing bracket)
    return lines.slice(1, -2).join('\n');
  }

  getThemeVariablesImport(): ThemeVariablesImport {
    return {
      lightThemeVariables: this.importedLightTheme,
      darkThemeVariables: this.importedDarkTheme
    }
  }
}
