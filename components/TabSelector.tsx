
import React from 'react';
import { GeneratorMode } from '../types';
import { VideoIcon } from './icons/VideoIcon';
import { ImageIcon } from './icons/ImageIcon';

interface TabSelectorProps {
  activeMode: GeneratorMode;
  onModeChange: (mode: GeneratorMode) => void;
}

const TabSelector: React.FC<TabSelectorProps> = ({ activeMode, onModeChange }) => {
  const getButtonClasses = (mode: GeneratorMode) => {
    const baseClasses =
      'flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm sm:text-base font-medium rounded-lg transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-purple-500';
    if (mode === activeMode) {
      return `${baseClasses} bg-purple-600 text-white shadow-lg`;
    }
    return `${baseClasses} bg-gray-700/50 text-gray-300 hover:bg-gray-700`;
  };

  return (
    <div className="max-w-md mx-auto bg-gray-800 p-1.5 rounded-xl flex space-x-2">
      <button
        onClick={() => onModeChange(GeneratorMode.VIDEO)}
        className={getButtonClasses(GeneratorMode.VIDEO)}
        aria-pressed={activeMode === GeneratorMode.VIDEO}
      >
        <VideoIcon className="w-5 h-5" />
        <span>Generar Vídeo</span>
      </button>
      <button
        onClick={() => onModeChange(GeneratorMode.IMAGE)}
        className={getButtonClasses(GeneratorMode.IMAGE)}
        aria-pressed={activeMode === GeneratorMode.IMAGE}
      >
        <ImageIcon className="w-5 h-5" />
        <span>Generar Imagen</span>
      </button>
    </div>
  );
};

export default TabSelector;
