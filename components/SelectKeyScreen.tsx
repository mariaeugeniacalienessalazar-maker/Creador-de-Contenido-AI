
import React from 'react';
import { KeyIcon } from './icons/KeyIcon';

interface SelectKeyScreenProps {
  onSelectKey: () => void;
}

const SelectKeyScreen: React.FC<SelectKeyScreenProps> = ({ onSelectKey }) => {
  return (
    <div className="text-center py-10 px-6 bg-gray-800 rounded-xl border border-purple-800/50">
      <div className="mx-auto bg-purple-900/50 h-16 w-16 rounded-full flex items-center justify-center border-2 border-purple-600">
        <KeyIcon className="h-8 w-8 text-purple-300" />
      </div>
      <h2 className="mt-6 text-2xl font-bold text-white">Se requiere una clave de API</h2>
      <p className="mt-3 text-gray-300 max-w-md mx-auto">
        Para usar el generador de video, primero debes seleccionar tu propia clave de API de Google AI Studio. El uso de esta función puede generar cargos en tu cuenta.
      </p>
      <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
        <button
          onClick={onSelectKey}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
        >
          Seleccionar Clave de API
        </button>
        <a
          href="https://ai.google.dev/gemini-api/docs/billing"
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-400 hover:text-purple-300 transition-colors"
        >
          Más información sobre la facturación
        </a>
      </div>
    </div>
  );
};

export default SelectKeyScreen;
