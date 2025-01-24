import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R25: Guideline = {
  id: 'R25',
  name: 'Wichtige Seiten von der Startseite aus erreichbar machen',
  evaluationType: GuidelineEvaluationType.USER_INPUT,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled({userEvaluationInput}): GuidelineEvaluationResult {
    return {
      success: userEvaluationInput ?? false
    };
  }
}
