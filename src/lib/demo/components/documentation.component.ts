import { 
  Component, 
  computed, 
  signal, 
  input,
  OnInit,
  inject,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { LucideAngularModule } from 'lucide-angular';

// UI Components
import { ButtonComponent } from '../../components/ui/button.component';
import { InputComponent } from '../../components/ui/input.component';
import { BadgeComponent } from '../../components/ui/badge.component';
import { BreadcrumbComponent } from '../../components/ui/breadcrumb.component';

// App Components
import { ThemeToggleComponent } from '../../../app/components/theme-toggle.component';

// Documentation data
import { 
  DOC_NAVIGATION, 
  type DocNavigationItem,
  getAllNavigationItems,
  findNavigationItem,
  getBreadcrumbPath
} from '../../docs/navigation';

// Icons
import { 
  Menu, 
  Search, 
  ChevronRight, 
  ChevronDown, 
  ExternalLink,
  Github,
  BookOpen,
  Code2,
  Lightbulb,
  Zap,
  FileText
} from 'lucide-angular';

/**
 * Documentation browser component with sidebar navigation
 * Provides a comprehensive documentation experience similar to shadcn/ui docs
 */
@Component({
  selector: 'lib-documentation',
  standalone: true,
  imports: [
    CommonModule,
    LucideAngularModule,
    ButtonComponent,
    InputComponent,
    BadgeComponent,
    BreadcrumbComponent,
    ThemeToggleComponent
  ],
  template: `
    <div class="min-h-screen bg-background">
      <!-- Mobile header -->
      <div class="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 lg:hidden">
        <div class="container flex h-14 items-center px-4 sm:px-6">
          <lib-button
            variant="ghost"
            size="icon"
            (onClick)="toggleMobileSidebar()"
            class="mr-2"
          >
            <lucide-angular [img]="icons.menu" class="h-4 w-4"></lucide-angular>
          </lib-button>
          
          <div class="flex items-center space-x-2">
            <lucide-angular [img]="icons.bookOpen" class="h-5 w-5"></lucide-angular>
            <span class="font-medium">Documentation</span>
          </div>
          
          <div class="ml-auto flex items-center space-x-2">
            <app-theme-toggle></app-theme-toggle>
            <lib-button variant="ghost" size="icon">
              <lucide-angular [img]="icons.github" class="h-4 w-4"></lucide-angular>
            </lib-button>
          </div>
        </div>
      </div>

      <div class="container flex-1 items-start md:grid md:grid-cols-[240px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:gap-10 max-w-none px-4 sm:px-6 lg:px-8">
        <!-- Sidebar -->
        <aside 
          class="fixed top-14 z-30 hidden h-[calc(100vh-3.5rem)] w-full shrink-0 md:sticky md:block"
          [class.block]="isMobileSidebarOpen()"
          [class.hidden]="!isMobileSidebarOpen()"
        >
          <div class="relative overflow-hidden h-full py-6 pr-6 lg:py-8 pl-2">
            <!-- Search -->
            <div class="mb-4 px-4">
              <lib-input
                placeholder="Search documentation..."
                [leftIcon]="icons.search"
                [value]="searchQuery()"
                (valueChange)="updateSearchQuery($event)"
              />
            </div>

            <!-- Navigation Tree -->
            <div class="h-[calc(100vh-8rem)] overflow-y-auto">
              <div class="px-4">
                @for (section of filteredNavigation(); track section.id) {
                  <div class="pb-4">
                    <!-- Section Header -->
                    <h4 class="mb-1 rounded-md px-2 py-1 text-sm font-semibold">
                      {{ section.title }}
                    </h4>
                    
                    <!-- Section Items -->
                    @if (section.items) {
                      <div class="grid grid-flow-row auto-rows-max text-sm">
                        @for (item of section.items; track item.id) {
                          @if (item.items) {
                            <!-- Subsection with collapsible items -->
                            <div class="relative">
                              <button
                                class="flex w-full items-center justify-between rounded-md px-2 py-1 text-left text-sm hover:bg-accent hover:text-accent-foreground"
                                (click)="toggleSection(item.id)"
                              >
                                <span class="font-medium">{{ item.title }}</span>
                                <lucide-angular 
                                  [img]="isExpanded(item.id) ? icons.chevronDown : icons.chevronRight" 
                                  class="h-4 w-4"
                                ></lucide-angular>
                              </button>
                              
                              @if (isExpanded(item.id)) {
                                <div class="ml-4 mt-1 grid grid-flow-row auto-rows-max border-l border-border pl-2">
                                  @for (subItem of item.items; track subItem.id) {
                                    <a
                                      [href]="subItem.href"
                                      class="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
                                      [class.bg-accent]="isActiveRoute(subItem.href)"
                                      [class.text-accent-foreground]="isActiveRoute(subItem.href)"
                                      (click)="onNavigationClick(subItem.href, $event)"
                                    >
                                      <span>{{ subItem.title }}</span>
                                      @if (subItem.badge) {
                                        <lib-badge variant="secondary" size="sm" class="ml-auto">
                                          {{ subItem.badge }}
                                        </lib-badge>
                                      }
                                    </a>
                                  }
                                </div>
                              }
                            </div>
                          } @else {
                            <!-- Direct link item -->
                            <a
                              [href]="item.href"
                              class="flex items-center rounded-md px-2 py-1 text-sm hover:bg-accent hover:text-accent-foreground"
                              [class.bg-accent]="isActiveRoute(item.href)"
                              [class.text-accent-foreground]="isActiveRoute(item.href)"
                              (click)="onNavigationClick(item.href, $event)"
                            >
                              <span>{{ item.title }}</span>
                              @if (item.badge) {
                                <lib-badge variant="secondary" size="sm" class="ml-auto">
                                  {{ item.badge }}
                                </lib-badge>
                              }
                            </a>
                          }
                        }
                      </div>
                    }
                  </div>
                }
              </div>
            </div>
          </div>
        </aside>

        <!-- Main Content -->
        <main class="relative py-6 lg:gap-10 lg:py-8 px-4 md:px-6 lg:px-8 min-w-0">
          <!-- Breadcrumb -->
          @if (currentBreadcrumbs().length > 0) {
            <div class="mb-4">
              <lib-breadcrumb [items]="currentBreadcrumbs()"></lib-breadcrumb>
            </div>
          }

          <!-- Content Header -->
          @if (currentPage()) {
            <div class="space-y-2">
              <h1 class="scroll-m-20 text-4xl font-bold tracking-tight">
                {{ currentPage()?.title }}
              </h1>
              @if (currentPage()?.description) {
                <p class="text-xl text-muted-foreground">
                  {{ currentPage()?.description }}
                </p>
              }
            </div>
          }

          <!-- Content Area -->
          <div class="pb-12 pt-8">
            <ng-content></ng-content>
          </div>

          <!-- Footer Navigation -->
          @if (previousPage() || nextPage()) {
            <div class="flex justify-between border-t pt-6">
              @if (previousPage()) {
                <a 
                  [href]="previousPage()?.href"
                  class="flex items-center space-x-2 text-sm hover:underline"
                  (click)="onNavigationClick(previousPage()?.href, $event)"
                >
                  <lucide-angular [img]="icons.chevronLeft" class="h-4 w-4"></lucide-angular>
                  <span>{{ previousPage()?.title }}</span>
                </a>
              } @else {
                <div></div>
              }
              
              @if (nextPage()) {
                <a 
                  [href]="nextPage()?.href"
                  class="flex items-center space-x-2 text-sm hover:underline"
                  (click)="onNavigationClick(nextPage()?.href, $event)"
                >
                  <span>{{ nextPage()?.title }}</span>
                  <lucide-angular [img]="icons.chevronRight" class="h-4 w-4"></lucide-angular>
                </a>
              }
            </div>
          }
        </main>
      </div>

      <!-- Mobile sidebar overlay -->
      @if (isMobileSidebarOpen()) {
        <div 
          class="fixed inset-0 top-14 z-20 bg-background/50 backdrop-blur-sm lg:hidden"
          (click)="closeMobileSidebar()"
        ></div>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class DocumentationComponent implements OnInit {
  private router = inject(Router);
  
  // Icons
  readonly icons = {
    menu: Menu,
    search: Search,
    chevronRight: ChevronRight,
    chevronDown: ChevronDown,
    chevronLeft: ChevronRight, // Will be rotated in CSS
    externalLink: ExternalLink,
    github: Github,
    bookOpen: BookOpen,
    code2: Code2,
    lightbulb: Lightbulb,
    zap: Zap,
    fileText: FileText
  };

  // State
  readonly searchQuery = signal('');
  readonly isMobileSidebarOpen = signal(false);
  readonly expandedSections = signal(new Set(['core', 'form', 'navigation', 'feedback', 'layout']));
  readonly currentRoute = signal('');

  // Input for current page content
  readonly currentPageId = input<string>('');

  // Navigation data
  readonly navigation = DOC_NAVIGATION;
  readonly allItems = getAllNavigationItems();

  // Computed properties
  readonly filteredNavigation = computed(() => {
    const query = this.searchQuery().toLowerCase();
    if (!query) return this.navigation;

    return this.navigation.map((section: DocNavigationItem) => ({
      ...section,
      items: section.items?.map((item: DocNavigationItem) => ({
        ...item,
        items: item.items?.filter((subItem: DocNavigationItem) => 
          subItem.title.toLowerCase().includes(query) ||
          subItem.description?.toLowerCase().includes(query)
        )
      })).filter((item: DocNavigationItem) => 
        item.title.toLowerCase().includes(query) ||
        (item.items && item.items.length > 0)
      )
    })).filter((section: DocNavigationItem) => section.items && section.items.length > 0);
  });

  readonly currentPage = computed(() => {
    const route = this.currentRoute();
    return findNavigationItem(route);
  });

  readonly currentBreadcrumbs = computed(() => {
    const route = this.currentRoute();
    if (!route) return [];
    
    const breadcrumbs = getBreadcrumbPath(route);
    return breadcrumbs.map((item: DocNavigationItem) => ({
      id: item.id,
      label: item.title,
      href: item.href,
      current: item.href === route
    }));
  });

  readonly previousPage = computed(() => {
    const currentIndex = this.allItems.findIndex((item: DocNavigationItem) => item.href === this.currentRoute());
    return currentIndex > 0 ? this.allItems[currentIndex - 1] : null;
  });

  readonly nextPage = computed(() => {
    const currentIndex = this.allItems.findIndex((item: DocNavigationItem) => item.href === this.currentRoute());
    return currentIndex < this.allItems.length - 1 ? this.allItems[currentIndex + 1] : null;
  });

  ngOnInit() {
    // Initialize current route
    this.currentRoute.set(this.router.url);

    // Listen to route changes
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.currentRoute.set(event.url);
        this.closeMobileSidebar();
      });
  }

  /**
   * Toggle mobile sidebar
   */
  toggleMobileSidebar(): void {
    this.isMobileSidebarOpen.update(isOpen => !isOpen);
  }

  /**
   * Close mobile sidebar
   */
  closeMobileSidebar(): void {
    this.isMobileSidebarOpen.set(false);
  }

  /**
   * Toggle section expansion
   */
  toggleSection(sectionId: string): void {
    this.expandedSections.update(expanded => {
      const newExpanded = new Set(expanded);
      if (newExpanded.has(sectionId)) {
        newExpanded.delete(sectionId);
      } else {
        newExpanded.add(sectionId);
      }
      return newExpanded;
    });
  }

  /**
   * Check if section is expanded
   */
  isExpanded(sectionId: string): boolean {
    return this.expandedSections().has(sectionId);
  }

  /**
   * Check if route is active
   */
  isActiveRoute(href?: string): boolean {
    if (!href) return false;
    return this.currentRoute() === href;
  }

  /**
   * Update search query
   */
  updateSearchQuery(value: string | number): void {
    this.searchQuery.set(String(value));
  }

  /**
   * Handle navigation clicks
   */
  onNavigationClick(href?: string, event?: Event): void {
    if (!href) return;
    
    event?.preventDefault();
    this.router.navigate([href]);
  }
}