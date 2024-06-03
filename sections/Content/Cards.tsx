import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy title */
export interface Card {
  icon: ImageWidget;
  image?: ImageWidget;
  imageAlt?: string;
  alt: string;
  title: string;
  /** @format html */
  description: string;
  width: number;
  height: number;
}

export interface Props {
  /** @format color-input */
  backgroundColor?: string;
  /** @format html */
  title?: string;
  cards: Card[];
}

function Cards({ cards, title, backgroundColor }: Props) {
  return (
    <div style={{ backgroundColor }}>
      <div class="container flex flex-col gap-20 py-16">
        {title && <div dangerouslySetInnerHTML={{ __html: title }} />}
        <div class="flex justify-between gap-8 items-center flex-wrap max-xl:justify-center">
          {cards.map((
            { alt, description, icon, image, imageAlt, title, width, height },
          ) => (
            <div
              class="flex flex-col gap-6 border-2 border-[#C9CFCF] rounded-[40px] bg-white p-12 text-black"
              style={{ width, minHeight: height }}
            >
              <Image src={icon} alt={alt} width={40} height={40} />
              {image && (
                <Image src={image} alt={imageAlt} width={266} height={200} />
              )}
              <p class="text-3xl font-bold">{title}</p>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
