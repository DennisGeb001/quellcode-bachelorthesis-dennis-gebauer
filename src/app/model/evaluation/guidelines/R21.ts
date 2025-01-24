import {Guideline} from "../Guideline";
import {GuidelineEvaluationType} from "../../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../../enum/ConfigurationComponent";
import {GuidelineEvaluationResult} from "../GuidelineEvaluationResult";

export const R21: Guideline = {
  id: 'R21',
  name: 'Nur eine Navigationsebene für ein Menü nutzen',
  evaluationType: GuidelineEvaluationType.COMPUTED,
  targetComponents: [ConfigurationComponent.TOOLBAR],
  isFulfilled(): GuidelineEvaluationResult {
    return {
      success: true
    };
  }
}
