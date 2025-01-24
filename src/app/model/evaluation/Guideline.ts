import {GuidelineEvaluationType} from "../enum/GuidelineEvaluationType";
import {ConfigurationComponent} from "../enum/ConfigurationComponent";
import {GuidelineParams} from "./GuidelineParams";
import {GuidelineEvaluationResult} from "./GuidelineEvaluationResult";

export interface Guideline {
  id: string;
  name: string;
  evaluationType: GuidelineEvaluationType;
  targetComponents: ConfigurationComponent[];
  isFulfilled: (params: GuidelineParams) => GuidelineEvaluationResult;
}
