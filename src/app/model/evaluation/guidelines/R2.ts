import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {EvaluationHelper} from "../../../util/EvaluationHelper";
import {DOMHelper} from "../../../util/DOMHelper";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R2: Guideline = {
  id: 'R2',
  name: 'Scrollbars vermeiden',
  evaluationType: GuidelineEvaluationType.COMPUTED,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled({targetElement}): GuidelineEvaluationResult {
    if (!targetElement) return {
      success: true
    };

    const evaluationResult = EvaluationHelper.validateElementAndChildrenAgainstGuideline(targetElement, DOMHelper.elementDoesNotHaveScroll);

    return {
      success: evaluationResult.success,
      failureElements: evaluationResult.failureElements,
    }
  }
}


