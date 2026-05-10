import type { LucideProps } from "lucide-react";

export interface StatItem {
  label: string;
  count: number | string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
}
