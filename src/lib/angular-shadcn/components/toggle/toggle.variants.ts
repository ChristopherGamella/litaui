import { cva, type VariantProps } from '../../../utils/cn';

/**
 * Toggle variants configuration
 * Following shadcn/ui pattern with Angular integration
 * Using proper CSS custom properties that map to TailwindCSS 4 theme
 */
export const toggleVariants = cva(
  // Base styles adapted from shadcn/ui Toggle with pressed (on) state moved here
  "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-muted hover:text-muted-foreground data-[state=on]:bg-accent data-[state=on]:text-accent-foreground data-[state=on]:shadow-sm",
  {
    variants: {
      variant: {
        // Default keeps transparent background when off but we give it a subtle border
        // so it isn't visually lost (especially on white surfaces)
        default: "border border-transparent",
        outline: "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-2.5",
        md: "h-9 px-3",
        lg: "h-10 px-4",
        // Icon-only square size, mirrors button icon sizing conventions
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

export type ToggleVariant = VariantProps<typeof toggleVariants>;