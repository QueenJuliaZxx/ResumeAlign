import React, { useCallback, useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface UploadZoneProps {
  onUpload: (file: File) => void;
  accept?: string;
  maxSize?: number;
  disabled?: boolean;
}

export const UploadZone: React.FC<UploadZoneProps> = ({
  onUpload,
  accept = '.pdf,.docx,.doc',
  maxSize = 10 * 1024 * 1024,
  disabled = false,
}) => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((selectedFile: File) => {
    setError(null);
    
    if (selectedFile.size > maxSize) {
      setError(`文件大小不能超过 ${maxSize / 1024 / 1024}MB`);
      return;
    }

    const allowedTypes = accept.split(',').map(t => t.trim().toLowerCase());
    const fileExt = '.' + selectedFile.name.split('.').pop()?.toLowerCase();
    
    if (!allowedTypes.includes(fileExt)) {
      setError(`仅支持 ${accept} 格式`);
      return;
    }

    setFile(selectedFile);
    onUpload(selectedFile);
  }, [onUpload, maxSize, accept]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;

    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      handleFile(droppedFile);
    }
  }, [disabled, handleFile]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      handleFile(selectedFile);
    }
  }, [handleFile]);

  const clearFile = useCallback(() => {
    setFile(null);
    setError(null);
  }, []);

  if (file) {
    return (
      <div className="border-2 border-dashed border-indigo-200 rounded-xl p-8 bg-indigo-50/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center">
              <FileText className="w-6 h-6 text-indigo-500" />
            </div>
            <div>
              <p className="font-medium text-slate-800">{file.name}</p>
              <p className="text-sm text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            onClick={clearFile}
            className="p-2 hover:bg-indigo-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
        dragOver
          ? 'border-indigo-400 bg-indigo-50'
          : 'border-slate-200 hover:border-indigo-300 hover:bg-slate-50'
      } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
      onDragOver={(e) => { e.preventDefault(); if (!disabled) setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
      onClick={() => document.getElementById('file-upload')?.click()}
    >
      <input
        id="file-upload"
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
        disabled={disabled}
      />
      <Upload className="w-12 h-12 mx-auto mb-4 text-slate-400" />
      <p className="text-lg font-medium text-slate-700 mb-2">
        拖拽简历文件或点击上传
      </p>
      <p className="text-sm text-slate-500 mb-4">
        支持 PDF、DOCX 格式，文件大小不超过 10MB
      </p>
      <span className="inline-block px-4 py-2 bg-indigo-500 text-white rounded-lg text-sm font-medium">
        选择文件
      </span>
      {error && (
        <p className="mt-4 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
