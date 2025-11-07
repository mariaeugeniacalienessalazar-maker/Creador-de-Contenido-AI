import React, { useState, useEffect, useCallback } from 'react';
import { GeneratorMode } from './types';
import VideoGenerator from './components/VideoGenerator';
import ImageGenerator from './components/ImageGenerator';
import Header from './components/Header';
import TabSelector from './components/TabSelector';
import SelectKeyScreen from './components/SelectKeyScreen';
import PublishModal from './components/PublishModal';

// Fix: Replaced the named AIStudio interface with an inline type to resolve declaration merging issues for the global `window.aistudio` object.
declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const App: React.FC = () => {
  const [mode, setMode] = useState<GeneratorMode>(GeneratorMode.VIDEO);
  const [isKeyReady, setIsKeyReady] = useState<boolean>(false);
  const [checkingKey, setCheckingKey] = useState<boolean>(true);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const checkApiKey = useCallback(async () => {
    if (window.aistudio) {
      setCheckingKey(true);
      const hasKey = await window.aistudio.hasSelectedApiKey();
      setIsKeyReady(hasKey);
      setCheckingKey(false);
    } else {
      // Fallback for local development or if aistudio is not available
      setIsKeyReady(true);
      setCheckingKey(false);
    }
  }, []);

  useEffect(() => {
    checkApiKey();
  }, [checkApiKey]);

  const handleSelectKey = async () => {
    if(window.aistudio) {
      await window.aistudio.openSelectKey();
      // Optimistically assume key selection was successful to avoid race condition
      setIsKeyReady(true);
    }
  };

  const handleKeyError = useCallback(() => {
    setIsKeyReady(false);
  }, []);

  const renderContent = () => {
    if (checkingKey) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      );
    }

    if (mode === GeneratorMode.VIDEO && !isKeyReady) {
      return <SelectKeyScreen onSelectKey={handleSelectKey} />;
    }

    return mode === GeneratorMode.VIDEO ? (
      <VideoGenerator onKeyError={handleKeyError} />
    ) : (
      <ImageGenerator />
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans antialiased">
      <Header onPublishClick={() => setIsPublishModalOpen(true)} />
      <main className="container mx-auto px-4 py-8">
        <TabSelector activeMode={mode} onModeChange={setMode} />
        <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-700">
          {renderContent()}
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Creado con la magia de la IA de Google</p>
      </footer>
      <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} />
    </div>
  );
};

export default App;
