/**
 * Types and interfaces for the Ask My Docs Production RAG system.
 */

export interface Document {
  id: string;
  title: string;
  content: string;
  category: string;
  wordCount: number;
  createdAt: string;
}

export interface DocumentChunk {
  id: string;
  docId: string;
  docTitle: string;
  content: string;
  chunkIndex: number;
  embedding?: number[];
  length: number;
}

export interface RetrievalMetrics {
  bm25Score: number;
  vectorSimilarity: number;
  combinedScore: number;
  rerankScore?: number;
  rankBeforeRerank?: number;
  rankAfterRerank?: number;
}

export interface SearchResult {
  chunk: DocumentChunk;
  metrics: RetrievalMetrics;
}

export interface RAGConfig {
  chunkSize: number;
  chunkOverlap: number;
  bm25Weight: number; // alpha: weight of BM25 (0 to 1). Vector weight is 1 - alpha.
  topK: number;       // number of documents retrieved initially
  rerankK: number;    // number of documents passed to generator after reranking
  useReranking: boolean;
  minSimilarity: number;
}

export interface RAGResponse {
  query: string;
  answer: string;
  retrievedResults: SearchResult[];
  rerankedResults: SearchResult[];
  citations: string[];
  latency: {
    retrieval: number;
    reranking: number;
    generation: number;
    total: number;
  };
}

export interface EvalTestCase {
  id: string;
  query: string;
  expectedAnswer: string;
  category: string;
}

export interface EvalResult {
  testCaseId: string;
  query: string;
  expectedAnswer: string;
  actualAnswer: string;
  retrievedDocTitles: string[];
  metrics: {
    faithfulness: number;      // 0 to 100 or 1-5
    contextRelevance: number;  // 0 to 100 or 1-5
    answerRelevance: number;   // 0 to 100 or 1-5
    latency: number;           // ms
  };
  reasoning: {
    faithfulness: string;
    contextRelevance: string;
    answerRelevance: string;
  };
  passed: boolean;
}

export interface EvalBatchRun {
  id: string;
  timestamp: string;
  results: EvalResult[];
  config: RAGConfig;
  summary: {
    totalTests: number;
    passCount: number;
    passRate: number;
    avgFaithfulness: number;
    avgContextRelevance: number;
    avgAnswerRelevance: number;
    avgLatency: number;
  };
}
