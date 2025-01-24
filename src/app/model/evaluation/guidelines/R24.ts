import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R24: Guideline = {
  id: 'R24',
  name: 'Pull-Down/Drop-Down Menüs vermeiden',
  evaluationType: GuidelineEvaluationType.COMPUTED,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled(): GuidelineEvaluationResult {
    return {
      success: true
    };
  }
}
