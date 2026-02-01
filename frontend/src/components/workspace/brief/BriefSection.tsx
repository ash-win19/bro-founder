import { ReactNode } from "react";

interface BriefSectionProps {
  title: string;
  children: ReactNode;
}

const BriefSection = ({ title, children }: BriefSectionProps) => {
  return (
    <section className="mb-10">
      <h2 className="text-lg font-medium text-foreground mb-4">
        {title}
      </h2>
      {children}
    </section>
  );
};

export default BriefSection;
