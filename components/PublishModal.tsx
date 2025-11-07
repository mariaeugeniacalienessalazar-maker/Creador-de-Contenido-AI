import React from 'react';
import { CloseIcon } from './icons/CloseIcon';
import { DownloadIcon } from './icons/DownloadIcon';
import { NetlifyIcon } from './icons/NetlifyIcon';
import { VercelIcon } from './icons/VercelIcon';
import { KeyIcon } from './icons/KeyIcon';


interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PublishModal: React.FC<PublishModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div
        className="bg-gray-800 border border-gray-700 rounded-2xl shadow-2xl max-w-2xl w-full p-8 relative transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
      >
        <style>{`
          @keyframes fade-in-scale {
            0% { transform: scale(0.95); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }
          .animate-fade-in-scale {
            animation: fade-in-scale 0.3s forwards cubic-bezier(0.16, 1, 0.3, 1);
          }
        `}</style>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
          aria-label="Cerrar modal"
        >
          <CloseIcon className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
          ¡Publica tu Aplicación!
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Comparte tu creación con el mundo siguiendo estos pasos.
        </p>

        <div className="space-y-6">
          {/* Step 1 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-purple-900/50 h-10 w-10 rounded-full flex items-center justify-center border-2 border-purple-600 text-purple-300 font-bold text-lg">1</div>
            <div>
              <h3 className="font-semibold text-white">Descarga el Código Fuente</h3>
              <p className="text-gray-400 text-sm">
                Usa el botón "Download" en la interfaz de AI Studio para obtener todos los archivos de tu proyecto en un archivo ZIP.
              </p>
            </div>
          </div>
          
          {/* Step 2 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-purple-900/50 h-10 w-10 rounded-full flex items-center justify-center border-2 border-purple-600 text-purple-300 font-bold text-lg">2</div>
            <div>
              <h3 className="font-semibold text-white">Elige una Plataforma de Hosting</h3>
              <p className="text-gray-400 text-sm mb-3">
                Sube tu código a una de estas plataformas gratuitas y fáciles de usar.
              </p>
              <div className="flex gap-4">
                <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-900 border border-gray-700 rounded-lg hover:border-white transition-colors">
                  <VercelIcon className="w-5 h-5"/> Vercel
                </a>
                <a href="https://netlify.com" target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 p-3 bg-gray-900 border border-gray-700 rounded-lg hover:border-cyan-400 transition-colors">
                  <NetlifyIcon className="w-5 h-5" /> Netlify
                </a>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 bg-purple-900/50 h-10 w-10 rounded-full flex items-center justify-center border-2 border-purple-600 text-purple-300 font-bold text-lg">3</div>
            <div>
              <h3 className="font-semibold text-white">Configura tu Clave de API</h3>
              <p className="text-gray-400 text-sm">
                En la configuración de tu proyecto en Vercel o Netlify, añade una "Variable de Entorno" llamada <code className="bg-gray-900 text-pink-400 px-1 py-0.5 rounded text-xs">API_KEY</code> y pega tu clave. ¡Esto es crucial para que funcione!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PublishModal;
