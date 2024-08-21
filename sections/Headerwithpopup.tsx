import { useEffect, useRef, useState } from "preact/hooks";
import { useSignal } from "@preact/signals";
import { useId } from "../sdk/useId.ts";
import { ImageWidget } from "apps/admin/widgets.ts";

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
  buttonImage?: ImageWidget;
  secondButtonText?: string;
  secondButtonImage?: ImageWidget;
  backgroundImage?: ImageWidget;
  backgroundColor?: string;
  carousel?: Carousel[];
  id?: string;
  popupBackgroundImage?: ImageWidget;
  popupImage?: ImageWidget;
  popupTitle?: string;
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
  popupBackgroundImage,
  popupImage,
  popupTitle,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const isMobile = useSignal(false);
  const isDesktop = useSignal(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isFormComplete, setIsFormComplete] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Whatsapp: "",
    Ocupacao: "",
    ConhecerMais: "não",  // Valor padrão como "não"
  });

  const AIRTABLE_API_KEY = "patP6hRQTYDdRkHay.eafbc06c91eb1f0622bf025af73574027ffcd3e41e7409bc593f415b952c001f";
  const AIRTABLE_BASE_ID = "appMr1aubhSLavVGL";
  const AIRTABLE_TABLE_NAME = "teste";

  useEffect(() => {
    const handleResize = () => {
      const width = globalThis.innerWidth;
      isMobile.value = width <= 768;
      isDesktop.value = width > 1024;
    };

    handleResize();
    globalThis.addEventListener("resize", handleResize);

    return () => globalThis.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const { Name, Email, Whatsapp, Ocupacao } = formData;
    setIsFormComplete(!!Name && !!Email && !!Whatsapp && !!Ocupacao);
  }, [formData]);

  const handleInputChange = (e: Event) => {
    const { name, value } = e.target as HTMLInputElement;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: Event) => {
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({ ...prev, ConhecerMais: checked ? "sim" : "não" }));
  };

  const handleButtonClick = (messageText: string) => {
    const inputValue = inputRef.current?.value || "";
    const whatsText = `${defaultMessage || ""}${inputValue}`;
    globalThis.open(`https://wa.me/${number}?text=${whatsText}`, "_blank");
  };

  const handlePopupButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSubmit = async (e: Event) => {
    e.preventDefault();
    if (isFormComplete && !isSubmitting) {
      setIsSubmitting(true);
      try {
        // Garantir que o valor seja "não" se o checkbox não estiver marcado
        const finalFormData = {
          ...formData,
          ConhecerMais: formData.ConhecerMais || "não",
        };

        const response = await fetch(
          `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${AIRTABLE_API_KEY}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              fields: {
                Name: finalFormData.Name,
                Email: finalFormData.Email,
                Whatsapp: finalFormData.Whatsapp,
                Ocupacao: finalFormData.Ocupacao,
                ConhecerMais: finalFormData.ConhecerMais,
              },
            }),
          }
        );

        if (response.ok) {
          console.log("Dados enviados com sucesso para o Airtable!");
          setShowThankYou(true);
          setTimeout(() => {
            setIsPopupOpen(false);
            setShowThankYou(false);
          }, 3000);
        } else {
          console.error("Erro ao enviar os dados para o Airtable:", response.statusText);
        }
      } catch (error) {
        console.error("Erro ao conectar-se com o Airtable:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div
      class={`w-full min-h-screen flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-8 lg:px-12 relative ${
        backgroundColor ? `bg-[${backgroundColor}]` : ""
      }`}
      id={sectionId}
    >
      {backgroundImage && (
        <img
          class="absolute -z-10 w-full h-full object-cover opacity-120"
          src={backgroundImage}
          alt="Background"
        />
      )}
      <div class="container flex flex-col justify-center items-center py-8 gap-6 md:gap-8 lg:gap-10 w-full md:w-11/12 lg:w-8/12 relative">
        {text && (
          <div
            class="w-full text-center text-[#0D1717] break-words text-[40px] sm:text-[60px] leading-[40px] sm:leading-[60px] font-[500] mt-[-90px] font-albert sans"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        )}

        {singleText && (
          <div
            class="w-full text-center text-gray-700 mt-[-10px] text-[18px] md:text-[28px] sm:text-[25px] font-[500] font-albertsans"
            dangerouslySetInnerHTML={{ __html: singleText }}
          />
        )}

        <div class="flex justify-center items-center space-x-2 md:space-x-4">
          <button
            onClick={() => handleButtonClick(buttonText)}
            class="relative text-purple-600 bg-white border border-purple-400 rounded-full shadow-xl flex justify-center items-center text-sm sm:text-lg md:text-xl font-inter px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 z-10"
            aria-label={buttonText}
          >
            {buttonImage && (
              <img
                src={buttonImage}
                alt="Icon"
                class="mr-1 sm:mr-2 h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 z-10"
                loading="lazy"
              />
            )}
            <span class="flex items-center z-10 text-current">{buttonText}</span>
          </button>

          <button
            onClick={handlePopupButtonClick}
            class="relative text-white bg-[#B845F2] border border-[#DA8FFF] rounded-full shadow-xl flex justify-center items-center text-sm sm:text-lg md:text-xl font-inter px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#DA8FFF] focus:ring-offset-2 z-10"
            aria-label={secondButtonText}
          >
            {secondButtonImage && (
              <img
                src={secondButtonImage}
                alt="Icon"
                class="mr-1 sm:mr-2 h-4 w-4 sm:h-6 sm:w-6 md:h-8 md:w-8 z-10"
                loading="lazy"
              />
            )}
            <span class="flex items-center z-10 text-current">{secondButtonText}</span>
          </button>
        </div>

        {carousel && (
          <div class="w-full relative mt-[-20px] flex justify-center" id={id}>
            <div class="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div class="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
            <div class="carousel carousel-start flex items-center gap-2 md:gap-4 px-4 md:px-0">
              {carousel.map(({ text }, index) => (
                <div key={index} class="carousel-item">
                  <div class="flex items-center gap-2 p-4 bg-transparent rounded-md w-full">
                    <span class="flex-shrink-0 text-[#b442ed]">&#10003;</span>
                    <p class="whitespace-nowrap text-base md:text-lg text-gray-900 w-full text-center">
                      {text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {isPopupOpen && (
        <div
          class={`fixed inset-0 flex items-center justify-center z-30 bg-black bg-opacity-80 p-4 sm:p-6`}
        >
          <div
            class={`bg-white rounded-lg shadow-lg relative w-full max-w-2xl p-6 ${
              isMobile.value ? "grid gap-4" : "grid grid-cols-3 gap-6"
            }`}
            style={{
              backgroundImage: `url(${popupBackgroundImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div class={isDesktop.value ? "col-span-2" : "col-span-full"}>
              {!showThankYou ? (
                <>
                  <h2 class="text-2xl font-bold text-gray-900 mb-6">
                    {popupTitle || "Ganhe 25% OFF para implementar seu projeto com o GetSiteDone"}
                  </h2>
                  <form class="space-y-4" onSubmit={handleSubmit}>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Nome"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      onInput={handleInputChange}
                      value={formData.Name}
                    />
                    <div class={`${isMobile.value ? "grid grid-cols-1 gap-4" : "flex space-x-4"}`}>
                      <input
                        type="email"
                        name="Email"
                        placeholder="E-mail"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        onInput={handleInputChange}
                        value={formData.Email}
                      />
                      <input
                        type="tel"
                        name="Whatsapp"
                        placeholder="WhatsApp"
                        class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                        onInput={handleInputChange}
                        value={formData.Whatsapp}
                      />
                    </div>
                    <input
                      type="text"
                      name="Ocupacao"
                      placeholder="Ocupação"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                      onInput={handleInputChange}
                      value={formData.Ocupacao}
                    />
                    <div class="flex items-center">
                      <input
                        type="checkbox"
                        id="moreInfo"
                        class="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        onChange={handleCheckboxChange}
                        checked={formData.ConhecerMais === "sim"}
                      />
                      <label htmlFor="moreInfo" class="ml-2 block text-sm text-gray-900">
                        Quero conhecer mais sobre o serviço
                      </label>
                    </div>
                    <button
                      type="submit"
                      disabled={!isFormComplete || isSubmitting}
                      class={`w-full py-2 px-4 ${
                        isFormComplete && !isSubmitting
                          ? "bg-purple-600 hover:bg-purple-700"
                          : "bg-gray-400 cursor-not-allowed"
                      } text-white font-bold rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2`}
                    >
                      {isSubmitting ? "Enviando..." : "Enviar"}
                    </button>
                  </form>
                </>
              ) : (
                <div class="flex flex-col items-center justify-center h-full text-center transition-opacity duration-500">
                  <h2 class="text-2xl font-bold text-gray-900 mb-4">Obrigado por preencher!</h2>
                  <p class="text-lg text-gray-600">Entraremos em contato em breve.</p>
                </div>
              )}
            </div>
            {!isMobile.value && popupImage && (
              <div class="flex justify-center items-center">
                <img
                  src={popupImage}
                  alt="GetSiteDone"
                  class="max-w-full"
                />
              </div>
            )}
            <button
              class="absolute top-2 right-2 text-purple-600 hover:text-purple-800 focus:outline-none text-2xl p-2"
              onClick={handleClosePopup}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HerowithButton;
