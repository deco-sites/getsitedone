import {
          ShowcaseEditorTabbed,
          Tab,
        } from "site/islands/decoadstabs.tsx";
        import { ShowcaseEditorAccordion } from "site/islands/decoadsacoordion.tsx";
        import { AppContext } from "site/apps/site.ts";
        
        export interface Props {
          /**
           * @format rich-text
           * @default Click here to tweak this text however you want.
           */
          title?: string;
          /**
           * @format html
           */
          subtitle?: string;
          tabs?: Tab[];
          position?: "left" | "right";
          trackId?: "1" | "2" | "3" | "4" | "5";
        }
        
        export const loader = async (
          props: Props,
          req: Request,
          ctx: AppContext,
        ) => {
          const device = ctx.device;
        
          return {
            ...props,
            isMobile: device,
          };
        };
        
        export default function BuildShowCase({
          title,
          subtitle,
          tabs,
          position,
          trackId,
          isMobile,
        }: Omit<Props, "isMobile"> & {
          title: string;
          subtitle: string;
          tabs: Tab[];
          position: "left" | "right";
          trackId: "1" | "2" | "3" | "4" | "5";
          isMobile: string;
        }) {
          return (
            <div
              id="hero"
              class={`relative py-20 lg:px-[120px] space-y-16 lg:space-y-20 px-6 min-h-[840px]`}
            >
              <div class="bg-black mx-auto max-w-[1228px] rounded-3xl flex flex-col items-center justify-center min-h-[650px] py-10">
                <div class="mx-auto flex flex-col items-center gap-16 lg:gap-20">
                  <div class="flex flex-col items-center gap-4">
                    <div class="flex flex-col items-center gap-6 lg:gap-12 z-10">
                      <h2
                        class="mx-6 lg:mx-0 mb-4 lg:mb-6 inline-block text-[32px] lg:text-[48px] text-center leading-[115%] lg:tracking-[-1.44px] font-medium text-white max-w-lg lg:max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: title ?? "",
                        }}
                      >
                      </h2>
                      {subtitle && (
                        <h3
                          class="mx-11 inline-block lg:text-[26px] text-center leading-[150%] text-gray-400 max-w-lg lg:max-w-none"
                          dangerouslySetInnerHTML={{
                            __html: subtitle,
                          }}
                        >
                        </h3>
                      )}
                    </div>
                  </div>
                </div>
                <div class="mx-auto flex flex-col items-center">
                  {isMobile === "desktop"
                    ? (
                      <ShowcaseEditorTabbed
                        tabs={tabs}
                        position={position}
                        trackId={trackId}
                      />
                    )
                    : <ShowcaseEditorAccordion tabs={tabs} />}
                </div>
              </div>
            </div>
          );
        }
        