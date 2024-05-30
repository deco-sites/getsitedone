import { ImageWidget } from "apps/admin/widgets.ts";
import Image from "apps/website/components/Image.tsx";
import Icon from "../ui/Icon.tsx";
import Slider from "../ui/Slider.tsx"
import { useId } from "../../sdk/useId.ts";
import SliderJS from "../../islands/SliderJS.tsx";

export interface Project {
    title: string;
    image: ImageWidget;
    link: string;
}

export interface User {
    avatar: ImageWidget;
    alt: string;
    name: string;
    headline: string;
}

/** @title {{{project.title}}} */
export interface Testimonial {
    user: User
    project: Project;
}

export interface Props {
    testimonials: Testimonial[];
}

const Testimonial = ({ user, project }: Testimonial) => {
    return <a href={project.link} target="_blank">
        <div class="flex flex-col p-6 gap-4 border border-[#EFF0F0] bg-[#FAFAFA] w-[800px] h-[540px] rounded-[32px] max-lg:w-full max-md:justify-center">
            <div class="flex justify-start items-center gap-6">
                <Image src={user.avatar} alt={user.alt} width={80} height={80} />
                <div class="flex flex-col gap-2">
                    <p class="font-semibold text-xl text-[#0D1717]">{user.name}</p>
                    <p class="text-lg text-[#0D1717] font-normal">{user.headline}</p>
                </div>
            </div>
            <p class="flex items-center border border-[#C9CFCF] input py-4 px-2 rounded-full font-medium w-full max-md:rounded-lg max-md:h-auto">{project.title}</p>
            <Image class="border border-[#C9CFCF] rounded-[30px] object-cover w-full h-[289px] max-md:object-contain max-md:h-fit max-md:rounded-xl" src={project.image} alt={project.title} width={752} height={289} />
            <div class="flex justify-start items-center gap-2 text-[#616B6B]">
                <Icon id="Outside" width={15} height={15} />
                <p class="text-lg text-[#0D1717] font-normal">{project.link.replace(/^https?:\/\//, '')}</p>
            </div>
        </div>
    </a>
}

function Testimonials({ testimonials }: Props) {
    const id = useId()
    return (
        <div class="container pb-28 pt-6">
            <div class="flex flex-col gap-8 relative lg:ml-[256px]" id={id}>
                <Slider class="carousel carousel-start flex gap-28">
                    {testimonials.map(({ user, project }, index) => <Slider.Item class="carousel-item max-lg:w-full"
                        index={index}>

                        <Testimonial user={user} project={project} />
                    </Slider.Item>
                    )}
                </Slider>
                <div class="flex items-center gap-2 mx-auto lg:hidden w-fit">
                    {testimonials.map((_, index) => (
                        <Slider.Dot index={index} class="focus:outline-none w-2 h-2 disabled:w-4  disabled:bg-[#9900E5]  bg-[#E0E0E0] rounded-full" />
                    ))}
                </div>
                <Slider.NextButton class="absolute top-1/2 transform -translate-y-1/2 left-[824px] rounded-full border border-black p-4 max-lg:hidden">
                    <Icon id="Next" width={16} height={16} />
                </Slider.NextButton>
                <div class="absolute inset-y-0 right-0 w-12 max-xl:hidden xl:w-48 bg-[#fdfdfd]/40 pointer-events-none" />
                <SliderJS rootId={id} isPerItem gap={112} />
            </div>
        </div>
    );
}

export default Testimonials;