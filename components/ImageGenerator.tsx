
import React, { useState } from 'react';
import { GoogleGenAI } from "@google/genai";

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateImages({
        model: 'imagen-4.0-generate-001',
        prompt: prompt,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });

      const base64ImageBytes = response.generatedImages[0].image.imageBytes;
      const dataUrl = `data:image/jpeg;base64,${base64ImageBytes}`;
      setImageUrl(dataUrl);

    } catch (err) {
      setError('Ocurrió un error al generar la imagen. Por favor, intenta de nuevo.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-400 mb-6">
        Generador de Imágenes
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="image-prompt" className="block text-sm font-medium text-gray-300 mb-2">
            Describe la imagen que quieres crear
          </label>
          <textarea
            id="image-prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: Un gato con sombrero de mago leyendo un libro antiguo, arte digital."
            className="w-full h-32 p-3 bg-gray-700/50 border border-gray-600 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            required
            disabled={isLoading}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full flex justify-center items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
              <span>Generando...</span>
            </>
          ) : (
            '🎨 Generar Imagen'
          )}
        </button>
      </form>

      {error && (
        <div className="mt-8 text-center p-4 bg-red-900/50 text-red-300 border border-red-700 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      {imageUrl && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-center mb-4">¡Tu imagen está lista!</h3>
          <div className="flex justify-center">
            <img
              src={imageUrl}
              alt={prompt}
              className="max-w-full h-auto max-h-[60vh] object-contain rounded-lg shadow-2xl border-2 border-blue-500"
            />
          </div>
          <div className="text-center mt-4">
             <a href={imageUrl} download="imagen-generada.jpg" className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg transition-colors">
                Descargar Imagen
             </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;
