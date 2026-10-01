export default function SectionHeading({
  eyebrow,
  title,
  lead,
  id,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  id: string;
}) {
  return (
    <div className="max-w-[46rem]">
      <p className="text-sm font-medium tracking-wide text-accent">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-display text-3xl leading-tight font-semibold text-balance md:text-4xl">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lg leading-relaxed text-ink-2">{lead}</p>}
    </div>
  );
}
