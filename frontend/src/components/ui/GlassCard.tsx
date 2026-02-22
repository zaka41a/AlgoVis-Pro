import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className = "" }: GlassCardProps) {
  return <article className={`glass-panel rounded-2xl p-6 ${className}`.trim()}>{children}</article>;
}
