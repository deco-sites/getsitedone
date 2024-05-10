import clx from "../../sdk/clx.ts";

/** @titleBy label */
export interface NavItem {
    url: string;
    label: string;
}

export interface Props {
    title: {
        text: string;
        position: "center" | "left" | "right"
    }

    navItens?: NavItem[]
}

function Header({ title, navItens }: Props) {
    return (
        <header class="container h-[85px] py-6 px-16 flex justify-between items-center">
            <p class="text-[25px] text-[#0D1717] font-bold" style={clx(title.position)}>{title.text}</p>
            {navItens && <div class="flex justify-start gap-6 h-5 items-center">
                {navItens?.map(({ label, url }) => <a class="text-sm font-medium text-[#616B6B]" href={url}>{label}</a>)}
            </div>}
        </header>
    );
}

export default Header;