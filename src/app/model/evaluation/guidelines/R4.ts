import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R4: Guideline = {
  id: 'R4',
  name: 'Keine Animationen verwenden',
  evaluationType: GuidelineEvaluationType.COMPUTED,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled(): GuidelineEvaluationResult {
    return {
      success: true
    };
  }
}
