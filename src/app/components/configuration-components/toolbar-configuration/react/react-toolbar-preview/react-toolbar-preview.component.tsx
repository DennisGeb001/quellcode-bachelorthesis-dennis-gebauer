import {Component, CUSTOM_ELEMENTS_SCHEMA, Input, OnInit} from '@angular/core';
import React from 'react';
import ReactDOM, {Root} from "react-dom/client";
import ReactToolbarPreview, {ReactToolbarPreviewHandle} from "./ReactToolbarPreview";
import {FormGroup} from "@angular/forms";
import {ToolbarConfigForm} from "../../model/ToolbarConfigForm";
import {WindowSizeClass} from "../../../../../model/enum/WindowSizeClass";
import {ThemeService} from "../../../../../service/theme.service";
import {ThemeConfig} from "../../../../../model/ThemeConfig";

@Component({
  selector: 'app-react-toolbar-preview-component',
  standalone: true,
  imports: [],
  templateUrl: './react-toolbar-preview.component.html',
  styleUrl: './react-toolbar-preview.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ReactToolbarPreviewComponent implements OnInit {
  toolbarPreviewComponent?: React.RefObject<ReactToolbarPreviewHandle>;

  @Input() toolbarConfig!: FormGroup<ToolbarConfigForm>;
  @Input() selectedWindowSize?: WindowSizeClass;

  themeConfig?: ThemeConfig;

  constructor(private readonly themeService: ThemeService) {
  }

  ngOnInit(): void {
    const toolbarRef = React.createRef<ReactToolbarPreviewHandle>();
    this.toolbarPreviewComponent = toolbarRef;

    const root = ReactDOM.createRoot(
      document.getElementById('react-root') as HTMLElement
    )
    this.renderComponent(root, toolbarRef);

    this.themeService.config$.subscribe(config => {
      this.themeConfig = config;

      this.renderComponent(root, toolbarRef)
    })

    this.toolbarConfig.valueChanges
      .subscribe(() => this.renderComponent(root, toolbarRef));
  }

  private renderComponent(root: Root, toolbarRef: React.RefObject<ReactToolbarPreviewHandle>) {
    root.render(
      <ReactToolbarPreview
        ref={toolbarRef}
        toolbarConfig={this.toolbarConfig}
        selectedWindowSize={this.selectedWindowSize}
        themeConfig={this.themeConfig}
      />
    );
  }
}
