import { cva, type VariantProps } from '../../../utils/cn';

/**
 * Accordion variants configuration
 * Following shadcn/ui pattern with Angular integration
 * Using proper CSS custom properties that map to TailwindCSS 4 theme
 */
export const accordionVariants = cva(
  "w-full",
  {
    variants: {
      variant: {
        default: "border border-border rounded-md",
        ghost: "",
        separated: "space-y-2",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Accordion item variant configuration
 */
export const accordionItemVariants = cva(
  "border-b border-border last:border-b-0",
  {
    variants: {
      variant: {
        default: "",
        ghost: "border-b border-border",
        separated: "border border-border rounded-md bg-card",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

/**
 * Accordion trigger variant configuration
 */
export const accordionTriggerVariants = cva(
  "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180",
  {
    variants: {
      variant: {
        default: "px-4",
        ghost: "px-0",
        separated: "px-4",
      },
      size: {
        sm: "py-3 text-sm",
        md: "py-4 text-base",
        lg: "py-5 text-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

/**
 * Accordion content variant configuration
 */
export const accordionContentVariants = cva(
  "overflow-hidden text-sm transition-all",
  {
    variants: {
      variant: {
        default: "px-4",
        ghost: "px-0",
        separated: "px-4",
      },
      state: {
        open: "animate-accordion-down",
        closed: "animate-accordion-up",
      },
    },
    defaultVariants: {
      variant: "default",
      state: "closed",
    },
  }
);

export type AccordionVariant = VariantProps<typeof accordionVariants>;
export type AccordionItemVariant = VariantProps<typeof accordionItemVariants>;
export type AccordionTriggerVariant = VariantProps<typeof accordionTriggerVariants>;
export type AccordionContentVariant = VariantProps<typeof accordionContentVariants>;