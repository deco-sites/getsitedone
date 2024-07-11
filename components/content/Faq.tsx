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
  titlePosition: "aside" | "column";
  accordions: Accordion[];
  section?: Section;
  id?: string;
}

function Faq({ accordions, title, titlePosition, section, id }: Props) {
  return (
    <div id={id || "faq"} class="container mx-auto px-8 flex flex-col items-center gap-16 py-16">
      {title && (
        <h1 class="text-6xl font-extrabold text-center text-gray-900 mb-15">
          {title}
        </h1>
      )}
      <div class={`flex ${titlePosition === "aside"
        ? "flex-row justify-between items-start max-lg:flex-wrap"
        : "flex-col items-center justify-center"
        } w-full max-w-3xl`}>
        <div class="flex flex-col w-full gap-3">
          {accordions.map(({ title, description }, index) => (
            <div 
              key={index} 
              class="border-2 border-transparent transition-all duration-300">
              <Collapse title={title}>
                <div
                  class="mt-2 text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </Collapse>
            </div>
          ))}
        </div>
      </div>
      {section && <section.Component {...section.props} />}
    </div>
  );
}

export default Faq;
