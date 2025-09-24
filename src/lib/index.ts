/**
 * Main entry point for the shadcn-inspired Angular component library
 */

// Export utilities
export * from './utils/cn';
export * from './utils/theme';

// Export design tokens
export * from './tokens/colors';
export * from './tokens/typography';
export * from './tokens/spacing';

// Export types
export * from './types';

// Export components
// export * from './components/ui/button.component';
export * from './angular-shadcn/components/button/button.component';
export * from './angular-shadcn/components/button/button.variants';
export * from './angular-shadcn/components/avatar/avatar.component';
export * from './angular-shadcn/components/avatar/avatar.variants';
export * from './angular-shadcn/components/badge/badge.component';
export * from './angular-shadcn/components/badge/badge.variants';
export * from './components/ui/card.component';
export * from './components/ui/input.component';
export * from './components/ui/modal.component';
// export * from './components/ui/badge.component';
export * from './components/ui/alert.component';
export * from './components/ui/select.component';
// export * from './components/ui/avatar.component';
export * from './components/ui/switch.component';
export * from './components/ui/tooltip.component';
export * from './components/ui/simple-button.component';
export * from './components/ui/checkbox.component';

// Export new components
export { ProgressComponent } from './components/ui/progress.component';
export { TabsComponent } from './components/ui/tabs.component';
export { AccordionComponent } from './components/ui/accordion.component';
export { DropdownMenuComponent } from './components/ui/dropdown-menu.component';
export { BreadcrumbComponent } from './components/ui/breadcrumb.component';
export { PopoverComponent } from './components/ui/popover.component';

// Export Command components
export { 
  CommandComponent,
  CommandInputComponent,
  CommandListComponent,
  CommandEmptyComponent,
  CommandGroupComponent,
  CommandItemComponent,
  CommandSeparatorComponent,
  CommandShortcutComponent,
  CommandDialogComponent
} from './components/ui/command.component';

// Export demo components from new location
export * from './demo/components/demo.component';
export * from './demo/components/button-test.component';
export * from './demo/components/shadcn-showcase.component';
export * from './demo/components/modal-test.component';
export * from './demo/components/documentation.component';
export { PopoverDemoComponent } from './demo/components/popover-demo.component';
export { CommandDemoComponent } from './demo/components/command-demo.component';

// Future components (will be added as they are created)
// export * from './components/ui/badge';
// export * from './components/ui/alert';
// export * from './components/ui/select';
// export * from './components/ui/checkbox';
// export * from './components/ui/radio';
// export * from './components/ui/switch';
// export * from './components/ui/progress';
// export * from './components/ui/avatar';

// Export form components (will be added as they are created)
// export * from './components/forms/form';
// export * from './components/forms/form-field';
// export * from './components/forms/label';

// Export layout components (will be added as they are created)
// export * from './components/layout/container';
// export * from './components/layout/grid';
// export * from './components/layout/stack';
// export * from './components/layout/separator';

// Export feedback components (will be added as they are created)
// export * from './components/feedback/toast';
// export * from './components/feedback/spinner';
// export * from './components/feedback/skeleton';