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
    return <div class="flex flex-col p-6 gap-4 border border-[#EFF0F0] bg-[#FAFAFA] w-[800px] h-[540px] rounded-[32px]">
        <div class="flex justify-start items-center gap-6">
            <Image src={user.avatar} alt={user.alt} width={80} height={80} />
            <div class="flex flex-col gap-2">
                <p class="font-semibold text-xl text-[#0D1717]">{user.name}</p>
                <p class="text-lg text-[#0D1717] font-normal">{user.headline}</p>
            </div>
        </div>
        <p class="flex items-center border border-[#C9CFCF] input py-4 px-2 rounded-full font-medium w-full">{project.title}</p>
        <Image class="border border-[#C9CFCF] rounded-[30px] w-full" src={project.image} alt={project.title} width={752} height={289} />
        <div class="flex justify-start items-center gap-2 text-[#616B6B]">
            <Icon id="Outside" width={15} height={15} />
            <p class="text-lg text-[#0D1717] font-normal">{project.link}</p>
        </div>
    </div>
}

function Testimonials({ testimonials }: Props) {
    const id = useId()
    return (
        <div class="container pb-28 pt-6">
            <div class="relative ml-[256px]" id={id}>
                <Slider class="carousel carousel-start flex gap-28">
                    {testimonials.map(({ user, project }, index) => <Slider.Item
                        index={index}>

                        <Testimonial user={user} project={project} />
                    </Slider.Item>
                    )}
                </Slider>
                <Slider.NextButton class="absolute top-1/2 transform -translate-y-1/2 left-[824px] rounded-full border border-black p-4">
                    <Icon id="Next" width={16} height={16} />
                </Slider.NextButton>
                <div class="absolute inset-y-0 right-0 w-12 md:w-48 lg:w-96 bg-[#fdfdfd]/40 pointer-events-none" />
                <SliderJS rootId={id} isPerItem gap={112} />
            </div>
        </div>
    );
}

export default Testimonials;