import Drawer from "site/components/ui/Drawer.tsx";
import Image from "apps/website/components/Image.tsx";
import { ImageWidget } from "apps/admin/widgets.ts";

export interface NavItem {
  url: string;
  label: string;
}

export interface ActionButton {
  label: string;
  url: string;
  style: string; // Can be used for additional styles or classes
  isLanguageToggle?: boolean; // To identify the language toggle button
}

export interface Props {
  title: {
    image: ImageWidget;
    position: "center" | "left" | "right";
  };

  navItens?: NavItem[];
  actionButtons?: ActionButton[];
  currentPath: string;
}

function Header({ title, navItens, actionButtons, currentPath }: Props) {
  const isEnglish = currentPath === '/';
  const toggleLanguageUrl = isEnglish ? '/' : '/';

  return (
    <header class="container h-[85px] py-6 flex justify-between items-center">
      <Image
        src={title.image}
        alt="Title Image"
        class={`h-10 ${title.position === 'center' ? 'mx-auto' : title.position === 'left' ? 'ml-0' : 'mr-0'}`}
      />
      {/** DESKTOP */}
      {navItens && (
        <div class="flex justify-start gap-6 h-5 items-center max-lg:hidden">
          {navItens.map(({ label, url }) => (
            <a class="text-sm font-medium text-[#616B6B]" href={url} key={url}>{label}</a>
          ))}
          {actionButtons?.map(({ label, url, style, isLanguageToggle }) => (
            !isLanguageToggle ? (
              <a
                class={`bg-transparent hover:bg-[#9900E5] text-[#9900E5] font-semibold hover:text-white py-2 px-4 border border-[#9900E5] hover:border-transparent rounded-full px-5 py-2.5 ${style}`}
                href={url}
                key={url}
              >
                {label}
              </a>
            ) : (
              <a
                href={toggleLanguageUrl}
                class="relative inline-flex items-center h-8 w-20 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none bg-[#9900E4]"
                key={url}
              >
                <span
                  class={`absolute w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isEnglish ? 'left-2' : 'left-0'}`}
                />
                <span class="absolute left-2 text-sm text-black">EN</span>
                <span class="absolute right-2 text-sm text-white">PT</span>
              </a>
            )
          ))}
        </div>
      )}
      {/** MOBILE */}
      {navItens && (
        <Drawer>
          <ul class="flex flex-col text-[#9900E5] bg-white gap-4 h-full px-4 py-4 w-xl">
            {navItens.map(({ label, url }) => (
              <li key={url}><a href={url}>{label}</a></li>
            ))}
            {actionButtons?.map(({ label, url, style, isLanguageToggle }) => (
              !isLanguageToggle ? (
                <li key={url}>
                  <a
                    class={`bg-transparent hover:bg-[#9900E5] text-[#9900E5] font-semibold hover:text-white py-2 px-4 border border-[#9900E5] hover:border-transparent rounded-full px-5 py-2.5 ${style}`}
                    href={url}
                  >
                    {label}
                  </a>
                </li>
              ) : (
                <li key={url}>
                  <a
                    href={toggleLanguageUrl}
                    class="relative inline-flex items-center h-8 w-20 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none bg-[#9900E4]"
                  >
                    <span
                      class={`absolute w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isEnglish ? 'left-2' : 'left-0'}`}
                    />
                    <span class="absolute left-2 text-sm text-black">EN</span>
                    <span class="absolute right-2 text-sm text-white">PT</span>
                  </a>
                </li>
              )
            ))}
          </ul>
        </Drawer>
      )}
    </header>
  );
}

export default Header;
