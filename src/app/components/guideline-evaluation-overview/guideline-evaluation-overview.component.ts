import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GuidelineEvaluationType} from "../../model/enum/GuidelineEvaluationType";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatList} from "@angular/material/list";
import {MatProgressBar} from "@angular/material/progress-bar";
import {MatButton} from "@angular/material/button";
import {MatTooltip} from "@angular/material/tooltip";
import {MatIcon} from "@angular/material/icon";
import {MatCheckbox} from "@angular/material/checkbox";
import {GuidelineEvaluation} from "../configuration-components/toolbar-configuration/model/GuidelineEvaluation";

@Component({
  selector: 'app-guideline-evaluation-overview',
  standalone: true,
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatList,
    MatProgressBar,
    MatButton,
    MatTooltip,
    MatIcon,
    MatCheckbox
  ],
  templateUrl: './guideline-evaluation-overview.component.html',
  styleUrl: './guideline-evaluation-overview.component.scss'
})
export class GuidelineEvaluationOverviewComponent {
  @Input() evaluationPending = false;
  @Input() guidelineEvaluations = new Map<string, GuidelineEvaluation>;

  @Output() triggerEvaluation = new EventEmitter<void>();

  protected readonly GuidelineEvaluationType = GuidelineEvaluationType;

  get sortedGuidelineEvaluationsList(): GuidelineEvaluation[] {
    return Array.from(this.guidelineEvaluations.entries())
      .sort((a, b) => a[0].localeCompare(b[0], undefined, {numeric: true}))
      .map(entry => entry[1]);
  }

  elementToStringUsingOuterHTML(element: HTMLElement): string {
    const outerHTML = element.outerHTML;
    const match = outerHTML.match(/^<[^>]+>/);
    return match ? match[0] : '';
  }
}
