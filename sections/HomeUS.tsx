import Drawer from "../components/ui/Drawer.tsx";

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
  currentPath: string; // Adicione esta prop para passar a rota atual
}

function Header({ title, navItens, currentPath }: Props) {
  const isEnglish = currentPath === '/';
  const toggleLanguageUrl = isEnglish ? '/pt' : '/';

  return (
    <header class="container h-[85px] py-6 flex justify-between items-center">
      <p class={`text-[25px] text-[#9900E5] font-bold ${title.position === 'center' ? 'text-center' : title.position === 'left' ? 'text-left' : 'text-right'}`}>
        {title.text}
      </p>
      {/** DESKTOP */}
      {navItens && (
        <div class="flex justify-start gap-6 h-5 items-center max-lg:hidden">
          {navItens.map(({ label, url }) => (
            <a class="text-sm font-medium text-[#616B6B]" href={url} key={url}>{label}</a>
          ))}
          <a
            class="bg-transparent hover:bg-[#9900E5] text-[#9900E5] font-semibold hover:text-white py-2 px-4 border border-[#9900E5] hover:border-transparent rounded-full"
            href="/join"
          >
            Sign Up for Makers
          </a>
          <a
            href={toggleLanguageUrl}
            class="relative inline-flex items-center h-8 w-20 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none bg-[#9900E4]"
          >
            <span
              class={`absolute w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isEnglish ? 'translate-x-12' : 'translate-x-0'}`}
            />
            <span class="absolute left-2 text-sm text-black">EN</span>
            <span class="absolute right-2 text-sm text-white">PT</span>
          </a>
        </div>
      )}
      {/** MOBILE */}
      {navItens && (
        <Drawer>
          <ul class="flex flex-col text-[#9900E5] bg-white gap-4 h-full px-4 py-4 w-xl">
            {navItens.map(({ label, url }) => (
              <li key={url}><a href={url}>{label}</a></li>
            ))}
            <li>
              <a
                class="bg-transparent hover:bg-[#9900E5] text-[#9900E5] font-semibold hover:text-white py-2 px-4 border border-[#9900E5] hover:border-transparent rounded-full"
                href="/join"
              >
                Sign Up for Makers
              </a>
            </li>
            <li>
              <a
                href={toggleLanguageUrl}
                class="relative inline-flex items-center h-8 w-20 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none bg-[#9900E4]"
              >
                <span
                  class={`absolute w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${isEnglish ? 'translate-x-12' : 'translate-x-0'}`}
                />
                <span class="absolute left-2 text-sm text-black">EN</span>
                <span class="absolute right-2 text-sm text-white">PT</span>
              </a>
            </li>
          </ul>
        </Drawer>
      )}
    </header>
  );
}

export default Header;
