import { useEffect, useRef, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import Slider from "../components/ui/Slider.tsx";
import { useId } from "../sdk/useId.ts";
import SliderJSInfinite from "../islands/SliderJSInfinite.tsx";
import Icon from "../components/ui/Icon.tsx";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface Carousel {
  text: string;
}

export interface Props {
  /** @format html */
  text?: string;
  /** @format html */
  singleText?: string;
  placeholder?: string;
  number: string;
  defaultMessage?: string;
  buttonText: string;
  buttonImage?: string;
  secondButtonText?: string;
  secondButtonImage?: string;
  backgroundImage?: ImageWidget;
  backgroundColor?: string;
  carousel?: Carousel[];
  id?: string;
  popupIframeUrl: string;
  popupBackgroundColor: ImageWidget;
  popupImageSrc: ImageWidget;
}

const HerowithButton = ({
  placeholder,
  buttonText,
  secondButtonText,
  text,
  singleText,
  carousel,
  backgroundImage,
  buttonImage,
  secondButtonImage,
  number,
  defaultMessage,
  backgroundColor,
  id: sectionId,
  popupIframeUrl,
  popupBackgroundColor,
  popupImageSrc,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const isMobile = useSignal(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

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

  useEffect(() => {
    if (isPopupOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isPopupOpen]);

  const handleButtonClick = (messageText: string) => {
    const inputValue = inputRef.current?.value || "";
    const whatsText = `${defaultMessage || ""}${inputValue}`;
    const payload = {
      number,
      message: whatsText,
      buttonClicked: messageText,
    };

    console.log("Dados enviados:", JSON.stringify(payload));

    globalThis.open(`https://wa.me/${number}?text=${whatsText}`, "_blank");
  };

  const handlePopupButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

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
            class="w-full text-center text-[#0D1717] break-words text-[50px] sm:text-[60px] leading-[40px] sm:leading-[60px] font-[500] mt-[-90px] font-albert sans"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}

        {singleText && (
          <div
            class="w-full text-center text-gray-700 mt-[-10px] text-[18px] md:text-[28px] sm:text-[25px] font-[500] font-albertsans"
            dangerouslySetInnerHTML={{ __html: singleText }}
          />
        )}

        <div class="flex justify-center items-center space-x-4">
          <button
            onClick={() => handleButtonClick(buttonText)}
            class="relative text-purple-600 bg-white border border-purple-400 rounded-full shadow-xl flex justify-center items-center text-lg md:text-xl font-inter px-6 md:px-8 py-3 md:py-4 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 z-10"
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

          <button
            onClick={handlePopupButtonClick}
            class="relative text-white bg-[#B845F2] border border-[#DA8FFF] rounded-full shadow-xl flex justify-center items-center text-lg md:text-xl font-inter px-6 md:px-8 py-3 md:py-4 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DA8FFF] focus:ring-offset-2 z-10"
            aria-label={secondButtonText}
          >
            {secondButtonImage && (
              <img
                src={secondButtonImage}
                alt="Icon"
                class="mr-2 h-6 w-6 md:h-8 md:w-8 z-10"
                loading="lazy"
              />
            )}
            <span class="flex items-center z-10 text-current">{secondButtonText}</span>
          </button>
        </div>

        {carousel && <HeroCarousel carousel={carousel} id={id} />}
      </div>

      {isPopupOpen && (
        <div class="fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-80">
          <div class="rounded-lg shadow-lg relative flex justify-center items-center w-full max-w-2xl h-[100vh] p-2 md:p-6">
            {/* O iframe é apenas movido para o centro da tela ao abrir o pop-up */}
            <iframe
              class="airtable-embed"
              src={popupIframeUrl}
              frameBorder="0"
              width="80%"
              height="90%"
              style={{
                background: "transparent",
                border: "1px solid #9900E5",
              }}
            ></iframe>
            {/* Botão de Fechar */}
            <button
              class="absolute top-4 right-4 text-purple-600 hover:text-purple-800 focus:outline-none text-3xl md:text-4xl p-3 md:p-4"
              onClick={handleClosePopup}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Iframe escondido para pré-carregamento, absolutamente posicionado fora da viewport */}
      <iframe
        style={{ position: "absolute", top: "-9999px", left: "-9999px" }}
        src={popupIframeUrl}
        onLoad={() => console.log("Iframe pré-carregado")}
      />
    </div>
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
              height={15}
              width={15}
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

export default HerowithButton;
