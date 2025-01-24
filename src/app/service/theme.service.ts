import {Injectable} from '@angular/core';
import {ThemeConfig} from "../model/ThemeConfig";
import {ReplaySubject} from "rxjs";
import {ColorVariant} from "../model/util/ColorVariant";
import {ThemeVariablesImport} from "../model/util/ThemeVariablesImport";

const defaultTheme = "  --md-sys-color-primary: rgb(143 76 56);\n" +
  "  --md-sys-color-surface-tint: rgb(143 76 56);\n" +
  "  --md-sys-color-on-primary: rgb(255 255 255);\n" +
  "  --md-sys-color-primary-container: rgb(255 219 209);\n" +
  "  --md-sys-color-on-primary-container: rgb(58 11 1);\n" +
  "  --md-sys-color-secondary: rgb(119 87 78);\n" +
  "  --md-sys-color-on-secondary: rgb(255 255 255);\n" +
  "  --md-sys-color-secondary-container: rgb(255 219 209);\n" +
  "  --md-sys-color-on-secondary-container: rgb(44 21 15);\n" +
  "  --md-sys-color-tertiary: rgb(108 93 47);\n" +
  "  --md-sys-color-on-tertiary: rgb(255 255 255);\n" +
  "  --md-sys-color-tertiary-container: rgb(245 225 167);\n" +
  "  --md-sys-color-on-tertiary-container: rgb(35 27 0);\n" +
  "  --md-sys-color-error: rgb(186 26 26);\n" +
  "  --md-sys-color-on-error: rgb(255 255 255);\n" +
  "  --md-sys-color-error-container: rgb(255 218 214);\n" +
  "  --md-sys-color-on-error-container: rgb(65 0 2);\n" +
  "  --md-sys-color-background: rgb(255 248 246);\n" +
  "  --md-sys-color-on-background: rgb(35 25 23);\n" +
  "  --md-sys-color-surface: rgb(255 248 246);\n" +
  "  --md-sys-color-on-surface: rgb(35 25 23);\n" +
  "  --md-sys-color-surface-variant: rgb(245 222 216);\n" +
  "  --md-sys-color-on-surface-variant: rgb(83 67 63);\n" +
  "  --md-sys-color-outline: rgb(133 115 110);\n" +
  "  --md-sys-color-outline-variant: rgb(216 194 188);\n" +
  "  --md-sys-color-shadow: rgb(0 0 0);\n" +
  "  --md-sys-color-scrim: rgb(0 0 0);\n" +
  "  --md-sys-color-inverse-surface: rgb(57 46 43);\n" +
  "  --md-sys-color-inverse-on-surface: rgb(255 237 232);\n" +
  "  --md-sys-color-inverse-primary: rgb(255 181 160);\n" +
  "  --md-sys-color-primary-fixed: rgb(255 219 209);\n" +
  "  --md-sys-color-on-primary-fixed: rgb(58 11 1);\n" +
  "  --md-sys-color-primary-fixed-dim: rgb(255 181 160);\n" +
  "  --md-sys-color-on-primary-fixed-variant: rgb(114 53 35);\n" +
  "  --md-sys-color-secondary-fixed: rgb(255 219 209);\n" +
  "  --md-sys-color-on-secondary-fixed: rgb(44 21 15);\n" +
  "  --md-sys-color-secondary-fixed-dim: rgb(231 189 178);\n" +
  "  --md-sys-color-on-secondary-fixed-variant: rgb(93 64 55);\n" +
  "  --md-sys-color-tertiary-fixed: rgb(245 225 167);\n" +
  "  --md-sys-color-on-tertiary-fixed: rgb(35 27 0);\n" +
  "  --md-sys-color-tertiary-fixed-dim: rgb(216 197 141);\n" +
  "  --md-sys-color-on-tertiary-fixed-variant: rgb(83 70 25);\n" +
  "  --md-sys-color-surface-dim: rgb(232 214 210);\n" +
  "  --md-sys-color-surface-bright: rgb(255 248 246);\n" +
  "  --md-sys-color-surface-container-lowest: rgb(255 255 255);\n" +
  "  --md-sys-color-surface-container-low: rgb(255 241 237);\n" +
  "  --md-sys-color-surface-container: rgb(252 234 229);\n" +
  "  --md-sys-color-surface-container-high: rgb(247 228 224);\n" +
  "  --md-sys-color-surface-container-highest: rgb(241 223 218);\n";

@Injectable({
  providedIn: 'root',
})
export class ThemeService {

  private defaultConfig!: ThemeConfig;

  constructor() {
    this.loadDefaultConfig()
  }

  private _config$: ReplaySubject<ThemeConfig> = new ReplaySubject();

  get config$(): ReplaySubject<ThemeConfig> {
    return this._config$;
  }

  updateConfigFromVariablesImport(variablesImport: ThemeVariablesImport) {
    const newConfig: ThemeConfig = {
      primaryColor: this.parseVariantColorFromConfig('primary', variablesImport.lightThemeVariables ? variablesImport.lightThemeVariables : variablesImport.darkThemeVariables!),
      secondaryColor: this.parseVariantColorFromConfig('secondary', variablesImport.lightThemeVariables ? variablesImport.lightThemeVariables : variablesImport.darkThemeVariables!),
      tertiaryColor: this.parseVariantColorFromConfig('tertiary', variablesImport.lightThemeVariables ? variablesImport.lightThemeVariables : variablesImport.darkThemeVariables!),
      lightThemeVariables: variablesImport.lightThemeVariables,
      darkThemeVariables: variablesImport.darkThemeVariables,
      showDarkMode: false
    }
    this._config$.next(newConfig);
  }

  restoreDefaultConfig() {
    this._config$.next(this.defaultConfig);
  }

  private loadDefaultConfig() {
    this.defaultConfig = {
      primaryColor: this.parseVariantColorFromConfig('primary', defaultTheme),
      secondaryColor: this.parseVariantColorFromConfig('secondary', defaultTheme),
      tertiaryColor: this.parseVariantColorFromConfig('tertiary', defaultTheme),
      lightThemeVariables: defaultTheme,
      showDarkMode: false
    }
    this._config$.next(this.defaultConfig);
  }

  private parseVariantColorFromConfig(variant: ColorVariant, config: string): string {
    const regex = new RegExp(`--md-sys-color-${variant}:\\s*rgb\\((\\d+)\\s+(\\d+)\\s+(\\d+)\\);`, 'i');
    const match = regex.exec(config);
    if (!match) {
      throw new Error('Die angegebene Konfiguration konnte nicht richtig gelesen werden');
    }

    const r = match[1];
    const g = match[2];
    const b = match[3];

    return `#${this.toHex(r)}${this.toHex(g)}${this.toHex(b)}`;
  }

  private toHex(value: string): string {
    const num = parseInt(value, 10);
    return num.toString(16).padStart(2, '0');
  }
}
