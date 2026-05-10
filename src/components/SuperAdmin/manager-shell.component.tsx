import type { ReactNode } from "react";

interface ManagerShellProps {
  title: string;
  subtitle: string;
  addLabel: string;
  addIcon: ReactNode;
  onClickAdd: () => void;
  children: ReactNode;
}

/**
 * Outer page wrapper shared by all three SuperAdmin manager pages.
 * Renders the page chrome (title, subtitle, CTA button) and slots
 * the stats bar, toolbar, table, and pagination in via children.
 */
export function ManagerShell({
  title,
  subtitle,
  addLabel,
  addIcon,
  onClickAdd,
  children,
}: ManagerShellProps) {
  return (
    <div className="page">
      <div className="page-content">
        <div className="d-flex align-items-start justify-content-between mb-4">
          <div>
            <h4 className="mb-1 fw-semibold">{title}</h4>
            <p className="text-secondary small mb-0">{subtitle}</p>
          </div>
          <button
            className="btn btn-sm btn-brand d-flex align-items-center gap-2"
            onClick={onClickAdd}
          >
            {addIcon}
            {addLabel}
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
