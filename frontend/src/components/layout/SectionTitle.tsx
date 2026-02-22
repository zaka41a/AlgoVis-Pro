import { typography } from "../../design/tokens";

interface SectionTitleProps {
  eyebrow: string;
  title: string;
}

export function SectionTitle({ eyebrow, title }: SectionTitleProps) {
  return (
    <div>
      <p className={typography.sectionEyebrow}>{eyebrow}</p>
      <h2 className={typography.sectionTitle}>{title}</h2>
    </div>
  );
}
