import {Component, OnInit} from '@angular/core';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormField, MatLabel, MatPrefix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatCard, MatCardContent, MatCardHeader, MatCardSubtitle, MatCardTitle} from "@angular/material/card";
import {ThemeService} from "../../service/theme.service";
import {ThemeConfig} from "../../model/ThemeConfig";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import {MatDivider} from "@angular/material/divider";
import {MatDialog} from "@angular/material/dialog";
import {EditThemeConfigDialogComponent} from "./edit-theme-config-dialog/edit-theme-config-dialog.component";
import {ThemeVariablesImport} from "../../model/util/ThemeVariablesImport";

@Component({
  selector: 'app-theme-picker',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatPrefix,
    MatButton,
    MatIconButton,
    MatIcon,
    MatTooltip,
    MatSlideToggle,
    MatDivider,
    MatCardSubtitle
  ],
  templateUrl: './theme-picker.component.html',
  styleUrl: './theme-picker.component.scss'
})
export class ThemePickerComponent implements OnInit {

  themeConfig ?: ThemeConfig;

  constructor(
    private readonly themeService: ThemeService,
    private readonly dialog: MatDialog
  ) {
  }

  ngOnInit() {
    this.themeService.config$.subscribe((config: ThemeConfig) => {
      this.themeConfig = config;
    })
  }

  openEditThemeConfigDialog() {
    const dialogRef = this.dialog.open(EditThemeConfigDialogComponent, {
      minWidth: 1100,
      data: {currentConfig: this.themeConfig},
    });

    dialogRef.afterClosed().subscribe((result: ThemeVariablesImport) => {
      if (result !== undefined) {
        this.themeService.updateConfigFromVariablesImport(result);
      }
    });
  }

  restoreDefaultConfig() {
    this.themeService.restoreDefaultConfig();
  }
}
