import React, { useState, useRef } from 'react';
import { Upload, X, Loader2, Sparkles, Image as ImageIcon } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';

const VisionView: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setResult('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setSelectedImage(null);
    setResult('');
    setPrompt('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleAnalyze = async () => {
    if (!selectedImage || isLoading) return;

    setIsLoading(true);
    setResult('');
    try {
      const text = await analyzeImage(selectedImage, prompt);
      setResult(text || "No analysis returned.");
    } catch (error) {
      setResult("Error analyzing image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full p-6 h-full overflow-y-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
        {/* Input Section */}
        <div className="flex flex-col gap-4">
          <div className="bg-slate-800 rounded-2xl border-2 border-dashed border-slate-700 hover:border-indigo-500/50 transition-colors p-4 flex flex-col items-center justify-center min-h-[300px] relative overflow-hidden group">
            {selectedImage ? (
              <>
                <img 
                  src={selectedImage} 
                  alt="Preview" 
                  className="w-full h-full object-contain rounded-lg z-10" 
                />
                <button 
                  onClick={handleClear}
                  className="absolute top-2 right-2 bg-slate-900/80 p-2 rounded-full text-white hover:bg-red-500/80 transition-colors z-20"
                >
                  <X size={16} />
                </button>
              </>
            ) : (
              <div 
                className="text-center cursor-pointer w-full h-full flex flex-col items-center justify-center"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-16 h-16 bg-slate-700/50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Upload className="w-8 h-8 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold text-slate-200">Upload an Image</h3>
                <p className="text-sm text-slate-500 mt-2">JPG, PNG, WebP supported</p>
              </div>
            )}
            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              onChange={handleFileChange} 
              className="hidden" 
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium text-slate-400">Question or Prompt (Optional)</label>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="What's in this image?"
              className="w-full bg-slate-800 text-slate-100 rounded-xl px-4 py-3 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 h-24 resize-none"
            />
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!selectedImage || isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                Analyze Image
              </>
            )}
          </button>
        </div>

        {/* Output Section */}
        <div className="bg-slate-800/50 rounded-2xl border border-slate-700 p-6 overflow-y-auto min-h-[300px]">
          {result ? (
            <div className="prose prose-invert max-w-none">
              <h3 className="text-lg font-semibold text-indigo-400 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4" /> Analysis Result
              </h3>
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-slate-600">
              <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
              <p>Upload an image to see the analysis here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VisionView;