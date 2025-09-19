import { Injectable, afterNextRender } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';

/**
 * Service for syntax highlighting using Prism.js
 * Follows Angular 20+ patterns with signals and modern APIs
 */
@Injectable({
  providedIn: 'root'
})
export class SyntaxHighlightService {
  private readonly document = inject(DOCUMENT);
  private prismLoaded = false;

  constructor() {
    // Load Prism.js after the next render to avoid SSR issues
    afterNextRender(() => {
      this.loadPrism();
    });
  }

  private async loadPrism(): Promise<void> {
    if (this.prismLoaded) return;

    try {
      // Dynamically import Prism.js to avoid SSR issues
      const Prism = await import('prismjs');
      
      // Load additional language support with proper typing
      await import('prismjs/components/prism-typescript.js' as any);
      await import('prismjs/components/prism-javascript.js' as any);
      await import('prismjs/components/prism-css.js' as any);
      await import('prismjs/components/prism-json.js' as any);
      await import('prismjs/components/prism-bash.js' as any);

      // Apply syntax highlighting to any existing code blocks
      Prism.highlightAll();
      this.prismLoaded = true;
    } catch (error) {
      console.warn('Failed to load Prism.js:', error);
    }
  }

  /**
   * Highlight a specific code block
   */
  async highlightElement(element: HTMLElement): Promise<void> {
    if (!this.prismLoaded) {
      await this.loadPrism();
    }

    try {
      const Prism = await import('prismjs');
      Prism.highlightElement(element);
    } catch (error) {
      console.warn('Failed to highlight element:', error);
    }
  }

  /**
   * Highlight all code blocks in the document
   */
  async highlightAll(): Promise<void> {
    if (!this.prismLoaded) {
      await this.loadPrism();
    }

    try {
      const Prism = await import('prismjs');
      Prism.highlightAll();
    } catch (error) {
      console.warn('Failed to highlight all elements:', error);
    }
  }

  /**
   * Get highlighted HTML for a code snippet
   */
  async highlight(code: string, language: string = 'typescript'): Promise<string> {
    if (!this.prismLoaded) {
      await this.loadPrism();
    }

    try {
      const Prism = await import('prismjs');
      const grammar = Prism.languages[language];
      
      if (!grammar) {
        console.warn(`Language ${language} not supported, falling back to plain text`);
        return code;
      }

      return Prism.highlight(code, grammar, language);
    } catch (error) {
      console.warn('Failed to highlight code:', error);
      return code;
    }
  }
}