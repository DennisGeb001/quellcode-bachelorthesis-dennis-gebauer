import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R23: Guideline = {
  id: 'R23',
  name: 'Menüs nach Themen und Nutzungsszenarien Strukturieren um Suche zu vereinfachen',
  evaluationType: GuidelineEvaluationType.USER_INPUT,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled({userEvaluationInput}): GuidelineEvaluationResult {
    return {
      success: userEvaluationInput ?? false
    };
  }
}
