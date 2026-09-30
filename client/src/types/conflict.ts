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

export interface ConflictItem {
  _id: string;
  sessionId: string;
  filePath: string;
  language: string;
  baseContent: string;
  oursContent: string;
  theirsContent: string;
  diffTargetAgainstBase?: string;
  diffSourceAgainstBase?: string;
  proposedResolution: string;
  confidence: number;
  conflictType: ConflictType;
  aiExplanation: {
    summary: string;
    targetIntent: string;
    sourceIntent: string;
    combinedIntent: string;
    risks: string[];
    verificationSuggestions: string[];
    changes?: Array<{ description: string; reason: string }>;
  };
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'APPLIED';
  resolutionSource: 'ai_approved' | 'human_modified' | 'human_required';
  createdAt: string;
  updatedAt: string;
}
