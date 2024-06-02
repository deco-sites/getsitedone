import { useId } from "../../sdk/useId.ts";
import { ComponentChildren } from "preact";
import Icon from "../ui/Icon.tsx";

export interface Props {
  title: string;
  backgroundColor?: string;
  children: ComponentChildren;
}

export function Collapse(
  { title, children, backgroundColor = "white" }: Props,
) {
  const id = useId();
  return (
    <div
      class="collapse px-6 py-5 border border-[#C9CFCF] group/collapse max-w-[768px]"
      style={{ backgroundColor }}
    >
      <input class="hidden" type="checkbox" id={id} />
      <label htmlFor={id}>
        <div class="collapse-title min-h-0 p-0 max-sm:text-lg font-semibold text-2xl text-[#0D1717] max-sm:h-16 h-9">
          <div class="flex items-center justify-between h-full">
            <p>{title}</p>
            <label class="swap group-has-[input:checked]/collapse:swap-active swap-rotate ml-auto pointer-events-none">
              <Icon
                id="Plus"
                width={24}
                height={24}
                class="swap-off text-[#0D1717]"
              />
              <Icon
                id="Close"
                width={22}
                height={22}
                class="swap-on text-[#0D1717]"
              />
            </label>
          </div>
        </div>
      </label>
      <div class="collapse-content !p-0 font-normal text-base text-[#616B6B]">
        {children}
      </div>
    </div>
  );
}
