import { ReactNode } from "react";

interface MediaGridProps {
  children: ReactNode;
  title?: string;
}

export default function MediaGrid({ children, title }: MediaGridProps) {
  return (
    <section className="mb-8">
      {title && (
        <h2 className="text-2xl font-bold mb-6 border-l-4 border-red-500 pl-3 text-slate-100">
          {title}
        </h2>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {children}
      </div>
    </section>
  );
}
