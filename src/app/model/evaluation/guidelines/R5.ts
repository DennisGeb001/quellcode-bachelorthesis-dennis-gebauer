import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R5: Guideline = {
  id: 'R5',
  name: 'Einheitliches Design für unterschiedliche Repräsentationen des Produkts verwenden (z.B. mobile Ansicht und Desktop Ansicht)',
  evaluationType: GuidelineEvaluationType.USER_INPUT,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled({userEvaluationInput}): GuidelineEvaluationResult {
    return {
      success: userEvaluationInput ?? false
    };
  }
}
