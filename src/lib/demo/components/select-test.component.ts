import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectComponent } from '../../components/ui/select.component';
import { CardComponent } from '../../components/ui/card.component';
import { ButtonComponent } from '../../components/ui/button.component';
import { BadgeComponent } from '../../components/ui/badge.component';
import { LucideAngularModule, Globe, Code, Star, AlertTriangle, Users, Settings, Heart } from 'lucide-angular';
import { SelectOption } from '../../types';

/**
 * Comprehensive Select Component Test Suite
 * 
 * This component demonstrates:
 * - Single and multiple selection
 * - Searchable and clearable options
 * - Different sizes and variants
 * - Form integration (reactive forms)
 * - Custom option templates with icons and descriptions
 * - Error states and validation
 * - Accessibility features
 * - Keyboard navigation
 * - Dynamic option loading
 */
@Component({
  selector: 'lib-select-test',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SelectComponent,
    CardComponent,
    ButtonComponent,
    BadgeComponent,
    LucideAngularModule
  ],
  template: `
    <div class="space-y-8 p-6">
      <div>
        <h1 class="text-3xl font-bold mb-2">Select Component Demo</h1>
        <p class="text-muted-foreground">
          Comprehensive examples of the select component with various configurations.
        </p>
      </div>

      <!-- Basic Examples -->
      <lib-card class="p-6">
        <h2 class="text-xl font-semibold mb-4">Basic Examples</h2>
        <div class="grid md:grid-cols-2 gap-6">
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium block mb-2">Single Select</label>
              <lib-select
                [options]="basicOptions"
                placeholder="Choose an option"
                [value]="basicSelection()"
                (valueChange)="setBasicSelection($event)"
                class="w-full"
              ></lib-select>
              @if (basicSelection()) {
                <p class="text-xs text-muted-foreground mt-1">
                  Selected: {{ getOptionLabel(basicOptions, basicSelection()) }}
                </p>
              }
            </div>

            <div>
              <label class="text-sm font-medium block mb-2">With Icons</label>
              <lib-select
                [options]="iconOptions"
                placeholder="Select with icons"
                [value]="iconSelection()"
                (valueChange)="setIconSelection($event)"
                [clearable]="true"
                class="w-full"
              ></lib-select>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium block mb-2">Searchable</label>
              <lib-select
                [options]="countryOptions"
                placeholder="Search countries"
                [value]="countrySelection()"
                (valueChange)="setCountrySelection($event)"
                [searchable]="true"
                [clearable]="true"
                class="w-full"
              ></lib-select>
            </div>

            <div>
              <label class="text-sm font-medium block mb-2">Multiple Selection</label>
              <lib-select
                [options]="skillOptions"
                placeholder="Select skills"
                [value]="skillSelections()"
                (valueChange)="setSkillSelections($event)"
                [multiple]="true"
                [searchable]="true"
                [clearable]="true"
                class="w-full"
              ></lib-select>
              @if (skillSelections().length > 0) {
                <div class="flex flex-wrap gap-1 mt-2">
                  @for (skill of skillSelections(); track skill) {
                    <lib-badge variant="secondary" size="sm">
                      {{ getOptionLabel(skillOptions, skill) }}
                    </lib-badge>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </lib-card>

      <!-- Sizes and Variants -->
      <lib-card class="p-6">
        <h2 class="text-xl font-semibold mb-4">Sizes and Variants</h2>
        <div class="grid md:grid-cols-3 gap-6">
          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium block mb-2">Small Size</label>
              <lib-select
                [options]="sizeOptions"
                placeholder="Small select"
                size="sm"
                [value]="smallSelection()"
                (valueChange)="setSmallSelection($event)"
                class="w-full"
              ></lib-select>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium block mb-2">Medium Size (Default)</label>
              <lib-select
                [options]="sizeOptions"
                placeholder="Medium select"
                size="md"
                [value]="mediumSelection()"
                (valueChange)="setMediumSelection($event)"
                class="w-full"
              ></lib-select>
            </div>
          </div>

          <div class="space-y-4">
            <div>
              <label class="text-sm font-medium block mb-2">Large Size</label>
              <lib-select
                [options]="sizeOptions"
                placeholder="Large select"
                size="lg"
                [value]="largeSelection()"
                (valueChange)="setLargeSelection($event)"
                class="w-full"
              ></lib-select>
            </div>
          </div>
        </div>

        <div class="mt-6 space-y-4">
          <div>
            <label class="text-sm font-medium block mb-2">Error State</label>
            <lib-select
              [options]="basicOptions"
              placeholder="Select with error"
              variant="error"
              [value]="errorSelection()"
              (valueChange)="setErrorSelection($event)"
              class="w-full"
            ></lib-select>
            <p class="text-xs text-destructive mt-1">This field is required</p>
          </div>

          <div>
            <label class="text-sm font-medium block mb-2">Disabled State</label>
            <lib-select
              [options]="basicOptions"
              placeholder="Disabled select"
              [disabled]="true"
              value="option2"
              class="w-full"
            ></lib-select>
          </div>
        </div>
      </lib-card>

      <!-- Reactive Forms Integration -->
      <lib-card class="p-6">
        <h2 class="text-xl font-semibold mb-4">Reactive Forms Integration</h2>
        <form [formGroup]="profileForm" (ngSubmit)="onSubmit()" class="space-y-4">
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="text-sm font-medium block mb-2">Department</label>
              <lib-select
                [options]="departmentOptions"
                placeholder="Select department"
                formControlName="department"
                [clearable]="true"
                class="w-full"
              ></lib-select>
              @if (profileForm.get('department')?.invalid && profileForm.get('department')?.touched) {
                <p class="text-xs text-destructive mt-1">Department is required</p>
              }
            </div>

            <div>
              <label class="text-sm font-medium block mb-2">Role</label>
              <lib-select
                [options]="roleOptions"
                placeholder="Select role"
                formControlName="role"
                [clearable]="true"
                class="w-full"
              ></lib-select>
              @if (profileForm.get('role')?.invalid && profileForm.get('role')?.touched) {
                <p class="text-xs text-destructive mt-1">Role is required</p>
              }
            </div>
          </div>

          <div>
            <label class="text-sm font-medium block mb-2">Technologies</label>
            <lib-select
              [options]="techOptions"
              placeholder="Select technologies"
              formControlName="technologies"
              [multiple]="true"
              [searchable]="true"
              [clearable]="true"
              class="w-full"
            ></lib-select>
          </div>

          <div class="flex gap-2">
            <lib-button type="submit" [disabled]="profileForm.invalid">
              Submit Form
            </lib-button>
            <lib-button type="button" variant="outline" (click)="resetForm()">
              Reset
            </lib-button>
          </div>

          @if (formSubmitted()) {
            <div class="p-4 bg-muted rounded-md">
              <h3 class="font-medium mb-2">Form Values:</h3>
              <pre class="text-xs">{{ formValues() | json }}</pre>
            </div>
          }
        </form>
      </lib-card>

      <!-- Advanced Features -->
      <lib-card class="p-6">
        <h2 class="text-xl font-semibold mb-4">Advanced Features</h2>
        <div class="space-y-6">
          <div>
            <label class="text-sm font-medium block mb-2">Dynamic Loading</label>
            <lib-select
              [options]="dynamicOptions()"
              placeholder="Loading options..."
              [value]="dynamicSelection()"
              (valueChange)="setDynamicSelection($event)"
              [loading]="isLoading()"
              [disabled]="isLoading()"
              class="w-full"
            ></lib-select>
            <lib-button 
              variant="outline" 
              size="sm" 
              (click)="loadDynamicOptions()" 
              [disabled]="isLoading()"
              class="mt-2"
            >
              {{ isLoading() ? 'Loading...' : 'Load Options' }}
            </lib-button>
          </div>

          <div>
            <label class="text-sm font-medium block mb-2">Complex Options with Descriptions</label>
            <lib-select
              [options]="complexOptions"
              placeholder="Select a plan"
              [value]="planSelection()"
              (valueChange)="setPlanSelection($event)"
              [searchable]="true"
              class="w-full"
            ></lib-select>
          </div>
        </div>
      </lib-card>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class SelectTestComponent {
  // Form builder injection
  private fb = FormBuilder;

  // Basic state signals
  private _basicSelection = signal<string>('');
  private _iconSelection = signal<string>('');
  private _countrySelection = signal<string>('');
  private _skillSelections = signal<string[]>([]);
  private _smallSelection = signal<string>('');
  private _mediumSelection = signal<string>('');
  private _largeSelection = signal<string>('');
  private _errorSelection = signal<string>('');
  private _dynamicSelection = signal<string>('');
  private _planSelection = signal<string>('');
  private _isLoading = signal<boolean>(false);
  private _dynamicOptions = signal<SelectOption[]>([]);
  private _formSubmitted = signal<boolean>(false);

  // Computed accessors
  readonly basicSelection = this._basicSelection.asReadonly();
  readonly iconSelection = this._iconSelection.asReadonly();
  readonly countrySelection = this._countrySelection.asReadonly();
  readonly skillSelections = this._skillSelections.asReadonly();
  readonly smallSelection = this._smallSelection.asReadonly();
  readonly mediumSelection = this._mediumSelection.asReadonly();
  readonly largeSelection = this._largeSelection.asReadonly();
  readonly errorSelection = this._errorSelection.asReadonly();
  readonly dynamicSelection = this._dynamicSelection.asReadonly();
  readonly planSelection = this._planSelection.asReadonly();
  readonly isLoading = this._isLoading.asReadonly();
  readonly dynamicOptions = this._dynamicOptions.asReadonly();
  readonly formSubmitted = this._formSubmitted.asReadonly();

  // Reactive form
  profileForm: FormGroup;
  readonly formValues = computed(() => this.profileForm.value);

  // Options data
  readonly basicOptions: SelectOption[] = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
    { value: 'option4', label: 'Option 4' }
  ];

  readonly iconOptions: SelectOption[] = [
    { value: 'global', label: 'Global', icon: 'Globe' },
    { value: 'code', label: 'Development', icon: 'Code' },
    { value: 'star', label: 'Favorites', icon: 'Star' },
    { value: 'users', label: 'Team', icon: 'Users' },
    { value: 'settings', label: 'Settings', icon: 'Settings' }
  ];

  readonly countryOptions: SelectOption[] = [
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
    { value: 'au', label: 'Australia' },
    { value: 'de', label: 'Germany' },
    { value: 'fr', label: 'France' },
    { value: 'it', label: 'Italy' },
    { value: 'es', label: 'Spain' },
    { value: 'jp', label: 'Japan' },
    { value: 'br', label: 'Brazil' },
    { value: 'in', label: 'India' },
    { value: 'mx', label: 'Mexico' }
  ];

  readonly skillOptions: SelectOption[] = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue.js' },
    { value: 'typescript', label: 'TypeScript' },
    { value: 'javascript', label: 'JavaScript' },
    { value: 'python', label: 'Python' },
    { value: 'java', label: 'Java' },
    { value: 'csharp', label: 'C#' },
    { value: 'nodejs', label: 'Node.js' },
    { value: 'docker', label: 'Docker' },
    { value: 'kubernetes', label: 'Kubernetes' },
    { value: 'aws', label: 'AWS' }
  ];

  readonly sizeOptions: SelectOption[] = [
    { value: 'xs', label: 'Extra Small' },
    { value: 'sm', label: 'Small' },
    { value: 'md', label: 'Medium' },
    { value: 'lg', label: 'Large' },
    { value: 'xl', label: 'Extra Large' }
  ];

  readonly departmentOptions: SelectOption[] = [
    { value: 'engineering', label: 'Engineering', icon: 'Code' },
    { value: 'design', label: 'Design', icon: 'Heart' },
    { value: 'product', label: 'Product', icon: 'Star' },
    { value: 'marketing', label: 'Marketing', icon: 'Globe' },
    { value: 'sales', label: 'Sales', icon: 'Users' }
  ];

  readonly roleOptions: SelectOption[] = [
    { value: 'developer', label: 'Developer' },
    { value: 'senior-developer', label: 'Senior Developer' },
    { value: 'tech-lead', label: 'Tech Lead' },
    { value: 'architect', label: 'Architect' },
    { value: 'manager', label: 'Manager' },
    { value: 'director', label: 'Director' }
  ];

  readonly techOptions: SelectOption[] = [
    { value: 'frontend', label: 'Frontend Development', description: 'UI/UX implementation' },
    { value: 'backend', label: 'Backend Development', description: 'Server-side logic' },
    { value: 'fullstack', label: 'Full Stack', description: 'End-to-end development' },
    { value: 'mobile', label: 'Mobile Development', description: 'iOS/Android apps' },
    { value: 'devops', label: 'DevOps', description: 'Infrastructure & deployment' },
    { value: 'data', label: 'Data Engineering', description: 'Data pipelines & analytics' }
  ];

  readonly complexOptions: SelectOption[] = [
    {
      value: 'basic',
      label: 'Basic Plan',
      description: 'Perfect for individuals getting started',
      icon: 'Star'
    },
    {
      value: 'pro',
      label: 'Pro Plan',
      description: 'Great for small teams and growing businesses',
      icon: 'Users'
    },
    {
      value: 'enterprise',
      label: 'Enterprise Plan',
      description: 'Advanced features for large organizations',
      icon: 'Settings'
    }
  ];

  constructor() {
    // Initialize reactive form
    this.profileForm = new FormBuilder().group({
      department: ['', Validators.required],
      role: ['', Validators.required],
      technologies: [[]]
    });
  }

  // State setters
  setBasicSelection(value: string): void {
    this._basicSelection.set(value);
  }

  setIconSelection(value: string): void {
    this._iconSelection.set(value);
  }

  setCountrySelection(value: string): void {
    this._countrySelection.set(value);
  }

  setSkillSelections(values: string[]): void {
    this._skillSelections.set(values);
  }

  setSmallSelection(value: string): void {
    this._smallSelection.set(value);
  }

  setMediumSelection(value: string): void {
    this._mediumSelection.set(value);
  }

  setLargeSelection(value: string): void {
    this._largeSelection.set(value);
  }

  setErrorSelection(value: string): void {
    this._errorSelection.set(value);
  }

  setDynamicSelection(value: string): void {
    this._dynamicSelection.set(value);
  }

  setPlanSelection(value: string): void {
    this._planSelection.set(value);
  }

  // Helper method to get option label
  getOptionLabel(options: SelectOption[], value: string): string {
    return options.find(opt => opt.value === value)?.label || '';
  }

  // Dynamic loading simulation
  loadDynamicOptions(): void {
    this._isLoading.set(true);
    
    // Simulate API call
    setTimeout(() => {
      const newOptions: SelectOption[] = [
        { value: 'dynamic1', label: 'Dynamic Option 1', description: 'Loaded from API' },
        { value: 'dynamic2', label: 'Dynamic Option 2', description: 'Loaded from API' },
        { value: 'dynamic3', label: 'Dynamic Option 3', description: 'Loaded from API' },
        { value: 'dynamic4', label: 'Dynamic Option 4', description: 'Loaded from API' }
      ];
      
      this._dynamicOptions.set(newOptions);
      this._isLoading.set(false);
    }, 1500);
  }

  // Form handling
  onSubmit(): void {
    if (this.profileForm.valid) {
      this._formSubmitted.set(true);
      console.log('Form submitted:', this.profileForm.value);
    } else {
      this.profileForm.markAllAsTouched();
    }
  }

  resetForm(): void {
    this.profileForm.reset();
    this._formSubmitted.set(false);
  }
}