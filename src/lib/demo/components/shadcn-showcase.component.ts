import { Component, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../components/ui/button.component';
import { BadgeComponent } from '../../components/ui/badge.component';
import { CardComponent } from '../../components/ui/card.component';
import { InputComponent } from '../../components/ui/input.component';
import { AlertComponent } from '../../components/ui/alert.component';
import { AvatarComponent } from '../../components/ui/avatar.component';
import { SwitchComponent } from '../../components/ui/switch.component';
import { ProgressComponent } from '../../components/ui/progress.component';
import { TabsComponent, TabItem } from '../../components/ui/tabs.component';
import { AccordionComponent, AccordionItem } from '../../components/ui/accordion.component';
import { DropdownMenuComponent, DropdownMenuItem } from '../../components/ui/dropdown-menu.component';
import { BreadcrumbComponent, BreadcrumbItem } from '../../components/ui/breadcrumb.component';
import { CheckboxComponent } from '../../components/ui/checkbox.component';
import { SelectDemoComponent } from './select-demo.component';
import { ModalTestComponent } from './modal-test.component';
import { ThemeService } from '../../utils/theme';
import { LucideAngularModule, 
  Mail, Settings, User, Moon, Sun, Code, Copy, Check, Info, AlertTriangle, 
  Home, ChevronRight, Menu, Archive, Folder, File, Globe, MapPin, Star, Heart, Shield
} from 'lucide-angular';

/**
 * Comprehensive showcase component for shadcn/ui Angular components
 * 
 * Demonstrates:
 * - Zoneless Angular architecture with signals
 * - Modern component composition patterns
 * - Accessible form controls without ControlValueAccessor
 * - Design system integration
 * - Real-world usage examples
 * 
 * Key Features:
 * - Pure signal-based state management
 * - Computed values for derived state
 * - No dependency on FormsModule or ngModel
 * - Clean separation of concerns
 * - Type-safe event handling
 * - Performance-optimized with readonly computeds
 */
@Component({
  selector: 'lib-shadcn-showcase',
  standalone: true,
  imports: [
    CommonModule,
    ButtonComponent,
    BadgeComponent,
    CardComponent,
    InputComponent,
    AlertComponent,
    AvatarComponent,
    SwitchComponent,
    ProgressComponent,
    TabsComponent,
    AccordionComponent,
    DropdownMenuComponent,
    BreadcrumbComponent,
    CheckboxComponent,
    SelectDemoComponent,
    ModalTestComponent,
    LucideAngularModule
  ],
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <!-- Header -->
      <header class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-14 items-center justify-between px-4">
          <div class="flex items-center gap-2">
            <lucide-angular [img]="icons.code" class="h-6 w-6"></lucide-angular>
            <h1 class="text-lg font-semibold">shadcn/ui for Angular</h1>
            <lib-badge variant="secondary">v1.0.0</lib-badge>
          </div>
          
          <div class="flex items-center gap-2">
            <lib-button
              variant="ghost"
              size="icon"
              (onClick)="toggleTheme()"
            >
              <lucide-angular [img]="themeIcon()" class="h-4 w-4"></lucide-angular>
            </lib-button>
            
            <lib-button variant="outline" size="sm">
              <lucide-angular [img]="icons.code" class="mr-2 h-4 w-4"></lucide-angular>
              View Code
            </lib-button>
          </div>
        </div>
      </header>

      <main class="container mx-auto px-4 py-8">
        <!-- Hero Section -->
        <section class="text-center mb-12">
          <h2 class="text-4xl font-bold tracking-tighter mb-4">
            The definitive shadcn/ui port for Angular
          </h2>
          <p class="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Beautiful, accessible, and developer-friendly components built with Angular 20+ and TailwindCSS.
            Copy, paste, and customize to your heart's content.
          </p>
          
          <div class="flex items-center justify-center gap-4">
            <lib-button size="lg">Get Started</lib-button>
            <lib-button variant="outline" size="lg">
              <lucide-angular [img]="icons.code" class="mr-2 h-4 w-4"></lucide-angular>
              GitHub
            </lib-button>
          </div>
        </section>

        <!-- Component Showcase Grid -->
        <div class="grid gap-8">
          
          <!-- Buttons Section -->
          <section class="space-y-6">
            <div>
              <h3 class="text-2xl font-semibold mb-2">Buttons</h3>
              <p class="text-muted-foreground">Versatile button component with multiple variants and states.</p>
            </div>
            
            <lib-card class="p-6">
              <div class="space-y-4">
                <!-- Button Variants -->
                <div>
                  <h4 class="text-sm font-medium mb-3">Variants</h4>
                  <div class="flex flex-wrap items-center gap-2">
                    <lib-button variant="default">Default</lib-button>
                    <lib-button variant="secondary">Secondary</lib-button>
                    <lib-button variant="outline">Outline</lib-button>
                    <lib-button variant="ghost">Ghost</lib-button>
                    <lib-button variant="link">Link</lib-button>
                    <lib-button variant="destructive">Destructive</lib-button>
                  </div>
                </div>

                <!-- Button Sizes -->
                <div>
                  <h4 class="text-sm font-medium mb-3">Sizes</h4>
                  <div class="flex flex-wrap items-center gap-2">
                    <lib-button size="sm">Small</lib-button>
                    <lib-button size="default">Default</lib-button>
                    <lib-button size="lg">Large</lib-button>
                    <lib-button size="icon">
                      <lucide-angular [img]="icons.settings" class="h-4 w-4"></lucide-angular>
                    </lib-button>
                  </div>
                </div>

                <!-- Button States -->
                <div>
                  <h4 class="text-sm font-medium mb-3">States</h4>
                  <div class="flex flex-wrap items-center gap-2">
                    <lib-button [leftIcon]="icons.mail">With Icon</lib-button>
                    <lib-button [loading]="buttonLoading()" (onClick)="simulateLoading()">
                      {{ buttonLoading() ? 'Loading...' : 'Click me' }}
                    </lib-button>
                    <lib-button [disabled]="true">Disabled</lib-button>
                  </div>
                </div>
              </div>
            </lib-card>
          </section>

          <!-- Form Components Section -->
          <section class="space-y-6">
            <div>
              <h3 class="text-2xl font-semibold mb-2">Form Components</h3>
              <p class="text-muted-foreground">Input fields, checkboxes, switches, and form controls using zoneless architecture.</p>
            </div>
            
            <lib-card class="p-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Input Fields</h4>
                  
                  <lib-input 
                    placeholder="Enter your email"
                    [value]="email()"
                    (valueChange)="onEmailChange($event)"
                  ></lib-input>
                  
                  <lib-input 
                    type="password"
                    placeholder="Password"
                    [value]="password()"
                    (valueChange)="onPasswordChange($event)"
                  ></lib-input>
                  
                  <h4 class="text-sm font-medium mt-4">Checkboxes</h4>
                  <div class="space-y-3">
                    <div class="flex items-center space-x-2">
                      <lib-checkbox 
                        id="terms-showcase"
                        [checked]="acceptTerms()"
                        (checkedChange)="onTermsChange($event)">
                      </lib-checkbox>
                      <label for="terms-showcase" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Accept terms and conditions
                      </label>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                      <lib-checkbox 
                        id="marketing-showcase"
                        size="sm"
                        [checked]="marketingEmails()"
                        (checkedChange)="onMarketingEmailsChange($event)">
                      </lib-checkbox>
                      <label for="marketing-showcase" class="text-xs">
                        Subscribe to marketing emails
                      </label>
                    </div>
                    
                    <div class="flex items-center space-x-2">
                      <lib-checkbox 
                        id="security-showcase"
                        [checked]="securityAlerts()"
                        (checkedChange)="onSecurityAlertsChange($event)">
                      </lib-checkbox>
                      <label for="security-showcase" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Security alerts (required)
                      </label>
                    </div>
                  </div>
                </div>

                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Switches & Toggles</h4>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium">Notifications</label>
                    <lib-switch 
                      [checked]="notificationsEnabled()"
                      (checkedChange)="onNotificationsChange($event)">
                    </lib-switch>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium">Auto-save</label>
                    <lib-switch 
                      size="sm" 
                      [checked]="autoSaveEnabled()"
                      (checkedChange)="onAutoSaveChange($event)">
                    </lib-switch>
                  </div>
                </div>
              </div>
            </lib-card>
          </section>

          <!-- Select Components Section -->
          <lib-select-demo></lib-select-demo>

          <!-- Display Components -->
          <section class="space-y-6">
            <div>
              <h3 class="text-2xl font-semibold mb-2">Display Components</h3>
              <p class="text-muted-foreground">Badges, avatars, alerts, and cards.</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- Badges & Avatars -->
              <lib-card class="p-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Badges</h4>
                  <div class="flex flex-wrap items-center gap-2">
                    <lib-badge variant="default">Default</lib-badge>
                    <lib-badge variant="secondary">Secondary</lib-badge>
                    <lib-badge variant="outline">Outline</lib-badge>
                    <lib-badge variant="destructive">Error</lib-badge>
                  </div>

                  <h4 class="text-sm font-medium mt-6">Avatars</h4>
                  <div class="flex items-center gap-3">
                    <lib-avatar 
                      src="https://github.com/shadcn.png"
                      alt="shadcn"
                      fallback="CN"
                      size="sm"
                    ></lib-avatar>
                    <lib-avatar 
                      src="https://github.com/vercel.png"
                      alt="Vercel"
                      fallback="V"
                    ></lib-avatar>
                    <lib-avatar fallback="JD" size="lg"></lib-avatar>
                    <lib-avatar fallback="XL" size="xl"></lib-avatar>
                  </div>
                </div>
              </lib-card>

              <!-- Alerts -->
              <lib-card class="p-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Alerts</h4>
                  
                  <lib-alert variant="default">
                    <lucide-angular [img]="icons.info" class="h-4 w-4"></lucide-angular>
                    <div>
                      <h5 class="font-medium">Heads up!</h5>
                      <p class="text-sm text-muted-foreground mt-1">
                        You can add components to your app using the cli.
                      </p>
                    </div>
                  </lib-alert>

                  <lib-alert variant="destructive">
                    <lucide-angular [img]="icons.alertTriangle" class="h-4 w-4"></lucide-angular>
                    <div>
                      <h5 class="font-medium">Error</h5>
                      <p class="text-sm text-muted-foreground mt-1">
                        Your session has expired. Please log in again.
                      </p>
                    </div>
                  </lib-alert>
                </div>
              </lib-card>
            </div>
          </section>

          <!-- Complex Examples -->
          <section class="space-y-6">
            <div>
              <h3 class="text-2xl font-semibold mb-2">Real-world Examples</h3>
              <p class="text-muted-foreground">Components working together in practical scenarios.</p>
            </div>
            
            <div class="grid md:grid-cols-2 gap-6">
              <!-- User Profile Card -->
              <lib-card>
                <div class="p-6">
                  <div class="flex items-start justify-between">
                    <div class="flex items-center gap-3">
                      <lib-avatar 
                        src="https://github.com/shadcn.png"
                        fallback="SH"
                        size="lg"
                      ></lib-avatar>
                      <div>
                        <h4 class="font-semibold">shadcn</h4>
                        <p class="text-sm text-muted-foreground">@shadcn</p>
                        <lib-badge variant="secondary" class="mt-1">Pro</lib-badge>
                      </div>
                    </div>
                    <lib-button variant="outline" size="sm">
                      Follow
                    </lib-button>
                  </div>
                  
                  <p class="text-sm mt-4">
                    Building tools for developers. Creator of shadcn/ui.
                  </p>
                  
                  <div class="flex items-center gap-4 mt-4 text-sm text-muted-foreground">
                    <span>1.2k followers</span>
                    <span>256 following</span>
                  </div>
                </div>
              </lib-card>

              <!-- Settings Panel -->
              <lib-card>
                <div class="p-6">
                  <h4 class="font-semibold mb-4">Settings</h4>
                  
                  <div class="space-y-4">
                    <div class="flex items-center justify-between">
                      <div>
                        <label class="text-sm font-medium">Email notifications</label>
                        <p class="text-xs text-muted-foreground">Receive emails about your account activity.</p>
                      </div>
                      <lib-switch 
                        [checked]="emailNotifications()"
                        (checkedChange)="onEmailNotificationsChange($event)">
                      </lib-switch>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <label class="text-sm font-medium">Marketing emails</label>
                        <p class="text-xs text-muted-foreground">Receive emails about new products and features.</p>
                      </div>
                      <lib-switch 
                        [checked]="marketingEmails()"
                        (checkedChange)="onMarketingEmailsChange($event)">
                      </lib-switch>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <label class="text-sm font-medium">Security alerts</label>
                        <p class="text-xs text-muted-foreground">Receive alerts about your account security.</p>
                      </div>
                      <lib-switch 
                        [checked]="securityAlerts()"
                        (checkedChange)="onSecurityAlertsChange($event)">
                      </lib-switch>
                    </div>

                    <div class="flex gap-2 pt-4">
                      <lib-button size="sm">Save changes</lib-button>
                      <lib-button variant="outline" size="sm">Cancel</lib-button>
                    </div>
                  </div>
                </div>
              </lib-card>
            </div>
          </section>

          <!-- Navigation Components -->
          <section class="space-y-6">
            <div>
              <h3 class="text-2xl font-semibold mb-2">Navigation Components</h3>
              <p class="text-muted-foreground">Components for navigation and wayfinding.</p>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <!-- Breadcrumbs -->
              <lib-card class="p-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Breadcrumbs</h4>
                  <lib-breadcrumb [items]="breadcrumbItems"></lib-breadcrumb>
                  
                  <lib-breadcrumb 
                    [items]="breadcrumbItems" 
                    size="sm"
                    variant="ghost">
                  </lib-breadcrumb>
                </div>
              </lib-card>

              <!-- Tabs -->
              <lib-card class="p-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Tabs</h4>
                  <lib-tabs 
                    [tabs]="tabItems" 
                    [activeTab]="activeTab()"
                    (activeTabChange)="onTabChange($event)">
                  </lib-tabs>
                </div>
              </lib-card>
            </div>
          </section>

          <!-- Progress & Feedback Components -->
          <section class="space-y-6">
            <div>
              <h3 class="text-2xl font-semibold mb-2">Progress & Feedback</h3>
              <p class="text-muted-foreground">Components for showing progress and providing feedback.</p>
            </div>

            <div class="grid md:grid-cols-2 gap-6">
              <!-- Progress Bars -->
              <lib-card class="p-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Progress</h4>
                  
                  <!-- Linear Progress -->
                  <div class="space-y-3">
                    <lib-progress [value]="progressValue()" [showLabel]="true"></lib-progress>
                    <lib-progress [value]="45" variant="success" [showLabel]="true"></lib-progress>
                    <lib-progress [value]="80" variant="warning" [showLabel]="true"></lib-progress>
                    <lib-progress [indeterminate]="true" label="Loading..."></lib-progress>
                  </div>
                </div>
              </lib-card>

              <!-- Circular Progress -->
              <lib-card class="p-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Circular Progress</h4>
                  
                  <div class="flex items-center gap-4">
                    <lib-progress 
                      type="circular" 
                      [value]="progressValue()" 
                      size="sm" 
                      [showLabel]="true">
                    </lib-progress>
                    <lib-progress 
                      type="circular" 
                      [value]="60" 
                      size="md" 
                      variant="success" 
                      [showLabel]="true">
                    </lib-progress>
                    <lib-progress 
                      type="circular" 
                      [value]="90" 
                      size="lg" 
                      variant="warning" 
                      [showLabel]="true">
                    </lib-progress>
                  </div>
                </div>
              </lib-card>
            </div>
          </section>

          <!-- Interactive Components -->
          <section class="space-y-6">
            <div>
              <h3 class="text-2xl font-semibold mb-2">Interactive Components</h3>
              <p class="text-muted-foreground">Components for user interaction and data organization.</p>
            </div>

            <div class="grid gap-6">
              <!-- Accordion -->
              <lib-card class="p-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Accordion</h4>
                  <lib-accordion [items]="accordionItems"></lib-accordion>
                </div>
              </lib-card>

              <!-- Dropdown Menu -->
              <lib-card class="p-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Dropdown Menu</h4>
                  <div class="flex gap-4">
                    <lib-dropdown-menu [items]="dropdownMenuItems">
                      <lib-button variant="outline">
                        <lucide-angular [img]="icons.menu" class="h-4 w-4 mr-2"></lucide-angular>
                        Menu
                      </lib-button>
                    </lib-dropdown-menu>

                    <lib-dropdown-menu [items]="dropdownMenuItems" size="sm">
                      <lib-button variant="ghost" size="sm">
                        Actions
                      </lib-button>
                    </lib-dropdown-menu>
                  </div>
                </div>
              </lib-card>
            </div>
          </section>

          <!-- Code Examples -->
          <section class="space-y-6">
            <div>
              <h3 class="text-2xl font-semibold mb-2">Getting Started</h3>
              <p class="text-muted-foreground">Quick examples to get you up and running.</p>
            </div>
            
            <lib-card class="p-6">
              <div class="space-y-4">
                <div class="flex items-center justify-between">
                  <h4 class="text-sm font-medium">Installation</h4>
                  <lib-button 
                    variant="outline" 
                    size="sm"
                    (onClick)="copyToClipboard('npm install shadcn-angular')"
                  >
                    <lucide-angular 
                      [img]="copied() ? icons.check : icons.copy" 
                      class="h-4 w-4 mr-2"
                    ></lucide-angular>
                    {{ copied() ? 'Copied!' : 'Copy' }}
                  </lib-button>
                </div>
                
                <div class="bg-muted rounded-lg p-4 font-mono text-sm">
                  npm install shadcn-angular lucide-angular class-variance-authority clsx tailwind-merge
                </div>

                <div class="pt-4">
                  <h4 class="text-sm font-medium mb-2">Basic Usage</h4>
                  <div class="bg-muted rounded-lg p-4 font-mono text-sm">
                    <div class="text-muted-foreground">// Import and use components</div>
                    <div class="mt-2">
                      <span class="text-blue-600">import</span> {{ '{' }} ButtonComponent {{ '}' }} <span class="text-blue-600">from</span> <span class="text-green-600">'shadcn-angular'</span>;
                    </div>
                    <div class="mt-2">
                      <span class="text-purple-600">&lt;lib-button</span> <span class="text-blue-600">variant</span>=<span class="text-green-600">"outline"</span><span class="text-purple-600">&gt;</span>
                    </div>
                    <div class="ml-4">Click me</div>
                    <div>
                      <span class="text-purple-600">&lt;/lib-button&gt;</span>
                    </div>
                  </div>
                </div>
              </div>
            </lib-card>
          </section>

          <!-- Modal Components Section -->
          <section class="space-y-6">
            <h3 class="text-2xl font-semibold">Modal & Dialog Components</h3>
            <lib-card>
              <div class="p-6">
                <lib-modal-test></lib-modal-test>
              </div>
            </lib-card>
          </section>
        </div>
      </main>

      <!-- Footer -->
      <footer class="border-t mt-16 py-8">
        <div class="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with ❤️ for the Angular community. Inspired by <a href="https://ui.shadcn.com" target="_blank" rel="noopener noreferrer" class="underline">shadcn/ui</a>.</p>
        </div>
      </footer>
    </div>
  `,
})
export class ShadcnShowcaseComponent implements OnInit {
  // Theme service injection
  protected readonly themeService = inject(ThemeService);

  // Icon constants - readonly for performance
  protected readonly icons = {
    code: Code,
    moon: Moon,
    sun: Sun,
    mail: Mail,
    settings: Settings,
    user: User,
    copy: Copy,
    check: Check,
    info: Info,
    alertTriangle: AlertTriangle,
    home: Home,
    chevronRight: ChevronRight,
    menu: Menu,
    archive: Archive,
    folder: Folder,
    file: File,
    globe: Globe,
    mapPin: MapPin,
    star: Star,
    heart: Heart,
    shield: Shield
  } as const;

  // UI State signals
  private readonly _buttonLoading = signal(false);
  private readonly _copied = signal(false);
  private readonly _progressValue = signal(75);
  private readonly _activeTab = signal('overview');

  // Form state signals - zoneless architecture
  private readonly _formState = {
    email: signal(''),
    password: signal(''),
    acceptTerms: signal(false),
    notifications: signal(false),
    autoSave: signal(false),
    emailNotifications: signal(false),
    marketingEmails: signal(false),
    securityAlerts: signal(false)
  };

  // Public computed values for template
  readonly buttonLoading = computed(() => this._buttonLoading());
  readonly copied = computed(() => this._copied());
  readonly progressValue = computed(() => this._progressValue());
  readonly activeTab = computed(() => this._activeTab());
  
  // Form state accessors
  readonly email = computed(() => this._formState.email());
  readonly password = computed(() => this._formState.password());
  readonly acceptTerms = computed(() => this._formState.acceptTerms());
  readonly notificationsEnabled = computed(() => this._formState.notifications());
  readonly autoSaveEnabled = computed(() => this._formState.autoSave());
  readonly emailNotifications = computed(() => this._formState.emailNotifications());
  readonly marketingEmails = computed(() => this._formState.marketingEmails());
  readonly securityAlerts = computed(() => this._formState.securityAlerts());

  // Computed theme icon
  readonly themeIcon = computed(() => 
    this.themeService.resolvedTheme() === 'dark' ? this.icons.sun : this.icons.moon
  );

  // Computed form validation state
  readonly isFormValid = computed(() => 
    this.email().length > 0 && 
    this.password().length > 0 && 
    this.acceptTerms()
  );

  // Computed settings summary
  readonly settingsCount = computed(() => {
    const settings = [
      this.emailNotifications(),
      this.marketingEmails(),
      this.securityAlerts()
    ];
    return settings.filter(Boolean).length;
  });

  // Component data arrays
  tabItems: TabItem[] = [];
  accordionItems: AccordionItem[] = [];
  dropdownMenuItems: DropdownMenuItem[] = [];
  breadcrumbItems: BreadcrumbItem[] = [];

  ngOnInit(): void {
    this.initializeComponentData();
  }

  private initializeComponentData(): void {
    // Initialize tab items with proper icon references
    this.tabItems = [
      { id: 'overview', label: 'Overview', content: 'Overview content here...', icon: this.icons.home },
      { id: 'analytics', label: 'Analytics', content: 'Analytics dashboard content...', badge: '3' },
      { id: 'reports', label: 'Reports', content: 'Reports and data exports...' },
      { id: 'settings', label: 'Settings', content: 'Application settings...', icon: this.icons.settings }
    ];

    // Initialize accordion items
    this.accordionItems = [
      {
        id: 'getting-started',
        title: 'Getting Started',
        content: 'Learn how to install and configure the component library in your Angular project.',
        icon: this.icons.info
      },
      {
        id: 'components',
        title: 'Components Overview',
        content: 'Explore all available components including buttons, forms, navigation, and feedback elements.',
        expanded: true
      },
      {
        id: 'customization',
        title: 'Customization Guide',
        content: 'Customize colors, typography, spacing, and create your own design system variants.'
      },
      {
        id: 'examples',
        title: 'Code Examples',
        content: 'Real-world examples and patterns for building modern Angular applications.'
      }
    ];

    // Initialize dropdown menu items
    this.dropdownMenuItems = [
      { id: 'profile', label: 'Profile', icon: this.icons.user, shortcut: '⌘P' },
      { id: 'settings', label: 'Settings', icon: this.icons.settings, shortcut: '⌘,' },
      { id: 'separator1', label: '', type: 'separator' },
      { id: 'notifications', label: 'Notifications', type: 'checkbox', checked: true },
      { id: 'email-alerts', label: 'Email Alerts', type: 'checkbox', checked: false },
      { id: 'separator2', label: '', type: 'separator' },
      { id: 'logout', label: 'Log out', shortcut: '⌘⇧Q' }
    ];

    // Initialize breadcrumb items
    this.breadcrumbItems = [
      { id: 'home', label: 'Home', onClick: () => this.onBreadcrumbClick('home'), icon: this.icons.home },
      { id: 'components', label: 'Components', onClick: () => this.onBreadcrumbClick('components') },
      { id: 'ui', label: 'UI Components', onClick: () => this.onBreadcrumbClick('ui') },
      { id: 'current', label: 'Showcase', current: true }
    ];
  }

  // Theme actions
  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  // UI actions
  simulateLoading(): void {
    this._buttonLoading.set(true);
    setTimeout(() => {
      this._buttonLoading.set(false);
    }, 2000);
  }

  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this._copied.set(true);
      setTimeout(() => {
        this._copied.set(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }

  // Navigation actions
  onBreadcrumbClick(section: string): void {
    console.log(`Breadcrumb clicked: ${section}`);
    // In a real app, you would handle navigation here
  }

  // Form actions - zoneless pattern
  onEmailChange(value: string | number): void {
    this._formState.email.set(String(value));
  }

  onPasswordChange(value: string | number): void {
    this._formState.password.set(String(value));
  }

  onTermsChange(checked: boolean): void {
    this._formState.acceptTerms.set(checked);
  }

  // Switch handlers - improved signal management
  onNotificationsChange(checked: boolean): void {
    this._formState.notifications.set(checked);
  }

  onAutoSaveChange(checked: boolean): void {
    this._formState.autoSave.set(checked);
  }

  onEmailNotificationsChange(checked: boolean): void {
    this._formState.emailNotifications.set(checked);
  }

  onMarketingEmailsChange(checked: boolean): void {
    this._formState.marketingEmails.set(checked);
  }

  onSecurityAlertsChange(checked: boolean): void {
    this._formState.securityAlerts.set(checked);
  }

  // Tab navigation
  onTabChange(tabId: string): void {
    this._activeTab.set(tabId);
  }
}