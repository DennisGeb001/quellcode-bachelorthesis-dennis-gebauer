import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R30: Guideline = {
  id: 'R30',
  name: 'Die einzelnen Komponenten, die innerhalb der App-Bar aktiviert werden können, erben Pressed-Zustände, nicht die gesamte App-Bar',
  evaluationType: GuidelineEvaluationType.COMPUTED,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled(): GuidelineEvaluationResult {
    return {
      success: true
    };
  }
}
