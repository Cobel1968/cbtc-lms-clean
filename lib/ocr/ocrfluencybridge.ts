export interface HandwritingAnalysisResult {
  confidence: number;
  text: string;
  fluencyScore?: number;
}

export const analyzeHandwriting = async (imageUrl: string): Promise<HandwritingAnalysisResult> => {
  return { confidence: 0, text: '', fluencyScore: 0 };
};

export default { analyzeHandwriting };