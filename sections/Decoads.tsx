/** @jsx h */

interface Tab {
  title: string;
  image: string;
  description: string;
  icon: string;
  label?: {
    name: string;
    color: string;
  };
}

const tabs: Tab[] = [
  {
    title: "CMS with Visual Editor",
    image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/a7933919-5f38-4055-83fc-830ca29fe3ab",
    description: "Easily edit content using a visual CMS with real-time preview and real-time collaboration.",
    icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/5ccd0a8e-c2b2-4036-885d-e9b12057b0e6"
  },
  {
    title: "Automatic content extraction from TS",
    image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/4716aca7-9cc1-4f76-8099-89082d7a5573",
    description: "\"export interface Props\" becomes an easily editable form to give marketers the freedom to update content.",
    icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/e23d24e0-85ad-43bf-bbc9-8311cafc499e"
  },
  {
    image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/5fcf67e5-475a-4553-a0fb-b9930115fd49",
    title: "In-browser Web IDE",
    description: "Integrated code editor made for React, Tailwind and TypeScript. Directly edit in browser & sync with a Git repository.",
    icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/536946cb-924f-4934-a769-615e589f691f"
  },
  {
    title: "deco.pilot",
    image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/96200ebc-bb33-4f11-9c26-85b68961c743",
    icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/16c84e9d-3cca-4f2a-84d9-ddb230b47c2f",
    description: "AI assistant for code and content generation to help you get site done faster.",
    label: {
      name: "NEW!",
      color: "#02F67C"
    }
  },
  {
    title: "One-click install apps & integrations",
    description: "Leverage a rich library of applications, themes, and templates that connect to any API and third-party data sources.",
    icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/9277ef03-ecda-4257-b500-74427670f991",
    image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/2436533f-d50a-4df8-97c7-cd176dece311"
  },
  {
    title: "Modern Stack",
    description: "Based on an efficient, secure and future-proof stack: Deno, Tailwind, JSX, TypeScript & HTMX.",
    icon: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/32a543e5-ae46-48c8-bcfe-041d86eec2b2",
    image: "https://ozksgdmyrqcxcwhnbepg.supabase.co/storage/v1/object/public/assets/530/c80fd09d-36a2-43f1-b9e2-e575115338cc"
  }
];

export default function BuildShowcase() {
  const [activeTab, setActiveTab] = useState<Tab>(tabs[0]);

  return (
    <div class="max-w-screen-xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl leading-9 font-extrabold text-gray-900">
        Everything You Need to <span class="font-[argent-pixel] text-[#02F67C] font-normal">Build</span>
      </h2>
      <div class="mt-6 flex flex-col md:flex-row">
        <div class="flex-shrink-0">
          <img src={activeTab.image} alt={activeTab.title} class="rounded-lg shadow-lg" />
        </div>
        <div class="mt-6 md:mt-0 md:ml-6">
          <h3 class="text-xl leading-7 font-semibold text-gray-900">{activeTab.title}</h3>
          <p class="mt-2 text-base leading-6 text-gray-500">{activeTab.description}</p>
          {activeTab.label && (
            <span class="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-[#02F67C] text-white">
              {activeTab.label.name}
            </span>
          )}
        </div>
      </div>
      <div class="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            onClick={() => setActiveTab(tab)}
            class={`p-4 rounded-lg shadow-lg focus:outline-none ${activeTab.title === tab.title ? 'bg-gray-100' : 'bg-white'}`}
          >
            <div class="flex items-center">
              <img src={tab.icon} alt={tab.title} class="h-6 w-6" />
              <h4 class="ml-4 text-lg leading-6 font-medium text-gray-900">{tab.title}</h4>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
