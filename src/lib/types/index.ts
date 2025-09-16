/**
 * TypeScript interfaces and types for the shadcn-inspired Angular component library
 */

import { ColorScheme, SemanticColor } from '../tokens/colors';
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
export type { ColorScheme, SemanticColor, TypographyScale, FontSize, FontWeight, LetterSpacing, LineHeight, SpacingScale };

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
 * Responsive breakpoint types
 */
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
