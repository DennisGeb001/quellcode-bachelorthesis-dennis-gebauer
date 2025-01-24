import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R13: Guideline = {
  id: 'R13',
  name: 'Den Nutzern ausreichend Zeit zum Lesen von Informationen geben',
  evaluationType: GuidelineEvaluationType.USER_INPUT,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled({userEvaluationInput}): GuidelineEvaluationResult {
    return {
      success: userEvaluationInput ?? false
    };
  }
}
