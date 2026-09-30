import React from 'react';
import { Check, Edit3, X, HelpCircle, Sparkles } from 'lucide-react';
import { ConflictItem } from '../../types/conflict.js';
import { ConfidenceBadge } from './ConfidenceBadge.js';
import { AIReasoning } from './AIReasoning.js';
import { ResolutionExplanation } from './ResolutionExplanation.js';
import { Button } from '../common/Button.js';

export interface AIAnalysisProps {
  conflict: ConflictItem;
  onAccept: () => void;
  onEditToggle: () => void;
  onReject: () => void;
  onMarkReview: () => void;
  isEditing: boolean;
  isProcessing: boolean;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({
  conflict,
  onAccept,
  onEditToggle,
  onReject,
  onMarkReview,
  isEditing,
  isProcessing,
}) => {
  return (
    <div className="flex flex-col h-full bg-[#161b22] border-l border-[#30363d] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-[#30363d] bg-[#181d24] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#a371f7]" />
          <h3 className="text-sm font-semibold text-white">AI Intent Analysis</h3>
        </div>
        <ConfidenceBadge confidence={conflict.confidence} />
      </div>

      {/* Content scroll area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        <AIReasoning conflict={conflict} />
        <ResolutionExplanation conflict={conflict} />
      </div>

      {/* Human In The Loop Action Bar */}
      <div className="p-4 border-t border-[#30363d] bg-[#181d24] space-y-2 shrink-0">
        <div className="text-[11px] font-semibold uppercase tracking-wider text-[#8b949e]">
          Human Approval Required
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="success"
            size="sm"
            onClick={onAccept}
            loading={isProcessing}
            icon={<Check className="w-3.5 h-3.5" />}
          >
            Accept Resolution
          </Button>

          <Button
            variant={isEditing ? 'primary' : 'secondary'}
            size="sm"
            onClick={onEditToggle}
            icon={<Edit3 className="w-3.5 h-3.5" />}
          >
            {isEditing ? 'Close Editor' : 'Edit Resolution'}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={onMarkReview}
            icon={<HelpCircle className="w-3.5 h-3.5" />}
          >
            Needs Review
          </Button>

          <Button
            variant="danger"
            size="sm"
            onClick={onReject}
            icon={<X className="w-3.5 h-3.5" />}
          >
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
};
