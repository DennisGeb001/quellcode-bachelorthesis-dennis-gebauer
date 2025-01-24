import { Component } from '@angular/core';
import {MatSidenav, MatSidenavContainer, MatSidenavContent} from "@angular/material/sidenav";
import {MatList, MatListItem, MatNavList} from "@angular/material/list";
import {MatDivider} from "@angular/material/divider";
import {RouterLink, RouterLinkActive, RouterOutlet} from "@angular/router";
import {LowerCasePipe} from "@angular/common";

@Component({
  selector: 'app-component-overview',
  standalone: true,
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatSidenavContent,
    MatList,
    MatListItem,
    MatNavList,
    MatDivider,
    RouterOutlet,
    RouterLink,
    LowerCasePipe,
    RouterLinkActive
  ],
  templateUrl: './component-overview.component.html',
  styleUrl: './component-overview.component.scss'
})
export class ComponentOverviewComponent {
  availableComponents= [
    'Toolbar'
  ]
}
