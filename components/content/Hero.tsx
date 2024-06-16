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

function Hero(
  {
    placeholder,
    buttonText,
    text,
    carousel,
    backgroundImage,
    number,
    defaultMessage,
    backgroundColor,
    singleText,
    id: sectionId
  }: Props,
) {
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  return (
    <div class="w-full" style={{ backgroundColor }} id={sectionId}>
      <div class="container flex flex-col justify-center items-center py-8 md:py-24 gap-6 md:gap-10 w-full md:w-11/12 relative">
        {text && <div class="w-full px-4 md:px-0 text-xs md:text-base" dangerouslySetInnerHTML={{ __html: text }} />}
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const whatsText = defaultMessage
              ? `${defaultMessage}${input.current?.value}`
              : input.current?.value;
            globalThis.open(
              `https://wa.me/${number}?text=${whatsText}`,
              "_blank",
            );
          }}
          class="w-full max-w-md flex flex-col md:flex-row items-center gap-4 relative mt-4"
        >
          <input
            ref={input}
            class="w-full h-14 rounded-full border border-[#DA8FFF] shadow-lg px-4 focus:outline-none focus:border-[#DA8FFF] mb-2 md:mb-0"
            type="text"
            placeholder={placeholder}
          />
          <button class="bg-[#9900E5] rounded-full h-12 text-white px-6 py-2 mt-2 md:mt-0">
            {buttonText}
          </button>
        </form>

        {singleText && <p class="text-center text-[#616b6b] font-regular px-4 md:px-0 text-sm md:text-base mt-4">
          {singleText}
        </p>}
        {carousel && <div class="w-full max-w-xl relative mt-6" id={id}>
          <Slider class="carousel carousel-start flex items-center gap-4 md:gap-6">
            {carousel.map(({ text }, index) => (
              <Slider.Item class="carousel-item" index={index}>
                <div class="flex items-center gap-2 h-5">
                  <Icon
                    class="flex-shrink-0"
                    id="circleCheck"
                    height={17}
                    width={17}
                  />
                  <p class="whitespace-nowrap text-sm md:text-base">{text}</p>
                </div>
              </Slider.Item>
            ))}
          </Slider>
          <div class="absolute inset-y-0 left-0 w-12 bg-gradient-to-l from-transparent to-transparent"></div>
          <div class="absolute inset-y-0 right-0 w-12 bg-gradient-to-r from-transparent to-white"></div>
          <SliderJSInfinite rootId={id} interval={2 * 1e3} isPerItem={true} />
        </div>}
        {backgroundImage && <Image
          class="absolute -z-10"
          src={backgroundImage}
          width={970}
          height={451.44}
        />}
      </div>
    </div>
  );
}

export default Hero;
