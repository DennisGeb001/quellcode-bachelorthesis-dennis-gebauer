import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MatButtonToggle, MatButtonToggleGroup} from "@angular/material/button-toggle";
import {WindowSizeClass} from "../../model/enum/WindowSizeClass";
import {LowerCasePipe, NgClass} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-component-preview',
  standalone: true,
  imports: [
    MatButtonToggleGroup,
    MatButtonToggle,
    NgClass,
    LowerCasePipe,
    FormsModule
  ],
  templateUrl: './component-preview.component.html',
  styleUrl: './component-preview.component.scss'
})
export class ComponentPreviewComponent implements OnInit{

  selectedWindowSize: WindowSizeClass = WindowSizeClass.EXPANDED;
  @Output() selectedWindowSizeChange: EventEmitter<WindowSizeClass> = new EventEmitter();
  protected readonly WindowSizeClass = WindowSizeClass;

  ngOnInit() {
    this.selectedWindowSizeChange.emit(this.selectedWindowSize);
  }

  getSelectedWindowSize() {
    switch (this.selectedWindowSize) {
      case WindowSizeClass.COMPACT:
        return 599;
      case WindowSizeClass.MEDIUM:
        return 839;
      case WindowSizeClass.EXPANDED:
        return 1199;
      case WindowSizeClass.LARGE:
        return 1599;
      case WindowSizeClass.EXTRA_LARGE:
        return 1700;
    }
  }

  changeWindowSize(windowSizeClass: WindowSizeClass) {
    this.selectedWindowSize = windowSizeClass;
    this.selectedWindowSizeChange.emit(this.selectedWindowSize);
  }
}
