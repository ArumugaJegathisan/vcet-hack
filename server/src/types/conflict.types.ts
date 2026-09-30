export type ConflictType =
  | 'IMPORT_CONFLICT'
  | 'LOGIC_CONFLICT'
  | 'FUNCTION_CONFLICT'
  | 'VARIABLE_CONFLICT'
  | 'API_CONTRACT_CONFLICT'
  | 'DEPENDENCY_CONFLICT'
  | 'CONFIG_CONFLICT'
  | 'FORMATTING_CONFLICT'
  | 'UNKNOWN';

export interface ConflictHunk {
  file: string;
  language: string;
  ours: string;
  theirs: string;
  base?: string;
  startLine: number;
  endLine: number;
  surroundingCode?: string;
}

export interface ConflictContext {
  filePath: string;
  language: string;
  baseContent: string;
  oursContent: string; // Target branch
  theirsContent: string; // Source branch
  diffTargetAgainstBase?: string;
  diffSourceAgainstBase?: string;
  sourceBranch: string;
  targetBranch: string;
  sourceCommits?: string[];
  targetCommits?: string[];
  surroundingContext?: string;
  hunks: ConflictHunk[];
}

export interface IntentAnalysis {
  targetIntent: string;
  sourceIntent: string;
  combinedIntent: string;
}

export interface ChangeDescription {
  description: string;
  reason: string;
}

export interface ResolutionData {
  mergedCode: string;
  changes: ChangeDescription[];
}

export interface AIConflictAnalysisResult {
  status: 'RESOLVED' | 'NEEDS_HUMAN_REVIEW';
  confidence: number; // 0 - 100
  conflictType: ConflictType;
  summary: string;
  intentAnalysis: IntentAnalysis;
  resolution: ResolutionData;
  risks: string[];
  verificationSuggestions: string[];
}
