export enum ViewState {
  LANDING = 'LANDING',
  GENERATING = 'GENERATING',
  RESULT = 'RESULT',
}

export interface AppState {
  view: ViewState;
  input: string;
  result: string | null;
  error: string | null;
}

export interface PromptRequest {
  text: string;
}
