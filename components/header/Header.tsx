import clx from "../../sdk/clx.ts";
import Drawer from "site/components/ui/Drawer.tsx";

/** @titleBy label */
export interface NavItem {
  url: string;
  label: string;
}

export interface Props {
  title: {
    text: string;
    position: "center" | "left" | "right";
  };

  navItens?: NavItem[];
}

function Header({ title, navItens }: Props) {
  return (
    <header class="container h-[85px] py-6 flex justify-between items-center">
      <p
        class="text-[25px] text-[#9900E5  ] font-bold"
        style={clx(title.position)}
      >
        {title.text}
      </p>
      {/** DESKTOP */}
      {navItens && (
        <div class="flex justify-start gap-6 h-5 items-center max-lg:hidden">
          {navItens?.map(({ label, url }) => (
            <a class="text-sm font-medium text-[#616B6B]" href={url}>{label}</a>
          ))}
        </div>
      )}
      {/** MOBILE */}
      {navItens && <Drawer>
        <ul class="flex flex-col text-[#9900E5] bg-white gap-4 h-full px-4 py-4 w-xl">{navItens.map(({ label, url }) =>
          <a href={url}>
            <li>{label}</li>
          </a>)}
        </ul>
      </Drawer>}
    </header>
  );
}

export default Header;
