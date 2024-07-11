import Icon from "../components/ui/Icon.tsx";

interface Props {
  name?: string;
}

export default function Section({ }: Props) {
  return (
    <div className="flex flex-col items-center py-20 bg-[#fafafa]">
      <h2 className="text-5xl font-extrabold mb-16 text-center text-gray-800">Services</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-7xl px-2">
        {[
          {
            title: "Simple Landing Page",
            price: "U$99",
            features: ["Header", "4 sections", "Footer"]
          },
          {
            title: "Complex Landing Page",
            price: "U$199",
            features: ["Complex landing page", "ou", "3 pages in a single site"]
          },
          {
            title: "Site with Integrations",
            price: "U$499 ",
            features: ["Website with infrastructure (back-end) and database"]
          },
          {
            title: "E-commerce Website",
            price: "U$999",
            features: ["Single product e-commerce with payment system integration"]
          }
        ].map((service, index) => (
          <div
            key={index}
            className="bg-white p-8 lg:p-10 rounded-2xl text-left   shadow-lg w-full lg:max-w-xs"
          >
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
            <p className="text-[#9900e5] text-2xl lg:text-3xl font-extrabold mb-5">{service.price}</p>
            <ul className="space-y-2 text-xs lg:text-sm">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  {feature !== "ou" ? (
                    <>
                      <Icon
                        class="flex-shrink-0 text-[#b442ed] mr-2"
                        id="circleCheck"
                        height={20}
                        width={20}
                      />
                      <span className="font-bold">{feature}</span>
                    </>
                  ) : (
                    <span className="w-full text-center">{feature}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
