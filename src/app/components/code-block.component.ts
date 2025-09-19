import { 
  Component, 
  input, 
  signal,
  computed,
  inject,
  afterNextRender,
  ElementRef,
  viewChild,
  ChangeDetectionStrategy
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Copy, Check } from 'lucide-angular';

// Services
import { SyntaxHighlightService } from '../services/syntax-highlight.service';

// UI Components
import { ButtonComponent } from '../../lib/components/ui/button.component';

/**
 * Code block component with syntax highlighting and copy functionality
 * Follows Angular 20+ zoneless patterns
 */
@Component({
  selector: 'app-code-block',
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="relative group">
      @if (title()) {
        <div class="flex items-center justify-between px-4 py-2 border-b bg-muted/30">
          <span class="text-sm font-medium text-muted-foreground">{{ title() }}</span>
          <lib-button
            variant="ghost"
            size="sm"
            (onClick)="copyToClipboard()"
            class="h-6 px-2 opacity-60 group-hover:opacity-100 transition-opacity"
          >
            <lucide-angular 
              [img]="copied() ? icons.check : icons.copy" 
              class="h-3 w-3"
            ></lucide-angular>
          </lib-button>
        </div>
      }
      
      <div class="relative">
        @if (!title()) {
          <lib-button
            variant="ghost"
            size="sm"
            (onClick)="copyToClipboard()"
            class="absolute top-2 right-2 z-10 h-6 px-2 opacity-60 group-hover:opacity-100 transition-opacity"
          >
            <lucide-angular 
              [img]="copied() ? icons.check : icons.copy" 
              class="h-3 w-3"
            ></lucide-angular>
          </lib-button>
        }
        
        <pre 
          #codeElement
          [class]="'language-' + language() + ' ' + containerClasses()"
        ><code 
          [class]="'language-' + language()"
          [innerHTML]="highlightedCode()"
        ></code></pre>
      </div>
    </div>
  `,
  styles: [`
    pre {
      margin: 0;
      overflow-x: auto;
      font-family: 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', Consolas, 'Courier New', monospace;
    }
    
    code {
      font-family: inherit;
    }
  `]
})
export class CodeBlockComponent {
  // Input signals
  code = input.required<string>();
  language = input<string>('typescript');
  title = input<string>('');
  showLineNumbers = input<boolean>(false);

  // Services
  private readonly syntaxHighlight = inject(SyntaxHighlightService);

  // View references
  private readonly codeElement = viewChild<ElementRef<HTMLElement>>('codeElement');

  // Icons
  readonly icons = {
    copy: Copy,
    check: Check
  } as const;

  // State
  private readonly _copied = signal(false);
  readonly copied = this._copied.asReadonly();

  // Computed properties
  readonly containerClasses = computed(() => {
    const classes = ['rounded-md', 'text-sm'];
    
    if (this.title()) {
      classes.push('rounded-t-none');
    }
    
    if (this.showLineNumbers()) {
      classes.push('line-numbers');
    }
    
    return classes.join(' ');
  });

  readonly highlightedCode = computed(() => {
    // Return raw code initially, will be highlighted after render
    return this.code();
  });

  constructor() {
    // Highlight code after next render
    afterNextRender(() => {
      this.highlightCodeBlock();
    });
  }

  private async highlightCodeBlock(): Promise<void> {
    const element = this.codeElement()?.nativeElement;
    if (element) {
      try {
        const highlighted = await this.syntaxHighlight.highlight(
          this.code(), 
          this.language()
        );
        
        // Update the innerHTML with highlighted code
        const codeEl = element.querySelector('code');
        if (codeEl) {
          codeEl.innerHTML = highlighted;
        }
      } catch (error) {
        console.warn('Failed to highlight code block:', error);
      }
    }
  }

  async copyToClipboard(): Promise<void> {
    try {
      await navigator.clipboard.writeText(this.code());
      this._copied.set(true);
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        this._copied.set(false);
      }, 2000);
    } catch (error) {
      console.error('Failed to copy code:', error);
    }
  }
}