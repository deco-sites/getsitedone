import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../../components/ui/Icon.tsx";
import Slider from "../../components/ui/Slider.tsx";
import { useId } from "../../sdk/useId.ts";
import SliderJS from "../../islands/SliderJS.tsx";
import { AppContext } from "../../apps/site.ts";

/** @titleBy name */
export interface Developer {
  image: ImageWidget;
  name: string;
  headline: string;
  level: number;
}

/** @titleBy title */
export interface Bounty {
  image: ImageWidget;
  title: string;
  headline: string;
  rating: number;
  description: string;
  developer: Developer;
}

export interface Props {
  title: string;
  bounties: Bounty[];
  id?: string;
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, isDesktop: ctx.device === "desktop" };
};

export const Sizes = ({ rating }: { rating: number }) => {
  const stars = new Array(5).fill("star");
  return (
    <div class="flex gap-[6px]">
      {stars.map((_, i) => (
        <Icon
          id="Star"
          class={`${i <= rating - 1 ? "text-[#9900E5]" : "text-[#ebc4ff]"}`}
          width={22}
          height={21}
        />
      ))}
    </div>
  );
};

export const Dots = (
  { bounties, isDesktop }: { bounties: Props["bounties"]; isDesktop: boolean },
) => {
  if (!isDesktop) {
    return (
      <div class="flex gap-2 justify-center">
        {bounties.map(({ developer }, index) => (
          <Slider.Dot
            index={index}
            class="border-2 border-[#c879f0] disabled:border-[#9900E5] lg:hidden rounded-full"
          >
            <Image
              src={developer.image}
              alt={developer.name}
              width={61}
              height={61}
            />
          </Slider.Dot>
        ))}
      </div>
    );
  }
  return (
    <div class="flex flex-col justify-between gap-2 max-w-[330px] max-lg:hidden">
      {bounties.map(({ developer }, index) => (
        <Slider.Dot
          index={index}
          class="flex gap-4 p-4 disabled:bg-[#FAFAFA] rounded-2xl w-full"
        >
          <Image
            src={developer.image}
            alt={developer.name}
            width={61}
            height={61}
          />
          <div class="flex flex-col items-start">
            <p class="font-semibold text-black">{developer.name}</p>
            <p class="font-medium text-[#616B6B]">{developer.headline}</p>
          </div>
          <div class="bg-gradient-to-r from-[#c879f0] to-[#9900E5] px-2 w-[70px] h-7 rounded-sm">
            <p class="text-white font-bold">{`Level ${developer.level}`}</p>
          </div>
        </Slider.Dot>
      ))}
    </div>
  );
};

const Carousel = ({ bounties }: { bounties: Props["bounties"] }) => {
  return (
    <Slider class="carousel flex gap-6 h-full">
      {bounties.map((
        { image, title, headline, rating, description },
        index,
      ) => (
        <Slider.Item class="carousel-item" index={index}>
          <div class="flex flex-col gap-6 border border-[#EFF0F0] bg-[#FAFAFA] w-[90vw] max-w-[692px] rounded-[32px] p-4">
            <div class="flex justify-start p-6 gap-6">
              <Image
                class="w-[56px] h-[56px]"
                src={image}
                alt={title}
                width={56}
                height={56}
              />
              <div class="flex flex-col gap-2">
                <p class="font-semibold text-xl text-[#0D1717]">{title}</p>
                <p class="text-lg text-[#0D1717] font-normal">{headline}</p>
                <Sizes rating={rating} />
                <p>{description}</p>
              </div>
            </div>
          </div>
        </Slider.Item>
      ))}
    </Slider>
  );
};

const Arrows = () => {
  return (
    <div class="absolute flex gap-2 bottom-6 right-6">
      <Slider.PrevButton class="flex items-center justify-center rounded-full w-10 h-10 border border-black bg-white">
        <Icon class="text-[#292929]" id="ChevronLeft" width={24} height={25} />
      </Slider.PrevButton>
      <Slider.NextButton class="flex items-center justify-center rounded-full w-10 h-10 border border-black bg-white">
        <Icon id="ChevronRight" width={24} height={25} />
      </Slider.NextButton>
    </div>
  );
};

function Bounties({ bounties, isDesktop, title, id: sectionId }: ReturnType<typeof loader>) {
  const id = useId();
  return (
    <div class="container flex flex-col gap-20 py-16" id={sectionId}>
      <p class="text-center font-bold text-[48px]">{title}</p>
      <div class="flex max-lg:flex-col gap-10 m-auto lg:w-fit w-full" id={id}>
        {isDesktop && <Dots bounties={bounties} isDesktop={isDesktop} />}
        <div class="max-w-[692px] w-full overflow-hidden relative">
          <Carousel bounties={bounties} />
          <Arrows />
        </div>
        {!isDesktop && <Dots bounties={bounties} isDesktop={isDesktop} />}
        <SliderJS rootId={id} gap={0} />
      </div>
    </div>
  );
}

export default Bounties;
