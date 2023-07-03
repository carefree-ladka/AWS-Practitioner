export interface AWSCloudPractitioner {
  _class: string;
  id: number;
  assessment_type: string;
  prompt: Prompt;
  correct_response: string[];
  section: string;
  question_plain: string;
  related_lectures: any[];
  showAnswer: boolean;
}

export interface Prompt {
  feedbacks: string[];
  answers: string[];
  question: string;
  relatedLectureIds: string;
  explanation: string;
}
