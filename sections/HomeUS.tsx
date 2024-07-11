import clx from "../sdk/clx.ts";
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
  const toggleLanguageUrl = isEnglish ? '/' : '/';

  return (
    <header class="container h-[85px] py-6 flex justify-between items-center">
      <p
        class="text-[25px] text-[#9900E5] font-bold"
        style={clx(title.position)}
      >
        {title.text}
      </p>
      {/** DESKTOP */}
      {navItens && (
        <div class="flex justify-start gap-6 h-5 items-center max-lg:hidden">
          {navItens?.map(({ label, url }) => (
            <a class="text-sm font-medium text-[#616B6B]" href={url} key={url}>{label}</a>
          ))}
          <a
            class="bg-transparent hover:bg-[#9900E5] text-[#9900E5] font-semibold hover:text-white py-2 px-4 border border-[#9900E5] hover:border-transparent rounded-full"
            href="/joinen"
            style={{ padding: '10px 20px', borderRadius: '25px' }}
          >
            Sign Up for Makers
          </a>
          <a
            href={toggleLanguageUrl}
            class="relative inline-flex items-center h-8 w-20 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none"
            style={{ backgroundColor: '#9900E4' }}
          >
            <span
              class="absolute w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300"
              style={{ left: isEnglish ? '10px' : '0px' }}
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
              <a href={url} key={url}>
                <li>{label}</li>
              </a>
            ))}
            <a
              class="bg-transparent hover:bg-[#9900E5] text-[#9900E5] font-semibold hover:text-white py-2 px-4 border border-[#9900E5] hover:border-transparent rounded-full"
              href="/join"
              style={{ padding: '10px 20px', borderRadius: '25px' }}
            >
              Sign Up for Makers
            </a>
            <a
              href={toggleLanguageUrl}
              class="relative inline-flex items-center h-8 w-20 rounded-full cursor-pointer transition-colors duration-300 focus:outline-none"
              style={{ backgroundColor: '#9900E4' }}
            >
              <span
                class="absolute w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300"
                style={{ left: isEnglish ? '10px' : '0px' }}
              />
              <span class="absolute left-2 text-sm text-black">EN</span>
              <span class="absolute right-2 text-sm text-white">PT</span>
            </a>
          </ul>
        </Drawer>
      )}
    </header>
  );
}

export default Header;