import { cva, type VariantProps } from '../../../utils/cn';

/**
 * Avatar variants configuration
 * Following shadcn/ui pattern with Angular integration
 * Using proper CSS custom properties that map to TailwindCSS 4 theme
 */
export const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden rounded-full",
  {
    variants: {
      size: {
        sm: "h-8 w-8",
        default: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
);

export type AvatarVariant = VariantProps<typeof avatarVariants>;