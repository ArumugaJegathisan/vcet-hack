import { ConflictContext } from '../../types/conflict.types.js';

export const SYSTEM_PROMPT = `You are an expert software engineer and technical architect specializing in Git merge conflict resolution.

Your responsibility is to understand the true engineering intent of two divergent branches and propose the safest possible combined implementation.

GUIDING PRINCIPLES:
1. NEVER blindly prefer one branch over the other (do not simply pick "ours" or "theirs").
2. Understand the common base behavior, what Target (Ours) was trying to achieve, and what Source (Theirs) was trying to achieve.
3. Synthesize a unified resolution that preserves the intended behavior of BOTH branches whenever compatible.
4. Classify whether changes are:
   - Independent (both can exist side-by-side)
   - Overlapping (modifying the same logical flow or function signature)
   - Complementary (e.g. one adds validation, the other adds retry handling or logging)
   - Contradictory (mutually exclusive product decisions)
5. NEVER invent APIs, variables, functions, imports, or external dependencies without direct evidence in the provided context.
6. Check for subtle integration risks:
   - Async/await or promise mismatch
   - Missing error handling or altered exception types
   - Renamed or omitted variables
   - Scope issues
7. If the conflict cannot be safely resolved with high confidence due to contradictory business logic or missing context, set "status": "NEEDS_HUMAN_REVIEW" and give confidence < 70.
8. Your entire output MUST BE A SINGLE, VALID JSON OBJECT matching the requested schema. Do not include markdown code block backticks outside the JSON.`;

export function buildConflictResolutionPrompt(context: ConflictContext): string {
  return `Please analyze and resolve this Git merge conflict:

FILE: ${context.filePath}
LANGUAGE: ${context.language}
TARGET BRANCH (Ours): ${context.targetBranch}
SOURCE BRANCH (Theirs): ${context.sourceBranch}

${context.targetCommits && context.targetCommits.length > 0 ? `RECENT TARGET COMMITS:\n${context.targetCommits.join('\n')}\n` : ''}
${context.sourceCommits && context.sourceCommits.length > 0 ? `RECENT SOURCE COMMITS:\n${context.sourceCommits.join('\n')}\n` : ''}

==================== COMMON BASE VERSION ====================
${context.baseContent || '(Base file empty or not available)'}

==================== TARGET BRANCH (OURS) VERSION ====================
${context.oursContent || '(Empty)'}

==================== SOURCE BRANCH (THEIRS) VERSION ====================
${context.theirsContent || '(Empty)'}

${context.diffTargetAgainstBase ? `==================== TARGET DIFF AGAINST BASE ====================\n${context.diffTargetAgainstBase}\n` : ''}
${context.diffSourceAgainstBase ? `==================== SOURCE DIFF AGAINST BASE ====================\n${context.diffSourceAgainstBase}\n` : ''}

${
  context.hunks && context.hunks.length > 0
    ? `==================== CONFLICT HUNKS ====================\n` +
      context.hunks
        .map(
          (h, idx) =>
            `Hunk #${idx + 1} (Lines ${h.startLine}-${h.endLine}):\n<<<<<<< ${context.targetBranch} (OURS)\n${h.ours}\n=======\n${h.theirs}\n>>>>>>> ${context.sourceBranch} (THEIRS)\n`
        )
        .join('\n')
    : ''
}

Respond ONLY with a JSON object strictly matching this schema:
{
  "status": "RESOLVED" | "NEEDS_HUMAN_REVIEW",
  "confidence": <integer between 0 and 100>,
  "conflictType": "IMPORT_CONFLICT" | "LOGIC_CONFLICT" | "FUNCTION_CONFLICT" | "VARIABLE_CONFLICT" | "API_CONTRACT_CONFLICT" | "DEPENDENCY_CONFLICT" | "CONFIG_CONFLICT" | "FORMATTING_CONFLICT" | "UNKNOWN",
  "summary": "<Clear explanation of why the conflict happened and how it is resolved>",
  "intentAnalysis": {
    "targetIntent": "<What the target branch author was trying to achieve>",
    "sourceIntent": "<What the source branch author was trying to achieve>",
    "combinedIntent": "<How the resolution harmonizes both requirements>"
  },
  "resolution": {
    "mergedCode": "<COMPLETE resolved file content with NO conflict markers, valid syntax, ready to be written to disk>",
    "changes": [
      {
        "description": "<What was changed>",
        "reason": "<Why this change was necessary>"
      }
    ]
  },
  "risks": [
    "<Specific potential risk or side-effect to verify>",
    "<Another risk if any>"
  ],
  "verificationSuggestions": [
    "<Specific test case, command, or sanity check the developer should perform>"
  ]
}`;
}
