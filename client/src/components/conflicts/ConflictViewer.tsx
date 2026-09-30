import React, { useState } from 'react';
import { GitCompare, Edit3, Columns, SplitSquareVertical } from 'lucide-react';
import { ConflictItem } from '../../types/conflict.js';
import { DiffViewer } from './DiffViewer.js';
import { ResolutionPanel } from './ResolutionPanel.js';

export interface ConflictViewerProps {
  conflict: ConflictItem;
  isEditing: boolean;
  onEditToggle: () => void;
  onSaveModifiedResolution: (code: string) => Promise<void>;
}

export const ConflictViewer: React.FC<ConflictViewerProps> = ({
  conflict,
  isEditing,
  onEditToggle,
  onSaveModifiedResolution,
}) => {
  const [activeTab, setActiveTab] = useState<'diff' | 'theirs_ours' | 'base_proposed'>('diff');

  if (isEditing) {
    return (
      <ResolutionPanel
        conflict={conflict}
        onSaveModifiedResolution={onSaveModifiedResolution}
        onCancel={onEditToggle}
      />
    );
  }

  return (
    <div className="flex flex-col h-full overflow-hidden bg-[#0d1117]">
      {/* Top View Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-[#30363d] shrink-0">
        <div className="flex items-center gap-1 bg-[#0d1117] p-1 rounded-lg border border-[#30363d]">
          <button
            onClick={() => setActiveTab('diff')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'diff'
                ? 'bg-[#21262d] text-[#58a6ff] shadow-xs'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            Ours vs Proposed Resolution
          </button>

          <button
            onClick={() => setActiveTab('theirs_ours')}
            className={`px-3 py-1 rounded-md text-xs font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'theirs_ours'
                ? 'bg-[#21262d] text-[#58a6ff] shadow-xs'
                : 'text-[#8b949e] hover:text-[#c9d1d9]'
            }`}
          >
            <Columns className="w-3.5 h-3.5" />
            Ours vs Theirs
          </button>
        </div>

        <button
          onClick={onEditToggle}
          className="text-xs px-3 py-1.5 rounded-lg bg-[#21262d] hover:bg-[#30363d] text-[#c9d1d9] border border-[#30363d] transition-colors flex items-center gap-1.5"
        >
          <Edit3 className="w-3.5 h-3.5 text-[#58a6ff]" />
          Open in Editor
        </button>
      </div>

      {/* Editor Body */}
      <div className="flex-1 overflow-hidden p-2">
        {activeTab === 'diff' && (
          <DiffViewer
            originalContent={conflict.oursContent}
            modifiedContent={conflict.proposedResolution}
            language={conflict.language}
            originalTitle="Target Branch (Ours)"
            modifiedTitle="AI Proposed Merged Resolution"
          />
        )}

        {activeTab === 'theirs_ours' && (
          <DiffViewer
            originalContent={conflict.oursContent}
            modifiedContent={conflict.theirsContent}
            language={conflict.language}
            originalTitle="Target Branch (Ours)"
            modifiedTitle="Source Branch (Theirs)"
          />
        )}
      </div>
    </div>
  );
};
