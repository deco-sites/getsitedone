import Icon from "../components/ui/Icon.tsx";

interface Props {
  name?: string;
}

export default function Section({ }: Props) {
  return (
    <div className="flex flex-col items-center py-20 bg-[#fafafa]">
      <h2 className="text-5xl font-extrabold mb-16 text-center text-gray-800">Serviços Desenvolvidos</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 max-w-7xl px-2">
        {[
          {
            title: "Landing Page simples",
            price: "R$499",
            features: ["Header", "4 seções", "Footer"]
          },
          {
            title: "Landing Page complexa",
            price: "R$999",
            features: ["Landing page complexa", "ou", "3 páginas em um site único"]
          },
          {
            title: "Site com integrações",
            price: "R$2499",
            features: ["Website com infraestrutura (back-end) e banco de dados."]
          },
          {
            title: "Website Ecommerce",
            price: "R$4999",
            features: ["Ecommerce de produto único com integração com sistemas de pagamento."]
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
