import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to combine and merge Tailwind CSS classes
 * Similar to shadcn/ui's cn() function
 * @param inputs - Class values to combine
 * @returns Merged class string
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Type-safe class name utility for component variants
 * @param base - Base classes
 * @param variants - Variant configuration
 * @param props - Props to apply variants
 * @returns Combined class string
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

/**
 * Variant props type helper
 */
export type VariantProps<T extends (...args: any) => any> = Omit<Parameters<T>[0], 'class'>;

/**
 * Create a variant function for component styling
 * @param config - Variant configuration
 * @returns Variant function
 */
export function cva<T extends Record<string, Record<string, string>>>(
  base: string,
  config: {
    variants: T;
    defaultVariants?: Record<string, string>;
  }
) {
  return (props?: Record<string, string>) => {
    const mergedProps = { ...config.defaultVariants, ...props };
    return variantProps(base, config.variants, mergedProps as any);
  };
}