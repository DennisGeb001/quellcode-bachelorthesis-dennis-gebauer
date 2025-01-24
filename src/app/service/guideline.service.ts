import {Injectable} from '@angular/core';
import {ToolbarGuidelineEvaluationConfig} from "../model/evaluation/ToolbarGuidelineEvaluationConfig";

import {Guideline} from "../model/evaluation/Guideline";
import {ConfigurationComponent} from "../model/enum/ConfigurationComponent";
import {GuidelineEvaluationType} from "../model/enum/GuidelineEvaluationType";
import {R1} from "../model/evaluation/guidelines/R1";
import {R2} from "../model/evaluation/guidelines/R2";
import {R4} from "../model/evaluation/guidelines/R4";
import {R5} from "../model/evaluation/guidelines/R5";
import {R6} from "../model/evaluation/guidelines/R6";
import {R7} from "../model/evaluation/guidelines/R7";
import {R13} from "../model/evaluation/guidelines/R13";
import {R15} from "../model/evaluation/guidelines/R15";
import {R16} from "../model/evaluation/guidelines/R16";
import {R17} from "../model/evaluation/guidelines/R17";
import {R19} from "../model/evaluation/guidelines/R19";
import {R21} from "../model/evaluation/guidelines/R21";
import {R22} from "../model/evaluation/guidelines/R22";
import {R23} from "../model/evaluation/guidelines/R23";
import {R24} from "../model/evaluation/guidelines/R24";
import {R25} from "../model/evaluation/guidelines/R25";
import {R26} from "../model/evaluation/guidelines/R26";
import {R30} from "../model/evaluation/guidelines/R30";
import {R31} from "../model/evaluation/guidelines/R31";
import {R32} from "../model/evaluation/guidelines/R32";
import {R34} from "../model/evaluation/guidelines/R34";
import {R35} from "../model/evaluation/guidelines/R35";
import {R36} from "../model/evaluation/guidelines/R36";
import {R37} from "../model/evaluation/guidelines/R37";
import {GuidelineEvaluationResult} from "../model/evaluation/GuidelineEvaluationResult";

@Injectable({
  providedIn: 'root'
})
export class GuidelineService {

  availableGuidelines: Guideline[] = [R1, R2, R4, R5, R6, R7, R13, R15, R16, R17, R19, R21, R22, R23, R24, R25, R26, R30, R31, R32, R34, R35, R36, R37];

  getGuidelinesForComponent(component: ConfigurationComponent): Guideline[] {
    return this.availableGuidelines.filter(guideline => guideline.targetComponents.includes(component));
  }

  evaluateToolbarGuidelines(config: ToolbarGuidelineEvaluationConfig): Map<string, GuidelineEvaluationResult> {
    const result = new Map<string, GuidelineEvaluationResult>();

    this.getGuidelinesForComponent(ConfigurationComponent.TOOLBAR).forEach(guideline => {
      if (guideline.id === 'R1' || guideline.id === 'R2') {
        const toolbarResult = guideline.isFulfilled({targetElement: config.toolbarElement});
        const sidenavResult = config.sidenavElement ? guideline.isFulfilled({targetElement: config.sidenavElement}) : {success: true};

        let combinedFailureElements: HTMLElement[] | undefined;
        if (toolbarResult.failureElements || sidenavResult.failureElements) {
          combinedFailureElements = [
            ...(toolbarResult.failureElements ?? []),
            ...(sidenavResult.failureElements ?? [])
          ];
        }

        const combinedResult: GuidelineEvaluationResult = {
          success: toolbarResult.success && sidenavResult.success,
          failureElements: combinedFailureElements
        }

        result.set(guideline.id, combinedResult);
      } else if (guideline.evaluationType === GuidelineEvaluationType.USER_INPUT) {
        result.set(guideline.id, guideline.isFulfilled({userEvaluationInput: config.userInputGuidelineEvaluations.get(guideline.id)}));
      } else {
        result.set(guideline.id, guideline.isFulfilled({targetElement: config.toolbarElement}));
      }
    })

    return result;
  }
}
