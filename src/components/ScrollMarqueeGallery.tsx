import { useEffect, useRef } from "react";

import img01 from "@/assets/gallery/img-01.webp";
import img02 from "@/assets/gallery/img-02.jpg";
import img03 from "@/assets/gallery/img-03.jpg";
import img04 from "@/assets/gallery/img-04.webp";
import img05 from "@/assets/gallery/img-05.jpg";
import img06 from "@/assets/gallery/img-06.jpeg";
import img07 from "@/assets/gallery/img-07.webp";
import img08 from "@/assets/gallery/img-08.jpg";
import img09 from "@/assets/gallery/img-09.jpeg";
import img01b from "@/assets/gallery/img-01.webp";

const row1Images = [img01, img02, img03, img04, img05, img06, img07, img08, img09, img01b];
const row2Images = [img06, img07, img08, img09, img01b, img01, img02, img03, img04, img05];

const SPEED = 1.5;

export const ScrollMarqueeGallery = () => {
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);
  const offset1 = useRef(0);
  const offset2 = useRef(0);
  const lastScroll = useRef(0);

  useEffect(() => {
    lastScroll.current = window.scrollY;

    const handleScroll = () => {
      const delta = window.scrollY - lastScroll.current;
      lastScroll.current = window.scrollY;

      offset1.current -= delta * SPEED;
      offset2.current += delta * SPEED;

      if (row1Ref.current) {
        const half = row1Ref.current.scrollWidth / 2;
        if (Math.abs(offset1.current) >= half) {
          offset1.current = offset1.current % half;
        }
        row1Ref.current.style.transform = `translateX(${offset1.current}px)`;
      }

      if (row2Ref.current) {
        const half = row2Ref.current.scrollWidth / 2;
        if (Math.abs(offset2.current) >= half) {
          offset2.current = offset2.current % half;
        }
        row2Ref.current.style.transform = `translateX(${offset2.current}px)`;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const renderRow = (
    images: string[],
    ref: React.RefObject<HTMLDivElement>
  ) => {
    const doubled = [...images, ...images];
    return (
      <div className="overflow-hidden">
        <div ref={ref} className="flex gap-[10px] will-change-transform">
          {doubled.map((src, i) => (
            <img
              key={i}
              src={src}
              alt=""
              className="h-[140px] sm:h-[180px] lg:h-[220px] w-auto object-cover rounded-[10px] shrink-0 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all duration-500"
              loading="lazy"
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <section className="w-full overflow-hidden py-8 flex flex-col gap-[10px]">
      {renderRow(row1Images, row1Ref)}
      {renderRow(row2Images, row2Ref)}
    </section>
  );
};
