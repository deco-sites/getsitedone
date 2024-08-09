import { useEffect, useRef } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Slider from "../components/ui/Slider.tsx";
import { useId } from "../sdk/useId.ts";
import SliderJSInfinite from "../islands/SliderJSInfinite.tsx";
import Icon from "../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";
import { JSX } from "preact";

export interface Carousel {
  text: string;
}

export interface Props {
  text?: string;
  singleText?: string;
  placeholder?: string;
  number: string;
  defaultMessage?: string;
  buttonText: string;
  buttonImage?: string;
  backgroundImage?: ImageWidget;
  backgroundColor?: string;
  carousel?: Carousel[];
  id?: string;
}

const HeroForm = ({
  placeholder,
  buttonText,
  number,
  defaultMessage,
  buttonImage,
  inputRef,
}: {
  placeholder?: string;
  buttonText: string;
  number: string;
  defaultMessage?: string;
  buttonImage?: string;
  inputRef: React.RefObject<HTMLInputElement>;
}) => {
  const handleSubmit = (event: JSX.TargetedEvent<HTMLFormElement, Event>) => {
    event.preventDefault();
    const inputValue = inputRef.current?.value || "";
    const whatsText = `${defaultMessage || ""}${inputValue}`;
    globalThis.open(`https://wa.me/${number}?text=${whatsText}`, "_blank");
  };

  return (
    <form
      onSubmit={handleSubmit}
      class="w-full flex items-center justify-center relative"
    >
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        class="hidden"
        aria-label={placeholder}
      />
      <div class="relative flex justify-center items-center">
        <div class="absolute inset-0 bg-purple-400 rounded-full blur-lg opacity-60 z-0">
        </div>
        <button
          class="relative text-purple-600 bg-white border border-purple-400 rounded-full shadow-xl flex justify-center items-center text-lg md:text-xl font-inter px-6 md:px-8 py-3 md:py-4 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 z-10"
          type="submit"
          aria-label={buttonText}
        >
          {buttonImage && (
            <img
              src={buttonImage}
              alt="Icon"
              class="mr-2 h-6 w-6 md:h-8 md:w-8 z-10"
              loading="lazy"
            />
          )}
          <span class="flex items-center z-10 text-current">{buttonText}</span>
        </button>
      </div>
    </form>
  );
};

const HeroCarousel = ({
  carousel,
  id,
}: {
  carousel?: Carousel[];
  id: string;
}) => (
  <div class="w-full relative mt-[-20px] flex justify-center" id={id}>
    <div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none">
    </div>
    <div class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none">
    </div>
    <Slider class="carousel carousel-start flex items-center gap-2 md:gap-4 px-4 md:px-0">
      {carousel?.map(({ text }, index) => (
        <Slider.Item key={index} class="carousel-item" index={index}>
          <div class="flex items-center gap-2 p-4 bg-transparent rounded-md w-full">
            <Icon
              class="flex-shrink-0 text-[#b442ed]"
              id="circleCheck"
              height={20}
              width={20}
            />
            <p class="whitespace-nowrap text-base md:text-lg text-gray-900 w-full text-center">
              {text}
            </p>
          </div>
        </Slider.Item>
      ))}
    </Slider>

    <SliderJSInfinite rootId={id} interval={2000} isPerItem />
  </div>
);

const HerowithButton = ({
  placeholder,
  buttonText,
  text,
  singleText,
  carousel,
  backgroundImage,
  buttonImage,
  number,
  defaultMessage,
  backgroundColor,
  id: sectionId,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const isMobile = useSignal(false);

  useEffect(() => {
    const handleResize = () => {
      const isCurrentlyMobile = globalThis.innerWidth <= 768;
      if (isCurrentlyMobile !== isMobile.value) {
        isMobile.value = isCurrentlyMobile;
      }
    };

    handleResize(); // Executa na montagem
    globalThis.addEventListener("resize", handleResize);

    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      class={`w-full min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-12 relative ${
        backgroundColor ? `bg-[${backgroundColor}]` : ""
      }`}
      id={sectionId}
    >
      {backgroundImage && (
        <Image
          class="absolute -z-10 w-full h-full object-cover opacity-120"
          src={backgroundImage}
          width={970}
          height={451.44}
          loading="lazy"
        />
      )}
      <div class="container flex flex-col justify-center items-center py-8 gap-6 md:gap-8 lg:gap-10 w-full md:w-11/12 lg:w-8/12 relative">
        {text && (
          <div
            class="w-full text-center text-gray-900 break-words text-5xl md:text-[80px] mt-[-90px] font-[500] leading-[1] font-albertsans"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}
        {singleText && (
          <div
            class="w-full text-center text-gray-700 mt-[-10px] text-[20px] md:text-[28px] font-[500] font-albertsans"
            dangerouslySetInnerHTML={{ __html: singleText }}
          />
        )}

        <HeroForm
          placeholder={placeholder}
          buttonText={buttonText}
          number={number}
          defaultMessage={defaultMessage}
          buttonImage={buttonImage}
          inputRef={inputRef}
        />
        {carousel && <HeroCarousel carousel={carousel} id={id} />}
      </div>
    </div>
  );
};

export default HerowithButton;
