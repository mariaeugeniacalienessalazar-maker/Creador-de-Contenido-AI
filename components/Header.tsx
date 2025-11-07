import React from 'react';
import { SparklesIcon } from './icons/SparklesIcon';
import { UploadCloudIcon } from './icons/UploadCloudIcon';

interface HeaderProps {
    onPublishClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onPublishClick }) => {
  return (
    <header className="py-4 bg-gray-900/80 backdrop-blur-lg border-b border-gray-700/50 sticky top-0 z-10">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex-1"></div>
        <div className="flex-1 flex items-center justify-center">
            <SparklesIcon className="w-8 h-8 mr-3 text-purple-400" />
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 whitespace-nowrap">
            Creador de Contenido IA
            </h1>
        </div>
        <div className="flex-1 flex justify-end">
             <button
                onClick={onPublishClick}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-gray-700/50 rounded-lg border border-gray-600 hover:bg-gray-700 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900 focus-visible:ring-purple-500"
                aria-label="Publicar aplicación"
             >
                <UploadCloudIcon className="w-5 h-5" />
                <span className="hidden sm:inline">Publicar</span>
            </button>
        </div>
      </div>
    </header>
  );
};

export default Header;