import React, { useState } from 'react';
import { Download, Loader2, Wand2, AlertCircle } from 'lucide-react';
import { generateImage } from '../services/geminiService';

const ImagineView: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const base64Img = await generateImage(prompt);
      setGeneratedImage(base64Img);
    } catch (err: any) {
      setError(err.message || "Failed to generate image.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `nebula-generated-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="max-w-3xl mx-auto w-full p-6 flex flex-col h-full gap-8">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          AI Image Generator
        </h2>
        <p className="text-slate-400">Powered by Gemini 2.5 Flash Image</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          placeholder="Describe the image you want to create..."
          className="flex-1 bg-slate-800 text-slate-100 placeholder-slate-500 rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />
        <button
          onClick={handleGenerate}
          disabled={!prompt.trim() || isLoading}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium px-6 py-3 rounded-xl transition-all flex items-center gap-2 whitespace-nowrap"
        >
          {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Wand2 className="w-5 h-5" />}
          <span className="hidden sm:inline">Generate</span>
        </button>
      </div>

      <div className="flex-1 bg-slate-900/50 rounded-2xl border-2 border-dashed border-slate-800 flex items-center justify-center relative overflow-hidden group min-h-[400px]">
        {isLoading && (
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm flex flex-col items-center justify-center z-20">
            <Loader2 className="w-12 h-12 text-purple-500 animate-spin mb-4" />
            <p className="text-slate-300 font-medium animate-pulse">Dreaming up your image...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center text-red-400 p-4 text-center">
            <AlertCircle className="w-12 h-12 mb-2 opacity-80" />
            <p>{error}</p>
          </div>
        )}

        {generatedImage ? (
          <div className="relative w-full h-full flex items-center justify-center p-4">
             {/* eslint-disable-next-line jsx-a11y/alt-text */}
            <img 
              src={generatedImage} 
              className="max-w-full max-h-full rounded-lg shadow-2xl shadow-purple-900/20"
              alt="Generated Output"
            />
            <button
              onClick={handleDownload}
              className="absolute bottom-6 right-6 bg-slate-900/90 text-white p-3 rounded-full hover:bg-purple-600 transition-colors shadow-lg border border-slate-700"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        ) : (
          !isLoading && !error && (
            <div className="text-center text-slate-600">
              <Wand2 className="w-16 h-16 mx-auto mb-4 opacity-20" />
              <p>Enter a prompt to start creating</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ImagineView;