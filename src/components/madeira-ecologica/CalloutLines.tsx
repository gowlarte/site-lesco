interface Props {
  show: boolean;
}

/**
 * Linhas SVG conectando os ícones laterais ao centro do produto.
 * Coordenadas em viewBox 1000x600 para escalar com o stage.
 * Cada path é desenhado via stroke-dashoffset animado.
 */
export const CalloutLines = ({ show }: Props) => {
  // Centro do produto aproximado: (500, 300)
  // Pontos de chegada distribuídos ao redor do produto.
  const lines = [
    { d: "M 200 160 L 420 270", delay: 600 },   // top-left
    { d: "M 200 460 L 420 340", delay: 750 },   // bottom-left
    { d: "M 500 520 L 500 380", delay: 900 },   // bottom-center
    { d: "M 800 160 L 580 270", delay: 1050 },  // top-right
    { d: "M 800 460 L 580 340", delay: 1200 },  // bottom-right
  ];

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none"
      viewBox="0 0 1000 600"
      preserveAspectRatio="none"
      aria-hidden
    >
      {lines.map((line, i) => (
        <path
          key={i}
          d={line.d}
          stroke="#141414"
          strokeOpacity="0.3"
          strokeWidth="1"
          fill="none"
          strokeDasharray="400"
          strokeDashoffset={show ? 0 : 400}
          style={{
            transition: `stroke-dashoffset 700ms cubic-bezier(0.25, 0.46, 0.45, 0.94) ${line.delay}ms`,
          }}
        />
      ))}
    </svg>
  );
};
