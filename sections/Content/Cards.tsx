import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";

/** @titleBy title */
export interface Card {
  icon: ImageWidget;
  image?: ImageWidget;
  imageAlt?: string;
  alt: string;
  title: string;
  
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
    <div
      className={`w-full py-20 ${
        backgroundColor ? `bg-[${backgroundColor}]` : "bg-[#fafafa]"
      }`}
      id={id}
    >
      <div className="container mx-auto flex flex-col gap-8 py-12">
        {title && (
          <h2
            className="text-5xl font-extrabold mb-16 text-center text-gray-800"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {cards.map((
            { alt, description, icon, image, imageAlt, title },
          ) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 border-4  rounded-3xl bg-white p-6 text-black shadow-lg"
              style={{ width: "100%", minHeight: "300px" }} // Ajustar altura mínima dos cards
            >
              <Image src={icon} alt={alt} width={40} height={40} />
              {image && (
                <Image src={image} alt={imageAlt} width={266} height={200} />
              )}
              <h3 className="text-2xl font-bold">{title}</h3>
              <div dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Cards;
