import {Guideline} from "../Guideline";
import {EvaluationHelper} from "../../../util/EvaluationHelper";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {DOMHelper} from "../../../util/DOMHelper";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R1: Guideline = {
  id: 'R1',
  name: 'Horizontales Scrolling vermeiden',
  evaluationType: GuidelineEvaluationType.COMPUTED,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled({targetElement}): GuidelineEvaluationResult {
    if (!targetElement) return {
      success: true
    };

    return EvaluationHelper.validateElementAndChildrenAgainstGuideline(targetElement, DOMHelper.elementDoesNotHaveHorizontalScroll);
  }
}
