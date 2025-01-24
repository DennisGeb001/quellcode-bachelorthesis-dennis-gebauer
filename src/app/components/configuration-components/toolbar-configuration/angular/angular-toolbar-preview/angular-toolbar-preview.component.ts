import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatToolbar} from "@angular/material/toolbar";
import {ToolbarConfigForm} from "../../model/ToolbarConfigForm";
import {FormGroup} from "@angular/forms";
import {ThemeService} from "../../../../../service/theme.service";
import {NgClass} from "@angular/common";
import {ThemeColorOption} from "../../../../../model/enum/ThemeColorOption";
import {MatAnchor, MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {WindowSizeClass} from "../../../../../model/enum/WindowSizeClass";
import {UpperSnakeCaseToCamelCasePipe} from "../../../../../pipe/upper-snake-case-to-camel-case.pipe";
import {MenuConfigOption} from "../../enum/MenuConfigOption";
import {MenuTypeConfigOption} from "../../enum/MenuTypeConfigOption";
import {MatMenu, MatMenuItem, MatMenuTrigger} from "@angular/material/menu";
import {MatDrawerContainer, MatSidenav, MatSidenavContainer} from "@angular/material/sidenav";
import {MatListItem, MatNavList} from "@angular/material/list";
import {MatTooltip} from "@angular/material/tooltip";

@Component({
  selector: 'app-angular-toolbar-preview',
  standalone: true,
  imports: [
    MatToolbar,
    NgClass,
    MatIconButton,
    MatIcon,
    MatButton,
    MatAnchor,
    MatMenuItem,
    MatMenu,
    MatMenuTrigger,
    MatDrawerContainer,
    MatNavList,
    MatListItem,
    MatSidenav,
    MatSidenavContainer,
    MatTooltip
  ],
  templateUrl: './angular-toolbar-preview.component.html',
  styleUrl: './angular-toolbar-preview.component.scss'
})
export class AngularToolbarPreviewComponent implements OnInit {
  @ViewChild('sideNav') sideNav?: MatSidenav;
  @ViewChild('menuTrigger') menuTrigger?: MatMenuTrigger;

  @Input()
  toolbarConfig!: FormGroup<ToolbarConfigForm>;
  @Input()
  selectedWindowSize?: WindowSizeClass;

  themeVariables = "";
  loggedIn = false;

  constructor(private readonly themeService: ThemeService, private readonly upperSnakeCaseToCamelCasePipe: UpperSnakeCaseToCamelCasePipe) {
  }

  ngOnInit() {
    this.themeService.config$.subscribe(config =>
      this.themeVariables = config.showDarkMode ? config.darkThemeVariables! : config.lightThemeVariables!
    )
  }

  getToolbarClass(): string {
    return `${this.getClassPrefix()}-toolbar`;
  }


  getSidenavClass() {
    return `${this.getClassPrefix()}-sidenav`;
  }

  // if menu button is not shown, link buttons are displayed instead
  showMenuButton(): boolean {
    if (!this.selectedWindowSize) return false;

    return this.toolbarConfig.controls.menuConfig.controls.menu.get(
      this.upperSnakeCaseToCamelCasePipe.transform(this.selectedWindowSize)
    )?.value === MenuConfigOption.MENU;
  }

  // if menu is not a dropdown menu, it is a drawer
  isDropDownMenu() {
    if (!this.selectedWindowSize) return false;

    return this.toolbarConfig.controls.menuConfig.controls.menuType.get(
      this.upperSnakeCaseToCamelCasePipe.transform(this.selectedWindowSize)
    )?.value === MenuTypeConfigOption.DROPDOWN;
  }

  private getClassPrefix(): string {
    return this.toolbarConfig.controls.color.value === ThemeColorOption.NONE ? '' : this.toolbarConfig.controls.color.value.toLowerCase()
  }
}
