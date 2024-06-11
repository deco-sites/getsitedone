import { ComponentChildren } from "preact";
import Icon from "./Icon.tsx"

export interface Props {
    children: ComponentChildren;
}

function Aside(
    { title, drawer, children }: {
        title: string;
        drawer: string;
        children: ComponentChildren;
    },
) {
    return (
        <div
            data-aside
            class="bg-base-100 grid grid-rows-[auto_1fr] h-full divide-y w-full md:!max-w-[400px]"
            style={{ maxWidth: "90vw" }}
        >
            <div class="flex justify-between items-center">
                <h1 class="px-4 py-3">
                    <span class="font-medium text-2xl">{title}</span>
                </h1>
                <label for={drawer} aria-label="X" class="btn btn-ghost">
                    <Icon id="Close" size={24} strokeWidth={2} />
                </label>
            </div>
            {children}
        </div>
    );
}

function Drawer({ children }: Props) {
    return (
        <div className="drawer drawer-end w-fit lg:hidden">
            <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer-4" className="drawer-button btn btn-circle btn-sm btn-ghost bg-black text-secondary hover:text-black">
                    <Icon id="Bars3" width={20} height={20} strokeWidth={0.01} />
                </label>
            </div>
            <div className="drawer-side z-50">
                <label htmlFor="my-drawer-4" aria-label="close sidebar" className="drawer-overlay"></label>
                <Aside title="Menu" drawer="my-drawer-4">{children}</Aside>
            </div>
        </div>
    );
}

export default Drawer;