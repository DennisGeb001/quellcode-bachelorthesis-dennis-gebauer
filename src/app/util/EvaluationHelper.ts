import {GuidelineEvaluationResult} from "../model/evaluation/GuidelineEvaluationResult";

export class EvaluationHelper {
  static validateElementAndChildrenAgainstGuideline(element: HTMLElement, guideline: (targetElement: HTMLElement, ...args: any[]) => boolean, ...args: any[]): GuidelineEvaluationResult {

    const elementGuidelineResult = guideline(element, ...args);
    const rootElementResult: GuidelineEvaluationResult = {
      success: elementGuidelineResult,
      failureElements: elementGuidelineResult ? undefined : [element]
    };

    if (element.children.length === 0) return rootElementResult;

    const childResults = Array.from(element.children).map(child => this.validateElementAndChildrenAgainstGuideline(child as HTMLElement, guideline, ...args));

    const childrenViolatingGuideline = childResults.filter(element => !element.success);

    if (childrenViolatingGuideline.length > 0) {
      const failureElements: HTMLElement[] = childrenViolatingGuideline.map(childResult => childResult.failureElements)
        .filter(failureElements => !!failureElements)
        .flat();

      rootElementResult.success = false;

      if (!rootElementResult.failureElements) rootElementResult.failureElements = [];

      rootElementResult.failureElements?.push(...failureElements)
    }

    return rootElementResult;
  }
}
