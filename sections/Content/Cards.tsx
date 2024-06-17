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
  id?: string;
}

function Cards({ cards, title, backgroundColor, id }: Props) {
  return (
    <div style={{ backgroundColor }} id={id} className="p-4">
      <div className="container mx-auto flex flex-col gap-20 py-16">
        {title && <div dangerouslySetInnerHTML={{ __html: title }} />}
        <div className="flex flex-wrap gap-8 justify-center">
          {cards.map(({ alt, description, icon, image, imageAlt, title, width, height }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-6 border-2 border-gray-300 rounded-2xl bg-white p-8 text-black transition-transform duration-300 ease-in-out transform hover:scale-105 hover:border-[#9900e5]"
              style={{ width, minHeight: height }}
            >
              <Image src={icon} alt={alt} width={40} height={40} />
              {image && (
                <Image src={image} alt={imageAlt} width={266} height={200} />
              )}
              <p className="text-3xl font-bold">{title}</p>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
