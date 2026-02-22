import { ReactNode } from "react";
import { spacing } from "../../design/tokens";

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  return <div className={`mx-auto max-w-7xl pb-16 pt-8 ${spacing.pageX}`}>{children}</div>;
}
