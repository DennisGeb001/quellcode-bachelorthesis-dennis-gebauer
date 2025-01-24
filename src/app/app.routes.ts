import {Routes} from '@angular/router';
import {ComponentOverviewComponent} from "./components/component-overview/component-overview.component";
import {
  ToolbarConfigurationComponent
} from "./components/configuration-components/toolbar-configuration/toolbar-configuration.component";
import {AnalyzerComponent} from "./components/analyzer/analyzer.component";

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'configurator',
    pathMatch: 'full'
  },
  {
    path: 'configurator',
    component: ComponentOverviewComponent,
    children: [
      {
        path: '',
        redirectTo: 'toolbar',
        pathMatch: 'full'
      },
      {
        path: 'toolbar',
        component: ToolbarConfigurationComponent
      }
    ]
  },
  {
    path: 'analyzer',
    component: AnalyzerComponent
  }
];
