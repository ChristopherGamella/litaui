import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule, Star, Heart, Download, Settings, Search, User, Mail, Lock, Eye, EyeOff } from 'lucide-angular';
import { ButtonComponent } from './button.component';
import { CardComponent, CardHeaderComponent, CardContentComponent, CardFooterComponent } from './card.component';
import { InputComponent } from './input.component';
import { ModalComponent, ModalTriggerComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent } from './modal.component';
import { BadgeComponent } from './badge.component';
import { AlertComponent, AlertTitleComponent, AlertDescriptionComponent } from './alert.component';
import { SelectComponent } from './select.component';

/**
 * Comprehensive demo showcasing the complete shadcn-inspired Angular component library
 * This demonstrates all components working together with your existing design system
 */
@Component({
  selector: 'lib-comprehensive-demo',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    LucideAngularModule,
    ButtonComponent,
    CardComponent,
    CardHeaderComponent,
    CardContentComponent,
    CardFooterComponent,
    InputComponent,
    ModalComponent,
    ModalTriggerComponent,
    ModalHeaderComponent,
    ModalBodyComponent,
    ModalFooterComponent,
    BadgeComponent,
    AlertComponent,
    AlertTitleComponent,
    AlertDescriptionComponent,
    SelectComponent
  ],
  template: `
    <div class="min-h-screen bg-background-main">
      <!-- Header -->
      <header class="bg-background-elevated border-b border-primary-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center py-6">
            <div>
              <h1 class="text-3xl font-bold text-text-primary">
                Shadcn-Angular Components
              </h1>
              <p class="text-text-secondary mt-2">
                Complete component library with your professional color palette
              </p>
            </div>
            <div class="flex space-x-4">
              <lib-button variant="outline" [leftIcon]="StarIcon">
                GitHub
              </lib-button>
              <lib-button variant="default" [leftIcon]="DownloadIcon">
                Download
              </lib-button>
            </div>
          </div>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div class="space-y-16">
          <!-- Hero Section -->
          <section class="text-center space-y-8">
            <div class="space-y-4">
              <h2 class="text-4xl md:text-6xl font-bold text-text-primary">
                Modern Angular Components
              </h2>
              <p class="text-xl text-text-secondary max-w-3xl mx-auto">
                Built with shadcn/ui patterns, integrated with your existing professional color system,
                and optimized for Angular 20 with TailwindCSS 4.
              </p>
            </div>

            <div class="flex flex-wrap justify-center gap-4">
              <lib-button size="lg" [leftIcon]="StarIcon">
                Get Started
              </lib-button>
              <lib-modal-trigger [modal]="demoModal">
                <lib-button variant="outline" size="lg" [leftIcon]="EyeIcon">
                  View Demo
                </lib-button>
              </lib-modal-trigger>
            </div>
          </section>

          <!-- Components Showcase -->
          <section class="space-y-12">
            <h2 class="text-3xl font-bold text-text-primary text-center">Component Showcase</h2>

            <!-- Buttons Section -->
            <div class="space-y-8">
              <h3 class="text-2xl font-semibold text-text-primary">Buttons</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Basic Buttons -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Basic Variants</h4>
                  </lib-card-header>
                  <lib-card-content>
                    <div class="space-y-4">
                      <lib-button>Default</lib-button>
                      <lib-button variant="secondary">Secondary</lib-button>
                      <lib-button variant="outline">Outline</lib-button>
                      <lib-button variant="ghost">Ghost</lib-button>
                      <lib-button variant="link">Link</lib-button>
                      <lib-button variant="destructive">Destructive</lib-button>
                    </div>
                  </lib-card-content>
                </lib-card>

                <!-- Button Sizes -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Sizes</h4>
                  </lib-card-header>
                  <lib-card-content>
                    <div class="space-y-4">
                      <lib-button size="xs">Extra Small</lib-button>
                      <lib-button size="sm">Small</lib-button>
                      <lib-button size="md">Medium</lib-button>
                      <lib-button size="lg">Large</lib-button>
                      <lib-button size="xl">Extra Large</lib-button>
                    </div>
                  </lib-card-content>
                </lib-card>

                <!-- Buttons with Icons -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">With Icons</h4>
                  </lib-card-header>
                  <lib-card-content>
                    <div class="space-y-4">
                      <lib-button [leftIcon]="StarIcon">Star</lib-button>
                      <lib-button variant="outline" [rightIcon]="HeartIcon">Like</lib-button>
                      <lib-button variant="secondary" [leftIcon]="DownloadIcon">Download</lib-button>
                      <lib-button variant="ghost" [rightIcon]="SettingsIcon">Settings</lib-button>
                    </div>
                  </lib-card-content>
                </lib-card>
              </div>
            </div>

            <!-- Cards Section -->
            <div class="space-y-8">
              <h3 class="text-2xl font-semibold text-text-primary">Cards</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Basic Card -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Basic Card</h4>
                    <p class="text-sm text-text-muted">A simple card with header and content</p>
                  </lib-card-header>
                  <lib-card-content>
                    <p class="text-text-secondary">
                      This is the card content area. Cards are perfect for displaying
                      information in a structured, visually appealing way.
                    </p>
                  </lib-card-content>
                  <lib-card-footer>
                    <lib-button size="sm">Learn More</lib-button>
                  </lib-card-footer>
                </lib-card>

                <!-- Interactive Card -->
                <lib-card [hoverable]="true" [clickable]="true" class="cursor-pointer">
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Interactive Card</h4>
                    <p class="text-sm text-text-muted">Hover and click effects</p>
                  </lib-card-header>
                  <lib-card-content>
                    <p class="text-text-secondary">
                      This card has hover effects and is clickable.
                      Perfect for navigation or actions.
                    </p>
                  </lib-card-content>
                </lib-card>

                <!-- Elevated Card -->
                <lib-card variant="elevated">
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Elevated Card</h4>
                    <p class="text-sm text-text-muted">With shadow effects</p>
                  </lib-card-header>
                  <lib-card-content>
                    <p class="text-text-secondary">
                      Elevated cards have more pronounced shadows
                      for better visual hierarchy.
                    </p>
                  </lib-card-content>
                </lib-card>
              </div>
            </div>

            <!-- Badges Section -->
            <div class="space-y-8">
              <h3 class="text-2xl font-semibold text-text-primary">Badges</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <!-- Badge Variants -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Badge Variants</h4>
                    <p class="text-sm text-text-muted">Different styles and colors</p>
                  </lib-card-header>
                  <lib-card-content>
                    <div class="flex flex-wrap gap-2">
                      <lib-badge>Default</lib-badge>
                      <lib-badge variant="secondary">Secondary</lib-badge>
                      <lib-badge variant="destructive">Destructive</lib-badge>
                      <lib-badge variant="outline">Outline</lib-badge>
                      <lib-badge variant="success">Success</lib-badge>
                      <lib-badge variant="warning">Warning</lib-badge>
                      <lib-badge variant="info">Info</lib-badge>
                    </div>
                  </lib-card-content>
                </lib-card>

                <!-- Badge Sizes and Shapes -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Sizes & Shapes</h4>
                    <p class="text-sm text-text-muted">Different sizes and shapes</p>
                  </lib-card-header>
                  <lib-card-content>
                    <div class="flex flex-wrap items-center gap-4">
                      <lib-badge size="xs">XS</lib-badge>
                      <lib-badge size="sm">SM</lib-badge>
                      <lib-badge size="md">MD</lib-badge>
                      <lib-badge size="lg">LG</lib-badge>
                      <lib-badge shape="square">Square</lib-badge>
                      <lib-badge shape="pill">Pill</lib-badge>
                    </div>
                  </lib-card-content>
                </lib-card>
              </div>
            </div>

            <!-- Alerts Section -->
            <div class="space-y-8">
              <h3 class="text-2xl font-semibold text-text-primary">Alerts</h3>
              <div class="space-y-4">
                <lib-alert>
                  <lib-alert-title>Default Alert</lib-alert-title>
                  <lib-alert-description>
                    This is a default alert with a title and description.
                  </lib-alert-description>
                </lib-alert>

                <lib-alert variant="destructive">
                  <lib-alert-title>Error Alert</lib-alert-title>
                  <lib-alert-description>
                    Something went wrong! This is a destructive alert.
                  </lib-alert-description>
                </lib-alert>

                <lib-alert variant="success">
                  <lib-alert-title>Success Alert</lib-alert-title>
                  <lib-alert-description>
                    Operation completed successfully!
                  </lib-alert-description>
                </lib-alert>

                <lib-alert variant="warning">
                  <lib-alert-title>Warning Alert</lib-alert-title>
                  <lib-alert-description>
                    Please be careful with this action.
                  </lib-alert-description>
                </lib-alert>

                <lib-alert variant="info">
                  <lib-alert-title>Info Alert</lib-alert-title>
                  <lib-alert-description>
                    Here's some important information for you.
                  </lib-alert-description>
                </lib-alert>
              </div>
            </div>

            <!-- Selects Section -->
            <div class="space-y-8">
              <h3 class="text-2xl font-semibold text-text-primary">Select Components</h3>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Basic Select -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Basic Select</h4>
                    <p class="text-sm text-text-muted">Simple dropdown selection</p>
                  </lib-card-header>
                  <lib-card-content>
                    <lib-select
                      [options]="countryOptions"
                      placeholder="Select a country"
                      [clearable]="true"
                    ></lib-select>
                  </lib-card-content>
                </lib-card>

                <!-- Searchable Select -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Searchable Select</h4>
                    <p class="text-sm text-text-muted">With search functionality</p>
                  </lib-card-header>
                  <lib-card-content>
                    <lib-select
                      [options]="cityOptions"
                      placeholder="Search for a city"
                      [searchable]="true"
                      [clearable]="true"
                    ></lib-select>
                  </lib-card-content>
                </lib-card>
              </div>
            </div>

            <!-- Forms Section -->
            <div class="space-y-8">
              <h3 class="text-2xl font-semibold text-text-primary">Form Components</h3>
              <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <!-- Input Examples -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Input Fields</h4>
                    <p class="text-sm text-text-muted">Various input types and states</p>
                  </lib-card-header>
                  <lib-card-content>
                    <div class="space-y-6">
                      <!-- Basic Input -->
                      <div>
                        <label class="block text-sm font-medium text-text-primary mb-2">
                          Email Address
                        </label>
                        <lib-input
                          type="email"
                          placeholder="Enter your email"
                          [leftIcon]="MailIcon"
                          helperText="We'll never share your email with anyone else."
                        ></lib-input>
                      </div>

                      <!-- Password Input -->
                      <div>
                        <label class="block text-sm font-medium text-text-primary mb-2">
                          Password
                        </label>
                        <lib-input
                          type="password"
                          placeholder="Enter your password"
                          [leftIcon]="LockIcon"
                          [rightIcon]="showPassword() ? EyeOffIcon : EyeIcon"
                          (rightIconClick)="togglePasswordVisibility()"
                        ></lib-input>
                      </div>

                      <!-- Search Input -->
                      <div>
                        <label class="block text-sm font-medium text-text-primary mb-2">
                          Search
                        </label>
                        <lib-input
                          type="search"
                          placeholder="Search for anything..."
                          [leftIcon]="SearchIcon"
                          [clearable]="true"
                        ></lib-input>
                      </div>

                      <!-- Error State -->
                      <div>
                        <label class="block text-sm font-medium text-text-primary mb-2">
                          Username
                        </label>
                        <lib-input
                          placeholder="Choose a username"
                          [leftIcon]="UserIcon"
                          [error]="true"
                          errorMessage="This username is already taken."
                        ></lib-input>
                      </div>
                    </div>
                  </lib-card-content>
                </lib-card>

                <!-- Form Layout -->
                <lib-card>
                  <lib-card-header>
                    <h4 class="text-lg font-medium">Complete Form</h4>
                    <p class="text-sm text-text-muted">Real form with validation</p>
                  </lib-card-header>
                  <lib-card-content>
                    <form class="space-y-6" (ngSubmit)="onSubmit()">
                      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label class="block text-sm font-medium text-text-primary mb-2">
                            First Name
                          </label>
                          <lib-input
                            placeholder="John"
                            [required]="true"
                          ></lib-input>
                        </div>
                        <div>
                          <label class="block text-sm font-medium text-text-primary mb-2">
                            Last Name
                          </label>
                          <lib-input
                            placeholder="Doe"
                            [required]="true"
                          ></lib-input>
                        </div>
                      </div>

                      <div>
                        <label class="block text-sm font-medium text-text-primary mb-2">
                          Email
                        </label>
                        <lib-input
                          type="email"
                          placeholder="john.doe@example.com"
                          [leftIcon]="MailIcon"
                          [required]="true"
                        ></lib-input>
                      </div>

                      <div>
                        <label class="block text-sm font-medium text-text-primary mb-2">
                          Message
                        </label>
                        <textarea
                          class="w-full px-3 py-2 border border-input rounded-md bg-background text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[100px] resize-vertical"
                          placeholder="Tell us about your project..."
                        ></textarea>
                      </div>

                      <lib-button type="submit" size="lg" class="w-full">
                        Send Message
                      </lib-button>
                    </form>
                  </lib-card-content>
                </lib-card>
              </div>
            </div>
          </section>

          <!-- Features Section -->
          <section class="space-y-8">
            <h2 class="text-3xl font-bold text-text-primary text-center">Key Features</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <lib-card>
                <lib-card-content class="text-center">
                  <div class="w-12 h-12 bg-accent-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <lucide-angular [img]="StarIcon" size="24" class="text-accent-600"></lucide-angular>
                  </div>
                  <h3 class="text-lg font-semibold text-text-primary mb-2">shadcn/ui Inspired</h3>
                  <p class="text-text-secondary">
                    Modern design patterns with Angular integration, following industry best practices.
                  </p>
                </lib-card-content>
              </lib-card>

              <lib-card>
                <lib-card-content class="text-center">
                  <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <lucide-angular [img]="HeartIcon" size="24" class="text-green-600"></lucide-angular>
                  </div>
                  <h3 class="text-lg font-semibold text-text-primary mb-2">Your Color System</h3>
                  <p class="text-text-secondary">
                    Seamlessly integrated with your existing professional color palette and design tokens.
                  </p>
                </lib-card-content>
              </lib-card>

              <lib-card>
                <lib-card-content class="text-center">
                  <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <lucide-angular [img]="SettingsIcon" size="24" class="text-blue-600"></lucide-angular>
                  </div>
                  <h3 class="text-lg font-semibold text-text-primary mb-2">Fully Accessible</h3>
                  <p class="text-text-secondary">
                    WCAG 2.1 AA compliant with ARIA support, keyboard navigation, and screen reader compatibility.
                  </p>
                </lib-card-content>
              </lib-card>
            </div>
          </section>
        </div>
      </main>

      <!-- Demo Modal -->
      <lib-modal #demoModal [size]="'xl'">
        <lib-modal-header>
          <h2 class="text-lg font-semibold">Component Library Demo</h2>
          <p class="text-sm text-muted-foreground">
            Explore all the components in our shadcn-inspired Angular library
          </p>
        </lib-modal-header>

        <lib-modal-body>
          <div class="space-y-6">
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div class="text-center p-4 border rounded-lg">
                <div class="w-8 h-8 bg-primary-900 rounded mx-auto mb-2"></div>
                <p class="text-sm font-medium">Button</p>
              </div>
              <div class="text-center p-4 border rounded-lg">
                <div class="w-8 h-8 bg-secondary rounded mx-auto mb-2"></div>
                <p class="text-sm font-medium">Card</p>
              </div>
              <div class="text-center p-4 border rounded-lg">
                <div class="w-8 h-8 bg-accent-100 rounded mx-auto mb-2"></div>
                <p class="text-sm font-medium">Input</p>
              </div>
              <div class="text-center p-4 border rounded-lg">
                <div class="w-8 h-8 bg-background-elevated rounded mx-auto mb-2 border"></div>
                <p class="text-sm font-medium">Modal</p>
              </div>
            </div>

            <div class="bg-muted p-4 rounded-lg">
              <h3 class="font-medium mb-2">🎨 Your Color System</h3>
              <div class="grid grid-cols-5 gap-2">
                <div class="w-8 h-8 bg-primary-900 rounded"></div>
                <div class="w-8 h-8 bg-primary-700 rounded"></div>
                <div class="w-8 h-8 bg-accent-600 rounded"></div>
                <div class="w-8 h-8 bg-green-500 rounded"></div>
                <div class="w-8 h-8 bg-red-500 rounded"></div>
              </div>
            </div>
          </div>
        </lib-modal-body>

        <lib-modal-footer>
          <lib-button variant="outline" (onClick)="demoModal.closeModal()">
            Close
          </lib-button>
          <lib-button (onClick)="demoModal.closeModal()">
            Got it!
          </lib-button>
        </lib-modal-footer>
      </lib-modal>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class ComprehensiveDemoComponent {
  // Icons
  readonly StarIcon = Star;
  readonly HeartIcon = Heart;
  readonly DownloadIcon = Download;
  readonly SettingsIcon = Settings;
  readonly SearchIcon = Search;
  readonly UserIcon = User;
  readonly MailIcon = Mail;
  readonly LockIcon = Lock;
  readonly EyeIcon = Eye;
  readonly EyeOffIcon = EyeOff;

  // Reactive state
  showPassword = signal(false);

  // Sample data for select components
  countryOptions = [
    { label: 'United States', value: 'us', description: 'North America' },
    { label: 'United Kingdom', value: 'uk', description: 'Europe' },
    { label: 'Canada', value: 'ca', description: 'North America' },
    { label: 'Australia', value: 'au', description: 'Oceania' },
    { label: 'Germany', value: 'de', description: 'Europe' },
    { label: 'France', value: 'fr', description: 'Europe' },
    { label: 'Japan', value: 'jp', description: 'Asia' },
    { label: 'Brazil', value: 'br', description: 'South America' }
  ];

  cityOptions = [
    { label: 'New York', value: 'nyc', description: 'New York, USA' },
    { label: 'London', value: 'london', description: 'London, UK' },
    { label: 'Tokyo', value: 'tokyo', description: 'Tokyo, Japan' },
    { label: 'Paris', value: 'paris', description: 'Paris, France' },
    { label: 'Sydney', value: 'sydney', description: 'Sydney, Australia' },
    { label: 'Berlin', value: 'berlin', description: 'Berlin, Germany' },
    { label: 'Toronto', value: 'toronto', description: 'Toronto, Canada' },
    { label: 'São Paulo', value: 'saopaulo', description: 'São Paulo, Brazil' },
    { label: 'Los Angeles', value: 'la', description: 'Los Angeles, USA' },
    { label: 'Chicago', value: 'chicago', description: 'Chicago, USA' }
  ];

  togglePasswordVisibility(): void {
    this.showPassword.set(!this.showPassword());
  }

  onSubmit(): void {
    console.log('Form submitted!');
    // Handle form submission
  }
}