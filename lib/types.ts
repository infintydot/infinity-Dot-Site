export interface StyleData {
  no: number;
  name: string;

  styleCategory?: string;
  type: string;
  keywords?: string;
  primaryColors?: string;
  secondaryColors?: string;
  description: string;
  effectsAnimation?: string;
  bestFor?: string;
  doNotUseFor?: string;
  lightMode?: string;
  darkMode?: string;
  performance?: string;
  accessibility?: string;
  mobileFriendly?: string;
  conversionFocused?: string;
  frameworkCompatibility?: string;
  eraOrigin?: string;
  complexity?: string;
  aiPromptKeywords?: string;
  cssTechnicalKeywords?: string;
  implementationChecklist?: string;
  designSystemVariables?: string;

  // Gallery
  previewImage?: string;

  // Computed fields
  extractedColors?: string[];
  cssProperties?: Record<string, string>;
}