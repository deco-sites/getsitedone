import { useRef } from "preact/hooks";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import SliderJSInfinite from "../../islands/SliderJSInfinite.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

/** @titleBy text */
export interface Carousel {
  text: string;
}

export interface Props {
  /** @format html */
  text?: string;
  placeholder?: string;
  /** @description Put your whatsapp's number */
  number: string;

  /** @description Use this to put a default message. Ex: "defaultMessage: (I'm the user message)" */
  defaultMessage?: string;

  buttonText: string;

  backgroundImage?: ImageWidget;
  /**
   * @format color-input
   */
  backgroundColor?: string;
  singleText?: string;
  carousel?: Carousel[];
  id?: string;
}

const HeroForm = ({
  placeholder,
  buttonText,
  number,
  defaultMessage,
  inputRef,
}: {
  placeholder?: string;
  buttonText: string;
  number: string;
  defaultMessage?: string;
  inputRef: any;
}) => (
  <form
    onSubmit={(event) => {
      event.preventDefault();
      const inputValue = inputRef.current?.value;
      const whatsText = defaultMessage
        ? `${defaultMessage}${inputValue}`
        : inputValue;
      globalThis.open(
        `https://wa.me/${number}?text=${whatsText}`,
        "_blank",
      );
    }}
    class="w-full max-w-lg flex items-center relative mt-4"
  >
    <div class="flex w-full border rounded-full overflow-hidden shadow-lg relative" style={{ border: "2px solid #DA8FFF", padding: "2px", boxShadow: "0 0 8px #DA8FFF" }}>
      <input
        ref={inputRef}
        class="flex-grow h-14 px-4 pl-10 pr-32 text-base md:text-lg focus:outline-none"
        type="text"
        placeholder={placeholder}
        style={{ border: "none", paddingRight: "120px",paddingLeft: "30px" }}
      />
      <button 
  class="absolute right-0 h-12 text-white px-8 transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-700 hover:shadow-lg hover:shadow-purple-500/50"
  style={{ backgroundColor: "#b442ed", borderRadius: "50px", fontSize: "16px", margin: "4px" }}
>
  {buttonText}
</button>

    </div>
  </form>
);

const HeroCarousel = ({ carousel, id }: { carousel?: Carousel[]; id: string }) => (
  <div class="w-full relative mt-6 flex justify-center" id={id}>
    <div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
    <div class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    <Slider class="carousel carousel-start flex items-center gap-2 md:gap-4 px-4 md:px-0">
      {carousel?.map(({ text }, index) => (
        <Slider.Item class="carousel-item" index={index}>
          <div class="flex items-center gap-2 p-4 bg-white rounded-md w-full">
            <Icon
              class="flex-shrink-0 text-[#b442ed]"
              id="circleCheck"
              height={20}
              width={20}
            />
            <p class="whitespace-nowrap text-sm md:text-lg text-gray-800 w-full text-center">{text}</p>
          </div>
        </Slider.Item>
      ))}
    </Slider>
    <SliderJSInfinite rootId={id} interval={2 * 1e3} isPerItem={true} />
  </div>
);

function Hero({
  placeholder,
  buttonText,
  text,
  carousel,
  backgroundImage,
  number,
  defaultMessage,
  backgroundColor,
  singleText,
  id: sectionId,
}: Props) {
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  return (
    <div class="w-full" style={{ backgroundColor }} id={sectionId}>
      <div class="container flex flex-col justify-center items-center py-8 md:py-16 gap-6 md:gap-10 w-full md:w-11/12 lg:w-8/12 relative">
        {text && (
          <div
            class="w-full px-4 md:px-0 text-sm md:text-base lg:text-xl leading-tight md:leading-normal text-center"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
        <HeroForm
          placeholder={placeholder}
          buttonText={buttonText}
          number={number}
          defaultMessage={defaultMessage}
          inputRef={input}
        />
        {singleText && (
          <p class="text-center text-[#616b6b] font-regular px-4 md:px-0 text-sm md:text-base mt-4">
            {singleText}
          </p>
        )}
        {carousel && <HeroCarousel carousel={carousel} id={id} />}
        {backgroundImage && (
          <Image
            class="absolute -z-10 w-full h-full object-cover opacity-80"
            src={backgroundImage}
            width={970}
            height={451.44}
          />
        )}
      </div>
    </div>
  );
}

export default Hero;
