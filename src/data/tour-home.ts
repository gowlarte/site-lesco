/**
 * Os ambientes 360 que a home alterna ao lado do manifesto.
 *
 * Escrito à mão, ao contrário de biotique.ts e tours.ts, que são gerados: aqui
 * é CURADORIA. Para tirar, pôr ou reordenar um ambiente, basta mexer em
 * `ESCOLHA` — o resto (panorama, borrão, nome, obra) vem de src/data/tours.ts.
 *
 * A primeira entrada é a capa e precisa continuar sendo o Corredor Hub da
 * Biotique: os pôsteres de POSTER_LARGA/POSTER_ALTA (o que aparece antes do
 * WebGL subir, e o que fica sob Save-Data) foram reprojetados exatamente
 * nesse enquadramento.
 *
 * Os ids de cena se repetem entre obras (toda obra tem um "c1"), então cada
 * ambiente aqui ganha o id `obra/cena`. As portas são reescritas no mesmo
 * formato, e só sobrevivem as que levam a outro ambiente DESTA lista.
 */

import { TOURS, type CenaTour } from "@/data/tours";

/** Obra (slug de src/data/tours.ts) e cena (id dentro dela), na ordem da vez. */
const ESCOLHA: Array<[obra: string, cena: string]> = [
  ["biotique", "c3"], // Corredor Hub — a capa, não mover
  ["lavvi", "c3"],
  ["jha-boutique", "c2"],
  ["biotique", "c14"], // Sala de reunião
  ["alpha-one", "c9"],
  ["lavvi", "c2"],
  ["biotique", "c16"], // Hall de entrada
  ["jha-boutique", "c1"],
];

export interface AmbienteHome extends CenaTour {
  /** Nome da obra, para a legenda sobre o painel. */
  obra: string;
}

const chave = (obra: string, cena: string) => `${obra}/${cena}`;

const escolhidos = new Set(ESCOLHA.map(([obra, cena]) => chave(obra, cena)));

export const AMBIENTES_HOME: AmbienteHome[] = ESCOLHA.flatMap(([slug, id]) => {
  const tour = TOURS.find((t) => t.slug === slug);
  const cena = tour?.cenas.find((c) => c.id === id);
  if (!tour || !cena) {
    // Um ambiente despublicado no Viewer some daqui na próxima importação; a
    // home segue com os outros em vez de quebrar.
    if (import.meta.env.DEV) console.warn(`[tour-home] ${chave(slug, id)} não existe em tours.ts`);
    return [];
  }
  return [
    {
      ...cena,
      id: chave(slug, id),
      obra: tour.obra,
      portas: cena.portas
        .map((p) => ({ ...p, destino: chave(slug, p.destino) }))
        .filter((p) => escolhidos.has(p.destino)),
    },
  ];
});
