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
    class="w-full max-w-lg flex flex-col md:flex-row items-center gap-4 relative mt-4"
  >
    <input
      ref={inputRef}
      class="w-full h-14 rounded-full border border-[#DA8FFF] shadow-lg px-4 focus:outline-none focus:border-[#DA8FFF] mb-2 md:mb-0 text-base md:text-lg transition-transform duration-300"
      type="text"
      placeholder={placeholder}
    />
    <button class="bg-[#b442ed] rounded-full h-14 text-white px-8 py-2 mt-2 md:mt-0 hover:shadow-lg hover:scale-105 transition-transform duration-300 text-base md:text-lg">
      {buttonText}
    </button>
  </form>
);

const HeroCarousel = ({ carousel, id }: { carousel?: Carousel[]; id: string }) => (
  <div class="w-full relative mt-6" id={id}>
    <div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
    <div class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>
    <Slider class="carousel carousel-start flex items-center gap-2 md:gap-4 px-4 md:px-0">
      {carousel?.map(({ text }, index) => (
        <Slider.Item class="carousel-item" index={index}>
          <div class="flex items-center gap-2 p-4 bg-white rounded-md transition-transform duration-300 transform hover:scale-105 w-full">
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
            class="w-full px-4 md:px-0 text-base md:text-xl leading-tight md:leading-normal text-center"
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
