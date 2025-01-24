import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R7: Guideline = {
  id: 'R7',
  name: 'Nicht willkürlich Komponenten austauschen, die nicht funktionell gleichwertig sind, beispielsweise einen Button mit einem Menü tauschen',
  evaluationType: GuidelineEvaluationType.USER_INPUT,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled({userEvaluationInput}): GuidelineEvaluationResult {
    return {
      success: userEvaluationInput ?? false
    };
  }
}
