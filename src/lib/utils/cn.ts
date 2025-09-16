import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines and merges Tailwind CSS classes intelligently
 * 
 * This utility function combines multiple class values and resolves conflicts
 * between Tailwind CSS classes. It's the core utility for the shadcn/ui design system.
 * 
 * @param inputs - Class values to combine (strings, conditionals, arrays, objects)
 * @returns Merged class string with conflicts resolved
 * 
 * @example
 * ```typescript
 * // Basic usage
 * cn('px-2 py-1', 'px-3') // Returns: 'py-1 px-3'
 * 
 * // With conditionals
 * cn('base-class', isActive && 'active-class', 'another-class')
 * 
 * // With objects
 * cn('base', { 'conditional': true, 'other': false })
 * 
 * // In components
 * const buttonClass = cn(
 *   'inline-flex items-center justify-center rounded-md',
 *   variant === 'primary' && 'bg-primary text-primary-foreground',
 *   variant === 'secondary' && 'bg-secondary text-secondary-foreground',
 *   size === 'sm' && 'h-9 px-3',
 *   size === 'lg' && 'h-11 px-8',
 *   className
 * );
 * ```
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// Re-export class-variance-authority for convenience
export { cva, type VariantProps } from 'class-variance-authority';

// Re-export clsx and twMerge for advanced usage
export { clsx, type ClassValue } from 'clsx';
export { twMerge } from 'tailwind-merge';

/**
 * @deprecated Use cva from class-variance-authority instead
 * This is kept for backward compatibility
 */
export function variantProps<T extends Record<string, any>>(
  base: string,
  variants: T,
  props: Partial<Record<keyof T, any>>
): string {
  const classes = [base];

  for (const [key, value] of Object.entries(props)) {
    if (variants[key] && variants[key][value]) {
      classes.push(variants[key][value]);
    }
  }

  return cn(...classes);
}