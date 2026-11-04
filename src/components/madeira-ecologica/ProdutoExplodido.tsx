import { CAIXA, CAMADAS } from "@/assets/madeira-ecologica/camadas";

interface Props {
  className?: string;
}

/**
 * A peça de madeira ecológica se desmontando, composta no navegador.
 *
 * Antes isto era um GIF de 3,35 MB com 68 quadros de 800x800, baixado inteiro
 * e decodificado quadro a quadro com o gifuct — 166 MB de pixels, ~105 MB
 * depois de deduplicar os quadros repetidos. Agora são 8 PNGs do mesmo render,
 * 274 KB em WebP, e quem compõe é o CSS. A trajetória passou a ser nossa:
 * dá para mudar o afastamento, a ordem e a curva sem reexportar nada.
 *
 * UMA VARIÁVEL SÓ
 *
 * Toda a animação pendura em `--p` (0 montado, 1 separado), escrita no palco
 * pelo pai. Cada camada tem um `transform` FIXO que lê essa variável, então o
 * laço de rolagem escreve UM valor por quadro, não oito transforms — e quem
 * interpola é o compositor, fora da thread principal.
 *
 * Isso só fecha porque o deslocamento vem em porcentagem do PRÓPRIO tamanho
 * da camada (ver scripts/produto-camadas.mjs): porcentagem em `translate()` é
 * relativa à caixa do elemento, e como a largura de cada camada é uma fração
 * fixa do container, o afastamento escala junto com a peça sem uma linha de
 * JavaScript. Em px isso precisaria de ResizeObserver e de reescrever tudo a
 * cada redimensionamento.
 *
 * A peça nasce MONTADA e legível, sem esperar download nenhum para ter forma —
 * o GIF e o vídeo começavam num quadro vazio.
 */
export function ProdutoExplodido({ className }: Props) {
  return (
    <div
      className={className}
      style={{ position: "relative", aspectRatio: `${CAIXA.largura} / ${CAIXA.altura}` }}
    >
      {CAMADAS.map((camada) => (
        <img
          key={camada.nome}
          src={camada.url}
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            left: `${camada.esquerda}%`,
            top: `${camada.topo}%`,
            width: `${camada.largura}%`,
            transform: `translate(calc(var(--p, 0) * ${camada.dx}%), calc(var(--p, 0) * ${camada.dy}%))`,
            // A película só existe para o olho quando as camadas se separam:
            // montada ela não acrescenta nada além de um brilho lavado sobre a
            // madeira, e separada é a única forma de mostrar que ela está lá.
            ...(camada.filme ? { opacity: `calc(var(--p, 0) * 0.55)` } : null),
          }}
        />
      ))}
    </div>
  );
}
