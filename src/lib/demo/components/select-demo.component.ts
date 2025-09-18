import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectComponent } from '../../components/ui/select.component';
import { CardComponent } from '../../components/ui/card.component';
import { LucideAngularModule, Globe, Code, Star, AlertTriangle, Shield } from 'lucide-angular';
import { SelectOption } from '../../types';

/**
 * Select Components Demo
 * 
 * Demonstrates:
 * - Single and multiple selection
 * - Searchable and clearable options
 * - Different sizes and variants
 * - Icon support and descriptions
 * - Zoneless Angular architecture with signals
 * - Clean separation from main showcase
 */
@Component({
  selector: 'lib-select-demo',
  standalone: true,
  imports: [
    CommonModule,
    SelectComponent,
    CardComponent,
    LucideAngularModule
  ],
  template: `
    <!-- Select Components Section -->
    <section class="space-y-6">
      <div>
        <h3 class="text-2xl font-semibold mb-2">Select Components</h3>
        <p class="text-muted-foreground">Dropdown selects with single and multiple selection support.</p>
      </div>
      
      <div class="grid md:grid-cols-2 gap-6">
        <!-- Basic Select -->
        <lib-card class="p-6">
          <div class="space-y-4">
            <h4 class="text-sm font-medium">Basic Select</h4>
            
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium block mb-1">Country</label>
                <lib-select
                  [options]="countryOptions"
                  placeholder="Select a country"
                  [value]="selectedCountry()"
                  (valueChange)="onCountryChange($event)"
                  [clearable]="true"
                  class="w-full"
                ></lib-select>
                @if (selectedCountry()) {
                  <p class="text-xs text-muted-foreground mt-1">
                    Selected: {{ selectedCountryLabel() }}
                  </p>
                }
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">Framework</label>
                <lib-select
                  [options]="frameworkOptions"
                  placeholder="Choose your framework"
                  [value]="selectedFramework()"
                  (valueChange)="onFrameworkChange($event)"
                  [searchable]="true"
                  [clearable]="true"
                  variant="default"
                  size="md"
                  class="w-full"
                ></lib-select>
              </div>
            </div>
          </div>
        </lib-card>

        <!-- Advanced Select -->
        <lib-card class="p-6">
          <div class="space-y-4">
            <h4 class="text-sm font-medium">Advanced Select</h4>
            
            <div class="space-y-3">
              <div>
                <label class="text-sm font-medium block mb-1">Languages (Multiple)</label>
                <lib-select
                  [options]="languageOptions"
                  placeholder="Select languages"
                  [value]="selectedLanguages()"
                  (valueChange)="onLanguagesChange($event)"
                  [multiple]="true"
                  [searchable]="true"
                  [clearable]="true"
                  class="w-full"
                ></lib-select>
                @if (selectedLanguages().length > 0) {
                  <p class="text-xs text-muted-foreground mt-1">
                    Selected {{ selectedLanguages().length }} language(s)
                  </p>
                }
              </div>

              <div>
                <label class="text-sm font-medium block mb-1">Priority</label>
                <lib-select
                  [options]="priorityOptions"
                  placeholder="Set priority level"
                  [value]="selectedPriority()"
                  (valueChange)="onPriorityChange($event)"
                  [clearable]="false"
                  size="sm"
                  class="w-full"
                ></lib-select>
              </div>
            </div>
          </div>
        </lib-card>
      </div>
    </section>
  `
})
export class SelectDemoComponent {
  // Icon constants - readonly for performance
  protected readonly icons = {
    globe: Globe,
    code: Code,
    star: Star,
    alertTriangle: AlertTriangle,
    shield: Shield
  } as const;

  // Form state signals - zoneless architecture
  private readonly _selectState = {
    selectedCountry: signal(''),
    selectedLanguages: signal<string[]>([]),
    selectedFramework: signal(''),
    selectedPriority: signal('')
  };

  // Public computed values for template
  readonly selectedCountry = computed(() => this._selectState.selectedCountry());
  readonly selectedLanguages = computed(() => this._selectState.selectedLanguages());
  readonly selectedFramework = computed(() => this._selectState.selectedFramework());
  readonly selectedPriority = computed(() => this._selectState.selectedPriority());

  // Computed selected option labels
  readonly selectedCountryLabel = computed(() => {
    const country = this.selectedCountry();
    return country ? this.countryOptions.find(opt => opt.value === country)?.label : '';
  });

  // Select component options
  readonly countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States', icon: 'Globe' },
    { value: 'uk', label: 'United Kingdom', icon: 'Globe' },
    { value: 'ca', label: 'Canada', icon: 'Globe' },
    { value: 'au', label: 'Australia', icon: 'Globe' },
    { value: 'de', label: 'Germany', icon: 'Globe' },
    { value: 'fr', label: 'France', icon: 'Globe' },
    { value: 'jp', label: 'Japan', icon: 'Globe' },
    { value: 'br', label: 'Brazil', icon: 'Globe' }
  ];

  readonly languageOptions: SelectOption[] = [
    { value: 'en', label: 'English', description: 'Primary language' },
    { value: 'es', label: 'Spanish', description: 'Español' },
    { value: 'fr', label: 'French', description: 'Français' },
    { value: 'de', label: 'German', description: 'Deutsch' },
    { value: 'it', label: 'Italian', description: 'Italiano' },
    { value: 'pt', label: 'Portuguese', description: 'Português' },
    { value: 'ja', label: 'Japanese', description: '日本語' },
    { value: 'ko', label: 'Korean', description: '한국어' },
    { value: 'zh', label: 'Chinese', description: '中文' },
    { value: 'ar', label: 'Arabic', description: 'العربية' }
  ];

  readonly frameworkOptions: SelectOption[] = [
    { value: 'angular', label: 'Angular', icon: 'Code', description: 'TypeScript framework' },
    { value: 'react', label: 'React', icon: 'Code', description: 'JavaScript library' },
    { value: 'vue', label: 'Vue.js', icon: 'Code', description: 'Progressive framework' },
    { value: 'svelte', label: 'Svelte', icon: 'Code', description: 'Compile-time framework' },
    { value: 'nextjs', label: 'Next.js', icon: 'Code', description: 'React framework' },
    { value: 'nuxt', label: 'Nuxt', icon: 'Code', description: 'Vue.js framework' },
    { value: 'solid', label: 'SolidJS', icon: 'Code', description: 'Fine-grained reactivity' }
  ];

  readonly priorityOptions: SelectOption[] = [
    { value: 'low', label: 'Low Priority', icon: 'Star' },
    { value: 'medium', label: 'Medium Priority', icon: 'Star' },
    { value: 'high', label: 'High Priority', icon: 'Star' },
    { value: 'urgent', label: 'Urgent', icon: 'AlertTriangle', disabled: false },
    { value: 'critical', label: 'Critical', icon: 'Shield', disabled: false }
  ];

  // Select event handlers
  onCountryChange(value: any): void {
    this._selectState.selectedCountry.set(value);
  }

  onLanguagesChange(values: any): void {
    this._selectState.selectedLanguages.set(Array.isArray(values) ? values : []);
  }

  onFrameworkChange(value: any): void {
    this._selectState.selectedFramework.set(value);
  }

  onPriorityChange(value: any): void {
    this._selectState.selectedPriority.set(value);
  }
}