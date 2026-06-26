"use client";

import clsx from "clsx";

export default function SectionCard({
  className,
  children,
}: {
  className?: string
  title: string;
  children: React.ReactNode;
}) {

  return (
    <div className={clsx("border-t border-gray-200 mt-6 pt-6 dark:border-slate-800", className,)}>
      {children}
    </div>
  );
}