import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Map to img.src */
  src?: string;
  /** Map to img.alt */
  alt?: string;
  /** Explicit fallback text if image fails to load. Otherwise derives from name prop. */
  fallback?: string;
  /** Size configurations */
  size?: AvatarSize;
  /** Optional name to render beside the avatar */
  name?: string;
  /** Optional description below the name */
  description?: string;
}

const sizes: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-[12px]",
  md: "h-10 w-10 text-sm",
  lg: "h-12 w-12 text-base",
  xl: "h-14 w-14 text-lg",
  "2xl": "h-16 w-16 text-xl",
};

export const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
  (
    { src, alt, fallback, size = "md", name, description, className, ...rest },
    ref
  ) => {
    const [imageError, setImageError] = useState(false);

    const getInitials = (str: string) => {
      const parts = str.split(" ").filter(Boolean);
      if (parts.length === 0) return "";
      if (parts.length === 1) return parts[0][0].toUpperCase();
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    };

    const fallbackText = fallback || (name ? getInitials(name) : "?");

    const avatarNode = (
      <div
        className={cn(
          "relative flex shrink-0 overflow-hidden rounded-full bg-slate-100 flex items-center justify-center ring-1 ring-slate-900/5",
          sizes[size],
          !name && className
        )}
        {...(!name ? rest : {})}
      >
        {src && !imageError ? (
          <Image
            src={src}
            alt={alt || name || "Avatar"}
            className="aspect-square h-full w-full object-cover"
            onError={() => setImageError(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center font-medium text-slate-500">
            {fallbackText}
          </span>
        )}
      </div>
    );

    if (!name) {
      return (
        <div ref={ref} className="inline-block">
          {avatarNode}
        </div>
      );
    }

    return (
      <div
        ref={ref}
        className={cn("flex items-center gap-3", className)}
        {...rest}
      >
        {avatarNode}
        <div className="flex flex-col truncate">
          <span className="font-medium text-slate-900 leading-tight truncate">
            {name}
          </span>
          {description && (
            <span className="text-sm text-slate-500 leading-tight truncate mt-0.5">
              {description}
            </span>
          )}
        </div>
      </div>
    );
  }
);

Avatar.displayName = "Avatar";
export default Avatar;
