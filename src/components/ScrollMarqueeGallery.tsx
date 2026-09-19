import { useEffect, useRef } from "react";
import { assinarScroll } from "@/lib/scroll-suave";

import img01 from "@/assets/gallery/img-01.webp";
import img02 from "@/assets/gallery/img-02.webp";
import img03 from "@/assets/gallery/img-03.webp";
import img04 from "@/assets/gallery/img-04.webp";
import img05 from "@/assets/gallery/img-05.webp";
import img06 from "@/assets/gallery/img-06.webp";
import img07 from "@/assets/gallery/img-07.webp";
import img08 from "@/assets/gallery/img-08.webp";
import img09 from "@/assets/gallery/img-09.webp";

const allImages = [img01, img02, img03, img04, img05, img06, img07, img08, img09];

// Repeat enough to guarantee no gaps on ultra-wide screens
const row1Base = [...allImages, ...allImages, ...allImages];
const row2Base = [...allImages.slice().reverse(), ...allImages.slice().reverse(), ...allImages.slice().reverse()];

const SPEED = 1.5;
const IMG_W = 340; // approx width per image+gap at desktop
const GAP = 10;

export const ScrollMarqueeGallery = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const offset1 = useRef(0);
  const offset2 = useRef(0);
  const lastScroll = useRef(0);
  const setWidth = useRef(0);

  useEffect(() => {
    lastScroll.current = window.scrollY;
    // Calculate one "set" width (allImages.length items)
    setWidth.current = allImages.length * (IMG_W + GAP);

    const handleScroll = () => {
      const delta = window.scrollY - lastScroll.current;
      lastScroll.current = window.scrollY;

      offset1.current -= delta * SPEED;
      offset2.current += delta * SPEED;

      // Wrap around seamlessly using modulo of one set width
      const sw = setWidth.current;
      if (sw > 0) {
        offset1.current = ((offset1.current % sw) + sw) % sw - sw;
        offset2.current = ((offset2.current % sw) + sw) % sw - sw;
      }

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset1.current}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${offset2.current}px)`;
      }
    };

    return assinarScroll(handleScroll);
  }, []);

  const renderRow = (
    images: string[],
    ref: React.RefObject<HTMLDivElement>
  ) => (
    <div className="overflow-hidden">
      <div ref={ref} className="flex will-change-transform" style={{ gap: `${GAP}px` }}>
        {images.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-[140px] sm:h-[180px] lg:h-[220px] aspect-[16/10] object-cover rounded-[10px] shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
          />
        ))}
      </div>
    </div>
  );

  return (
    <section className="w-full overflow-hidden py-8 flex flex-col gap-[10px]">
      {renderRow(row1Base, row1Ref)}
      {renderRow(row2Base, row2Ref)}
    </section>
  );
};
