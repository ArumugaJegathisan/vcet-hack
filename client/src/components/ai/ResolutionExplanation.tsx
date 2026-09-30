import React from 'react';
import { AlertTriangle, CheckSquare, ListPlus, Info } from 'lucide-react';
import { ConflictItem } from '../../types/conflict.js';

export interface ResolutionExplanationProps {
  conflict: ConflictItem;
}

export const ResolutionExplanation: React.FC<ResolutionExplanationProps> = ({ conflict }) => {
  const { summary, changes, risks, verificationSuggestions } = conflict.aiExplanation;

  return (
    <div className="space-y-4">
      {/* Summary */}
      <div className="p-3.5 rounded-lg bg-[#0d1117] border border-[#30363d] space-y-1">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#58a6ff]">
          <Info className="w-3.5 h-3.5" />
          <span>Resolution Summary</span>
        </div>
        <p className="text-xs text-[#c9d1d9] leading-relaxed">{summary}</p>
      </div>

      {/* Changes Breakdown */}
      {changes && changes.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#8b949e]">
            <ListPlus className="w-3.5 h-3.5 text-[#a371f7]" />
            <span>Applied Transformations</span>
          </div>
          <div className="space-y-1.5">
            {changes.map((c, i) => (
              <div
                key={i}
                className="p-2.5 rounded-md bg-[#0d1117] border border-[#30363d] text-xs space-y-1"
              >
                <p className="font-medium text-[#c9d1d9]">{c.description}</p>
                <p className="text-[11px] text-[#8b949e] italic">{c.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Potential Risks */}
      {risks && risks.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#d29922]">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Behavioral Considerations</span>
          </div>
          <ul className="space-y-1 text-xs text-[#c9d1d9]">
            {risks.map((r, i) => (
              <li key={i} className="flex items-start gap-2 p-2 rounded bg-[#d29922]/5 border border-[#d29922]/20">
                <span className="text-[#d29922] mt-0.5">•</span>
                <span className="leading-snug">{r}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Verification Suggestions */}
      {verificationSuggestions && verificationSuggestions.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#3fb950]">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Recommended Sanity Checks</span>
          </div>
          <ul className="space-y-1 text-xs text-[#c9d1d9]">
            {verificationSuggestions.map((v, i) => (
              <li key={i} className="flex items-start gap-2 p-2 rounded bg-[#238636]/5 border border-[#238636]/20">
                <span className="text-[#3fb950] mt-0.5">✓</span>
                <span className="leading-snug">{v}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
