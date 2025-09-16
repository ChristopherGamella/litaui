import { Component, signal, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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
import { ThemeService } from '../../utils/theme';
import { LucideAngularModule, Mail, Settings, User, Moon, Sun, Code2, Copy, Check, Info, AlertTriangle, Home, ChevronRight, Menu, Archive, Folder, File } from 'lucide-angular';

/**
 * Comprehensive demo component showcasing all shadcn/ui Angular components
 * 
 * This component serves as:
 * - Living documentation of component usage
 * - Visual regression testing reference
 * - Component integration examples
 * - Design system showcase
 */
@Component({
  selector: 'lib-shadcn-showcase',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
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
    LucideAngularModule
  ],
  template: `
    <div class="min-h-screen bg-background text-foreground">
      <!-- Header -->
      <header class="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div class="container flex h-14 items-center justify-between px-4">
          <div class="flex items-center gap-2">
            <lucide-angular [img]="Code2Icon" class="h-6 w-6"></lucide-angular>
            <h1 class="text-lg font-semibold">shadcn/ui for Angular</h1>
            <lib-badge variant="secondary">v1.0.0</lib-badge>
          </div>
          
          <div class="flex items-center gap-2">
            <lib-button
              variant="ghost"
              size="icon"
              (onClick)="toggleTheme()"
            >
              <lucide-angular 
                [img]="themeService.resolvedTheme() === 'dark' ? SunIcon : MoonIcon" 
                class="h-4 w-4"
              ></lucide-angular>
            </lib-button>
            
            <lib-button variant="outline" size="sm">
              <lucide-angular [img]="CodeIcon" class="mr-2 h-4 w-4"></lucide-angular>
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
            <lib-button size="lg">
              Get Started
            </lib-button>
            <lib-button variant="outline" size="lg">
              <lucide-angular [img]="CodeIcon" class="mr-2 h-4 w-4"></lucide-angular>
              GitHub
            </lib-button>
          </div>
        </section>

        <!-- Component Showcase -->
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
                      <lucide-angular [img]="SettingsIcon" class="h-4 w-4"></lucide-angular>
                    </lib-button>
                  </div>
                </div>

                <!-- Button States -->
                <div>
                  <h4 class="text-sm font-medium mb-3">States</h4>
                  <div class="flex flex-wrap items-center gap-2">
                    <lib-button [leftIcon]="MailIcon">
                      With Icon
                    </lib-button>
                    <lib-button [loading]="buttonLoading()" (onClick)="simulateLoading()">
                      {{ buttonLoading() ? 'Loading...' : 'Click me' }}
                    </lib-button>
                    <lib-button [disabled]="true">Disabled</lib-button>
                  </div>
                </div>
              </div>
            </lib-card>
          </section>

          <!-- Form Components -->
          <section class="space-y-6">
            <div>
              <h3 class="text-2xl font-semibold mb-2">Form Components</h3>
              <p class="text-muted-foreground">Input fields, switches, and form controls.</p>
            </div>
            
            <lib-card class="p-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Input Fields</h4>
                  
                  <lib-input 
                    placeholder="Enter your email"
                    [(ngModel)]="demoEmail"
                  ></lib-input>
                  
                  <lib-input 
                    type="password"
                    placeholder="Password"
                    [(ngModel)]="demoPassword"
                  ></lib-input>
                  
                  <div class="flex items-center space-x-2">
                    <input 
                      type="checkbox"
                      id="terms"
                      [(ngModel)]="acceptTerms"
                      class="h-4 w-4 rounded border-input"
                    />
                    <label for="terms" class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                      Accept terms and conditions
                    </label>
                  </div>
                </div>

                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Switches & Toggles</h4>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium">Notifications</label>
                    <lib-switch [(ngModel)]="notificationsEnabled"></lib-switch>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium">Dark Mode</label>
                    <lib-switch [(ngModel)]="darkModeEnabled"></lib-switch>
                  </div>
                  
                  <div class="flex items-center justify-between">
                    <label class="text-sm font-medium">Auto-save</label>
                    <lib-switch size="sm" [(ngModel)]="autoSaveEnabled"></lib-switch>
                  </div>
                </div>
              </div>
            </lib-card>
          </section>

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
                    <lib-avatar 
                      fallback="JD"
                      size="lg"
                    ></lib-avatar>
                    <lib-avatar 
                      fallback="XL"
                      size="xl"
                    ></lib-avatar>
                  </div>
                </div>
              </lib-card>

              <!-- Alerts -->
              <lib-card class="p-6">
                <div class="space-y-4">
                  <h4 class="text-sm font-medium">Alerts</h4>
                  
                  <lib-alert variant="default">
                    <lucide-angular [img]="InfoIcon" class="h-4 w-4"></lucide-angular>
                    <div>
                      <h5 class="font-medium">Heads up!</h5>
                      <p class="text-sm text-muted-foreground mt-1">
                        You can add components to your app using the cli.
                      </p>
                    </div>
                  </lib-alert>

                  <lib-alert variant="destructive">
                    <lucide-angular [img]="AlertTriangleIcon" class="h-4 w-4"></lucide-angular>
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
                      <lib-switch [(ngModel)]="emailNotifications"></lib-switch>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <label class="text-sm font-medium">Marketing emails</label>
                        <p class="text-xs text-muted-foreground">Receive emails about new products and features.</p>
                      </div>
                      <lib-switch [(ngModel)]="marketingEmails"></lib-switch>
                    </div>

                    <div class="flex items-center justify-between">
                      <div>
                        <label class="text-sm font-medium">Security alerts</label>
                        <p class="text-xs text-muted-foreground">Receive alerts about your account security.</p>
                      </div>
                      <lib-switch [(ngModel)]="securityAlerts"></lib-switch>
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
                    [(activeTab)]="activeTab">
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
                        <lucide-angular [img]="MenuIcon" class="h-4 w-4 mr-2"></lucide-angular>
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
                      [img]="copied() ? CheckIcon : CopyIcon" 
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
        </div>
      </main>

      <!-- Footer -->
      <footer class="border-t mt-16 py-8">
        <div class="container mx-auto px-4 text-center text-muted-foreground">
          <p>Built with ❤️ for the Angular community. Inspired by <a href="https://ui.shadcn.com" class="underline">shadcn/ui</a>.</p>
        </div>
      </footer>
    </div>
  `,
})
export class ShadcnShowcaseComponent implements OnInit {
  // Icons
  readonly Code2Icon = Code2;
  readonly CodeIcon = Code2;
  readonly MoonIcon = Moon;
  readonly SunIcon = Sun;
  readonly MailIcon = Mail;
  readonly SettingsIcon = Settings;
  readonly UserIcon = User;
  readonly CopyIcon = Copy;
  readonly CheckIcon = Check;
  readonly InfoIcon = Info;
  readonly AlertTriangleIcon = AlertTriangle;
  readonly HomeIcon = Home;
  readonly ChevronRightIcon = ChevronRight;
  readonly MenuIcon = Menu;
  readonly ArchiveIcon = Archive;
  readonly FolderIcon = Folder;
  readonly FileIcon = File;

  // Component state
  buttonLoading = signal(false);
  copied = signal(false);
  progressValue = signal(75);
  activeTab = signal('overview');
  
  // Form data
  demoEmail = '';
  demoPassword = '';
  acceptTerms = false;
  notificationsEnabled = true;
  darkModeEnabled = false;
  autoSaveEnabled = true;
  emailNotifications = true;
  marketingEmails = false;
  securityAlerts = true;

  // Demo data for new components
  tabItems: TabItem[] = [
    { id: 'overview', label: 'Overview', content: 'Overview content here...', icon: this.HomeIcon },
    { id: 'analytics', label: 'Analytics', content: 'Analytics dashboard content...', badge: '3' },
    { id: 'reports', label: 'Reports', content: 'Reports and data exports...' },
    { id: 'settings', label: 'Settings', content: 'Application settings...', icon: this.SettingsIcon }
  ];

  accordionItems: AccordionItem[] = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      content: 'Learn how to install and configure the component library in your Angular project.',
      icon: this.InfoIcon
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

  dropdownMenuItems: DropdownMenuItem[] = [
    { id: 'profile', label: 'Profile', icon: this.UserIcon, shortcut: '⌘P' },
    { id: 'settings', label: 'Settings', icon: this.SettingsIcon, shortcut: '⌘,' },
    { id: 'separator1', label: '', type: 'separator' },
    { id: 'notifications', label: 'Notifications', type: 'checkbox', checked: true },
    { id: 'email-alerts', label: 'Email Alerts', type: 'checkbox', checked: false },
    { id: 'separator2', label: '', type: 'separator' },
    { id: 'logout', label: 'Log out', shortcut: '⌘⇧Q' }
  ];

  breadcrumbItems: BreadcrumbItem[] = [
    { id: 'home', label: 'Home', href: '/', icon: this.HomeIcon },
    { id: 'components', label: 'Components', href: '/components' },
    { id: 'ui', label: 'UI Components', href: '/components/ui' },
    { id: 'current', label: 'Showcase', current: true }
  ];

  constructor(public themeService: ThemeService) {}

  ngOnInit(): void {
    // Component initialization - modern Angular handles change detection automatically
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  simulateLoading(): void {
    this.buttonLoading.set(true);
    setTimeout(() => {
      this.buttonLoading.set(false);
      // Change detection is handled automatically by signals
    }, 2000);
  }

  async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copied.set(true);
      setTimeout(() => {
        this.copied.set(false);
        // Change detection is handled automatically by signals
      }, 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  }
}