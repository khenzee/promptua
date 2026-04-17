'use client';

import { useTeleprompterStore } from '@/store/useTeleprompterStore';
import { Trash2, FileUp, Hash, Clock } from 'lucide-react';

export default function TeleprompterEditor() {
  const { text, setText } = useTeleprompterStore();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target?.result as string;
        setText(content);
      };
      reader.readAsText(file);
    }
  };

  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const readingTimeMinutes = Math.ceil(wordCount / 200);

  return (
    <div className="flex flex-col h-full bg-zinc-900/50 border-r border-zinc-800 backdrop-blur-sm">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800 bg-zinc-900/80">
        <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">Script Editor</h2>
        <div className="flex items-center gap-2">
          <label className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 rounded-lg cursor-pointer transition-colors">
            <FileUp className="w-3.5 h-3.5" />
            Import
            <input type="file" accept=".txt" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            onClick={() => setText('')}
            className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-zinc-300 bg-zinc-800 hover:bg-red-900/30 hover:text-red-400 rounded-lg transition-colors border border-transparent hover:border-red-900/50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            Clear
          </button>
        </div>
      </div>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your script here..."
        className="flex-1 p-6 bg-transparent text-zinc-200 resize-none focus:outline-none font-sans text-lg leading-relaxed placeholder:text-zinc-600"
      />

      <div className="flex items-center gap-6 p-4 border-t border-zinc-800 bg-zinc-900/80 text-zinc-400 text-xs font-medium">
        <div className="flex items-center gap-2">
          <Hash className="w-3.5 h-3.5 text-zinc-500" />
          <span>{wordCount.toLocaleString()} words</span>
        </div>
        <div className="flex items-center gap-2">
          <Clock className="w-3.5 h-3.5 text-zinc-500" />
          <span>~{readingTimeMinutes} min reading time</span>
        </div>
      </div>
    </div>
  );
}
