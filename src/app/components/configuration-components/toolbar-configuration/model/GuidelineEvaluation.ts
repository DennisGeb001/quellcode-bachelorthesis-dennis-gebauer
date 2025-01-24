import {Guideline} from "../../../../model/evaluation/Guideline";
import {GuidelineEvaluationResult} from "../../../../model/evaluation/GuidelineEvaluationResult";

export interface GuidelineEvaluation {
  guideline: Guideline;
  evaluationResult?: GuidelineEvaluationResult;
}
