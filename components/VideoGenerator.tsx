
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenAI } from "@google/genai";
import { VideoOperation } from '../types';

interface VideoGeneratorProps {
  onKeyError: () => void;
}

const loadingMessages = [
  "Iniciando la generación de tu video...",
  "El modelo Veo está calentando motores...",
  "Creando los primeros fotogramas...",
  "Renderizando la magia, esto puede tardar unos minutos...",
  "Casi listo, aplicando los toques finales..."
];

const VideoGenerator: React.FC<VideoGeneratorProps> = ({ onKeyError }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '9:16'>('16:9');
  const [resolution, setResolution] = useState<'720p' | '1080p'>('1080p');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingMessage, setLoadingMessage] = useState<string>(loadingMessages[0]);
  const [error, setError] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  
  const pollingIntervalRef = useRef<number | null>(null);
  const loadingMessageIntervalRef = useRef<number | null>(null);

  const cleanupIntervals = useCallback(() => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
    if (loadingMessageIntervalRef.current) {
      clearInterval(loadingMessageIntervalRef.current);
      loadingMessageIntervalRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      cleanupIntervals();
    };
  }, [cleanupIntervals]);

  const pollOperation = useCallback(async (operation: VideoOperation, ai: GoogleGenAI) => {
    pollingIntervalRef.current = window.setInterval(async () => {
      try {
        const updatedOperation = await ai.operations.getVideosOperation({ operation: operation });
        if (updatedOperation.done) {
          cleanupIntervals();
          const uri = updatedOperation.response?.generatedVideos?.[0]?.video?.uri;
          if (uri && process.env.API_KEY) {
            const videoResponse = await fetch(`${uri}&key=${process.env.API_KEY}`);
            const videoBlob = await videoResponse.blob();
            setVideoUrl(URL.createObjectURL(videoBlob));
          } else {
            setError('No se pudo obtener la URL del video generado.');
          }
          setIsLoading(false);
        }
      } catch (err) {
        cleanupIntervals();
        setIsLoading(false);
        setError('Ocurrió un error al verificar el estado de la generación del video.');
        console.error(err);
      }
    }, 10000); // Poll every 10 seconds
  }, [cleanupIntervals]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setVideoUrl(null);
    setLoadingMessage(loadingMessages[0]);
    let messageIndex = 0;
    loadingMessageIntervalRef.current = window.setInterval(() => {
        messageIndex = (messageIndex + 1) % loadingMessages.length;
        setLoadingMessage(loadingMessages[messageIndex]);
    }, 5000);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        prompt: prompt,
        config: {
          numberOfVideos: 1,
          resolution: resolution,
          aspectRatio: aspectRatio,
        },
      });
      pollOperation(operation, ai);
    } catch (err: any) {
        cleanupIntervals();
        setIsLoading(false);
        if (err.message && err.message.includes("Requested entity was not found")) {
            setError("La clave de API no es válida o no tiene los permisos necesarios. Por favor, selecciona una clave válida.");
            onKeyError();
        } else {
            setError('Ocurrió un error al iniciar la generación del video.');
        }
        console.error(err);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400 mb-6">
        Generador de Vídeo con Veo 3.1
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Describe lo que quieres ver en tu vídeo
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: Un astronauta montando a caballo en Marte, estilo cinematográfico."
            className="w-full h-32 p-3 bg-gray-700/50 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Resolución</label>
            <div className="flex bg-gray-700/50 border border-gray-600 rounded-lg p-1">
              {['1080p', '720p'].map((res) => (
                <button
                  key={res} type="button" onClick={() => setResolution(res as '1080p' | '720p')}
                  disabled={isLoading}
                  className={`flex-1 py-2 text-sm rounded-md transition ${resolution === res ? 'bg-purple-600' : 'hover:bg-gray-600'}`}>
                  {res}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Relación de Aspecto</label>
            <div className="flex bg-gray-700/50 border border-gray-600 rounded-lg p-1">
              {['16:9', '9:16'].map((ar) => (
                <button
                  key={ar} type="button" onClick={() => setAspectRatio(ar as '16:9' | '9:16')}
                  disabled={isLoading}
                  className={`flex-1 py-2 text-sm rounded-md transition ${aspectRatio === ar ? 'bg-purple-600' : 'hover:bg-gray-600'}`}>
                  {ar}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              <span>Generando...</span>
            </>
          ) : (
            '✨ Generar Vídeo'
          )}
        </button>
      </form>

      {isLoading && (
        <div className="mt-8 text-center p-4 bg-gray-700/50 rounded-lg">
          <p className="text-purple-300">{loadingMessage}</p>
          <p className="text-sm text-gray-400 mt-2">La generación de video puede tomar varios minutos. Por favor, ten paciencia.</p>
        </div>
      )}

      {error && (
        <div className="mt-8 text-center p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {videoUrl && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-center mb-4">¡Tu vídeo está listo!</h3>
          <video
            src={videoUrl}
            controls
            autoPlay
            loop
            className="w-full max-w-2xl mx-auto rounded-lg shadow-2xl border-2 border-purple-500"
          />
          <div className="text-center mt-4">
             <a href={videoUrl} download="video-generado.mp4" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Descargar Vídeo
             </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoGenerator;
