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

    backgroundImage: ImageWidget;
    carousel: Carousel[];
}

function Hero({ placeholder, buttonText, text, carousel, backgroundImage, number, defaultMessage }: Props) {
    const input = useRef<HTMLInputElement>(null)
    const id = useId()
    return (
        <div class="container flex flex-col justify-center items-center py-24 gap-10 w-11/12 relative">
            {text && <div dangerouslySetInnerHTML={{ __html: text }} />}
            <form onSubmit={(event) => {
                event.preventDefault()
                const whatsText = defaultMessage ? `${defaultMessage}${input.current?.value}` : input.current?.value
                globalThis.open(`https://wa.me/${number}?text=${whatsText}`, '_blank')
            }} class="max-w-[540px] w-full h-14 relative">
                <input ref={input} class="w-full h-full rounded-full input border border-[#DA8FFF] shadow-[5px_5px_16px_0px] shadow-[#420AE040]/25 focus:outline-none focus:border-[#DA8FFF] focus:shadow-[5px_5px_16px_0px] focus:shadow-[#420AE040]/25" type="text" placeholder={placeholder} />
                <button class="bg-[#9900E5] rounded-full h-10 text-white px-4 py-2 absolute right-2 top-2 bottom-2">{buttonText}</button>
            </form>

            <div class="max-w-[1088px] w-full relative" id={id}>
                <Slider class="carousel carousel-start flex items-center gap-6">
                    {carousel.map(({ text }, index) => <Slider.Item class="carousel-item" index={index}>
                        <div class="flex items-center gap-2 w-[326px] h-5">
                            <Icon class="flex-shrink-0" id="circleCheck" height={17} width={17} />
                            <p class="whitespace-nowrap ">{text}</p>
                        </div>
                    </Slider.Item>)}
                </Slider>
                {/* overflow */}
                <div class="absolute inset-y-0 left-0 w-12 md:w-48 lg:w-96 bg-gradient-to-l from-transparent to-white"></div>
                <div class="absolute inset-y-0 right-0 w-12 md:w-48 lg:w-96 bg-gradient-to-r from-transparent to-white"></div>
                <SliderJSInfinite rootId={id} interval={1 * 1e3} isPerItem={true} />
            </div>
            <Image class="absolute -z-10" src={backgroundImage} width={970} height={451.44} />
        </div>
    );
}

export default Hero;