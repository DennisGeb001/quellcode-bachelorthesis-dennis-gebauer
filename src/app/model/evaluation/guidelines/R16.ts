import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R16: Guideline = {
  id: 'R16',
  name: 'Wenn Komponenten zusammen in einem Cluster platziert werden, sollten Komponenten oder Arten von Komponenten genutzt werden, die jeweils mindestens eine 3:1 Kontrastrate zum Hintergrund haben',
  evaluationType: GuidelineEvaluationType.COMPUTED,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled(): GuidelineEvaluationResult {
    return {
      success: true
    };
  }
}
