interface Props {
  id: string;
  label: string;
  description: string;
  svgRaw: string;
  isActive: boolean;
  isVisible: boolean;
  delayMs?: number;
  onToggle: (id: string) => void;
  className?: string;
  align?: "left" | "right" | "center";
}

export const FeatureIcon = ({
  id,
  label,
  description,
  svgRaw,
  isActive,
  isVisible,
  delayMs = 0,
  onToggle,
  className = "",
  align = "center",
}: Props) => {
  const alignClass =
    align === "left"
      ? "items-start text-left"
      : align === "right"
        ? "items-end text-right"
        : "items-center text-center";

  return (
    <div
      className={`flex flex-col ${alignClass} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "scale(1)" : "scale(0.85)",
        transition: `opacity 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delayMs}ms, transform 500ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delayMs}ms`,
      }}
    >
      <button
        type="button"
        onClick={() => onToggle(id)}
        aria-pressed={isActive}
        aria-label={label}
        className={`flex items-center justify-center transition-opacity duration-300 cursor-pointer ${
          isActive
            ? "text-[#C8956C] opacity-100"
            : "text-[#141414] opacity-70 hover:opacity-100"
        }`}
      >
        <span
          className="block w-10 h-10 lg:w-12 lg:h-12 [&>svg]:w-full [&>svg]:h-full [&>svg]:fill-current"
          style={{ color: "currentColor" }}
          dangerouslySetInnerHTML={{ __html: svgRaw }}
        />
      </button>
      <p className="mt-3 font-display text-[11px] uppercase tracking-[0.1em] text-[#141414] max-w-[160px] leading-tight">
        {label}
      </p>
      <div
        className="grid transition-[grid-template-rows,opacity] duration-400 ease-out"
        style={{
          gridTemplateRows: isActive ? "1fr" : "0fr",
          opacity: isActive ? 1 : 0,
        }}
      >
        <div className="overflow-hidden">
          <p className="mt-3 font-body text-[13px] font-light leading-[1.55] text-[#141414]/75 max-w-[220px]">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};
