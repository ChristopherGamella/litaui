/**
 * TypeScript interfaces and types for the shadcn-inspired Angular component library
 */

import { ColorToken, RadiusToken, TypographyToken as TypographyThemeToken, ShadowToken } from '../tokens/colors';
import { TypographyScale, FontSize, FontWeight, LetterSpacing, LineHeight } from '../tokens/typography';
import { SpacingScale } from '../tokens/spacing';

/**
 * Base component props interface
 */
export interface BaseComponentProps {
  /** Component ID for accessibility */
  id?: string;
  /** Additional CSS classes */
  class?: string;
  /** Component size variant */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Component variant */
  variant?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Test ID for testing */
  'data-testid'?: string;
}

/**
 * Interactive component props
 */
export interface InteractiveComponentProps extends BaseComponentProps {
  /** Tab index for keyboard navigation */
  tabIndex?: number;
  /** ARIA label for accessibility */
  ariaLabel?: string;
  /** ARIA described by */
  ariaDescribedBy?: string;
  /** ARIA expanded state */
  ariaExpanded?: boolean;
  /** Role attribute */
  role?: string;
}

/**
 * Form component props
 */
export interface FormComponentProps extends InteractiveComponentProps {
  /** Form control name */
  name?: string;
  /** Form value */
  value?: any;
  /** Placeholder text */
  placeholder?: string;
  /** Required field */
  required?: boolean;
  /** Readonly state */
  readonly?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Helper text */
  helperText?: string;
  /** Label text */
  label?: string;
  /** Label position */
  labelPosition?: 'top' | 'left' | 'right' | 'bottom';
}

/**
 * Button component props
 */
export interface ButtonProps extends InteractiveComponentProps {
  /** Button type */
  type?: 'button' | 'submit' | 'reset';
  /** Button variant */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Button size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Left icon */
  leftIcon?: string;
  /** Right icon */
  rightIcon?: string;
  /** Full width */
  fullWidth?: boolean;
  /** Loading text */
  loadingText?: string;
}

/**
 * Input component props
 */
export interface InputProps extends FormComponentProps {
  /** Input type */
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search';
  /** Left icon */
  leftIcon?: string;
  /** Right icon */
  rightIcon?: string;
  /** Clear button */
  clearable?: boolean;
  /** Input mode for mobile */
  inputMode?: 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
}

/**
 * Card component props
 */
export interface CardProps extends BaseComponentProps {
  /** Card variant */
  variant?: 'default' | 'elevated' | 'outlined' | 'filled';
  /** Card padding */
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  /** Hover effect */
  hoverable?: boolean;
  /** Clickable card */
  clickable?: boolean;
  /** Card header */
  header?: string;
  /** Card footer */
  footer?: string;
}

/**
 * Badge component props
 */
export interface BadgeProps extends BaseComponentProps {
  /** Badge variant */
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success' | 'warning' | 'info';
  /** Badge size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Badge shape */
  shape?: 'rounded' | 'square' | 'pill';
  /** Left icon */
  leftIcon?: string;
  /** Right icon */
  rightIcon?: string;
  /** Dismissible */
  dismissible?: boolean;
}

/**
 * Alert component props
 */
export interface AlertProps extends BaseComponentProps {
  /** Alert variant */
  variant?: 'default' | 'destructive' | 'success' | 'warning' | 'info';
  /** Alert title */
  title?: string;
  /** Alert description */
  description?: string;
  /** Left icon */
  icon?: string;
  /** Dismissible */
  dismissible?: boolean;
  /** Auto close timeout */
  autoClose?: number;
}

/**
 * Modal/Dialog component props
 */
export interface ModalProps extends Omit<BaseComponentProps, 'size'> {
  /** Modal open state */
  open?: boolean;
  /** Modal title */
  title?: string;
  /** Modal description */
  description?: string;
  /** Modal size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  /** Close on overlay click */
  closeOnOverlayClick?: boolean;
  /** Close on escape key */
  closeOnEscape?: boolean;
  /** Show close button */
  showCloseButton?: boolean;
  /** Modal position */
  position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
}

/**
 * Select/Dropdown component props
 */
export interface SelectProps extends FormComponentProps {
  /** Select options */
  options?: SelectOption[];
  /** Multiple selection */
  multiple?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Searchable */
  searchable?: boolean;
  /** Clearable */
  clearable?: boolean;
  /** Loading state */
  loading?: boolean;
  /** Custom option template */
  optionTemplate?: any;
  /** Max height */
  maxHeight?: string;
}

/**
 * Select option interface
 */
export interface SelectOption {
  /** Option label */
  label: string;
  /** Option value */
  value: any;
  /** Option disabled state */
  disabled?: boolean;
  /** Option icon */
  icon?: string;
  /** Option description */
  description?: string;
  /** Option group */
  group?: string;
}

/**
 * Checkbox component props
 */
export interface CheckboxProps extends FormComponentProps {
  /** Checked state */
  checked?: boolean;
  /** Indeterminate state */
  indeterminate?: boolean;
  /** Checkbox size */
  size?: 'sm' | 'md' | 'lg';
  /** Label position */
  labelPosition?: 'right' | 'left';
}

/**
 * Radio component props
 */
export interface RadioProps extends FormComponentProps {
  /** Radio value */
  radioValue?: any;
  /** Radio group name */
  name?: string;
  /** Radio size */
  size?: 'sm' | 'md' | 'lg';
  /** Label position */
  labelPosition?: 'right' | 'left';
}

/**
 * Switch/Toggle component props
 */
export interface SwitchProps extends FormComponentProps {
  /** Switch size */
  size?: 'sm' | 'md' | 'lg';
  /** On label */
  onLabel?: string;
  /** Off label */
  offLabel?: string;
  /** Show labels */
  showLabels?: boolean;
}

/**
 * Progress component props
 */
export interface ProgressProps extends BaseComponentProps {
  /** Progress value (0-100) */
  value?: number;
  /** Progress max value */
  max?: number;
  /** Progress variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Show value text */
  showValue?: boolean;
  /** Progress size */
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Animated */
  animated?: boolean;
  /** Striped */
  striped?: boolean;
}

/**
 * Avatar component props
 */
export interface AvatarProps extends BaseComponentProps {
  /** Avatar source URL */
  src?: string;
  /** Avatar alt text */
  alt?: string;
  /** Avatar fallback text */
  fallback?: string;
  /** Avatar size */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  /** Avatar shape */
  shape?: 'circle' | 'square' | 'rounded';
  /** Show status indicator */
  showStatus?: boolean;
  /** Status color */
  statusColor?: 'success' | 'warning' | 'error' | 'info';
}

/**
 * Theme-related types
 */
export type { ColorToken, RadiusToken, TypographyThemeToken, ShadowToken, TypographyScale, FontSize, FontWeight, LetterSpacing, LineHeight, SpacingScale };

/**
 * Utility types
 */
export type ComponentSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ComponentVariant<T extends string = string> = T;
export type ComponentState = 'default' | 'hover' | 'focus' | 'active' | 'disabled' | 'loading';

/**
 * Event handler types
 */
export type ClickHandler = (event: Event) => void;
export type FocusHandler = (event: FocusEvent) => void;
export type BlurHandler = (event: FocusEvent) => void;
export type KeydownHandler = (event: KeyboardEvent) => void;
export type ChangeHandler<T = any> = (value: T, event?: Event) => void;

/**
 * Form validation types
 */
export interface ValidationRule {
  /** Validation function */
  validator: (value: any) => boolean;
  /** Error message */
  message: string;
  /** Validation trigger */
  trigger?: 'blur' | 'change' | 'input';
}

export interface ValidationResult {
  /** Is valid */
  valid: boolean;
  /** Error message */
  message?: string;
  /** Field name */
  field?: string;
}

/**
 * Component composition types
 */
export interface ComponentComposition {
  /** Root element class */
  root?: string;
  /** Header element class */
  header?: string;
  /** Body element class */
  body?: string;
  /** Footer element class */
  footer?: string;
  /** Icon element class */
  icon?: string;
  /** Label element class */
  label?: string;
  /** Input element class */
  input?: string;
  /** Button element class */
  button?: string;
}

/**
 * Animation types
 */
export type AnimationType = 'fade' | 'slide' | 'scale' | 'bounce' | 'spin' | 'pulse';
export type AnimationDuration = 'fast' | 'normal' | 'slow';
export type AnimationEasing = 'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out';

/**
 * Progress component props
 */
export interface ProgressProps extends BaseComponentProps {
  /** Progress value (0-100) */
  value?: number;
  /** Maximum value */
  max?: number;
  /** Indeterminate state for loading */
  indeterminate?: boolean;
  /** Progress variant */
  variant?: 'default' | 'success' | 'warning' | 'error';
  /** Progress type */
  type?: 'linear' | 'circular';
  /** Show percentage label */
  showLabel?: boolean;
  /** Custom label text */
  label?: string;
  /** Animation duration for transitions */
  animationDuration?: number;
}

/**
 * Tab item interface
 */
export interface TabItem {
  /** Unique identifier for the tab */
  id: string;
  /** Tab label */
  label: string;
  /** Tab content */
  content?: string;
  /** Icon for the tab */
  icon?: any;
  /** Disabled state */
  disabled?: boolean;
  /** Closable tab */
  closable?: boolean;
  /** Badge content */
  badge?: string | number;
  /** Tab template ref */
  template?: any;
}

/**
 * Tabs component props
 */
export interface TabsProps extends BaseComponentProps {
  /** Array of tab items */
  tabs?: TabItem[];
  /** Currently active tab ID */
  activeTab?: string;
  /** Tab orientation */
  orientation?: 'horizontal' | 'vertical';
  /** Tab variant style */
  variant?: 'default' | 'pills' | 'underline';
  /** Tab size */
  size?: 'sm' | 'md' | 'lg';
  /** Allow closing tabs */
  closable?: boolean;
  /** Enable keyboard loop navigation */
  loop?: boolean;
}

/**
 * Accordion item interface
 */
export interface AccordionItem {
  /** Unique identifier for the accordion item */
  id: string;
  /** Accordion header title */
  title: string;
  /** Accordion content */
  content?: string;
  /** Icon for the accordion header */
  icon?: any;
  /** Disabled state */
  disabled?: boolean;
  /** Header template ref */
  headerTemplate?: any;
  /** Content template ref */
  contentTemplate?: any;
  /** Initial expanded state */
  expanded?: boolean;
}

/**
 * Accordion component props
 */
export interface AccordionProps extends BaseComponentProps {
  /** Array of accordion items */
  items?: AccordionItem[];
  /** Accordion variant style */
  variant?: 'default' | 'ghost' | 'separated';
  /** Accordion size */
  size?: 'sm' | 'md' | 'lg';
  /** Allow multiple items to be expanded */
  multiple?: boolean;
  /** Allow collapsing all items */
  collapsible?: boolean;
}

/**
 * Dropdown menu item interface
 */
export interface DropdownMenuItem {
  /** Unique identifier */
  id: string;
  /** Item label */
  label: string;
  /** Item value */
  value?: any;
  /** Icon for the item */
  icon?: any;
  /** Disabled state */
  disabled?: boolean;
  /** Item type */
  type?: 'item' | 'separator' | 'label' | 'checkbox' | 'radio' | 'destructive';
  /** Checked state for checkbox/radio items */
  checked?: boolean;
  /** Keyboard shortcut */
  shortcut?: string;
  /** Submenu items */
  submenu?: DropdownMenuItem[];
  /** Custom template */
  template?: any;
  /** Click handler */
  action?: () => void;
}

/**
 * Dropdown menu component props
 */
export interface DropdownMenuProps extends BaseComponentProps {
  /** Array of menu items */
  items?: DropdownMenuItem[];
  /** Dropdown placement */
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end';
  /** Dropdown size */
  size?: 'sm' | 'md' | 'lg';
  /** Close dropdown on item select */
  closeOnSelect?: boolean;
}

/**
 * Breadcrumb item interface
 */
export interface BreadcrumbItem {
  /** Unique identifier */
  id: string;
  /** Breadcrumb label */
  label: string;
  /** URL or route */
  href?: string;
  /** Icon for the breadcrumb */
  icon?: any;
  /** Disabled state */
  disabled?: boolean;
  /** Is current page */
  current?: boolean;
  /** Custom template */
  template?: any;
  /** Click handler */
  onClick?: () => void;
}

/**
 * Breadcrumb component props
 */
export interface BreadcrumbProps extends BaseComponentProps {
  /** Array of breadcrumb items */
  items?: BreadcrumbItem[];
  /** Breadcrumb variant style */
  variant?: 'default' | 'ghost';
  /** Breadcrumb size */
  size?: 'sm' | 'md' | 'lg';
  /** Custom separator icon */
  separator?: any;
  /** Maximum number of items to show */
  maxItems?: number;
  /** Show ellipsis for overflow */
  showEllipsis?: boolean;
  /** Show dropdown for ellipsis */
  ellipsisDropdown?: boolean;
}

/**
 * Responsive breakpoint types
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
