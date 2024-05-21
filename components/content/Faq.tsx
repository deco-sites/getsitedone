import { Collapse } from "./Collapse.tsx";
import { Section } from "deco/blocks/section.ts";


/** @titleBy title */
export interface Accordion {
    title: string;
    /** @format html */
    description: string;
}

export interface Props {
    title?: string;
    titlePosition: "aside" | "collum";
    accordions: Accordion[];
    section?: Section;
}

function Faq({ accordions, title, titlePosition, section }: Props) {
    return (
        <div class="container flex flex-col gap-20 py-28">
            <div class={`flex gap-20 max-lg:flex-wrap ${titlePosition === "aside" ? "justify-between" : "flex-col items-center justify-center"}`}>
                {title && <p class="font-bold text-5xl text-black">{title}</p>}
                <div class="flex flex-col justify-start gap-4">
                    {accordions.map(({ title, description }) => (
                        <Collapse title={title}>
                            <div dangerouslySetInnerHTML={{ __html: description }} />
                        </Collapse>
                    ))}
                </div>
            </div>
            {section && <section.Component {...section.props} />}
        </div>
    );
}

export default Faq;