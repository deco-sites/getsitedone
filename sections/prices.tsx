import Icon from "../components/ui/Icon.tsx";

interface Props {
  name?: string;
}

export default function Section({ }: Props) {
  return (
    <div className="flex flex-col items-center py-20 bg-[#fafafa]">
      <h2 className="text-5xl font-extrabold mb-16 text-center text-gray-800">Serviços Desenvolvidos</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 max-w-7xl px-4">
        {[
          {
            title: "Landing Page simples",
            price: "R$499",
            features: ["Header", "4 seções", "Footer"]
          },
          {
            title: "Landing Page complexa",
            price: "R$999",
            features: ["Landing page complexa", "3 páginas em um site único"]
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
            className="bg-white p-8 lg:p-10 rounded-2xl text-center border border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
          >
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">{service.title}</h3>
            <p className="text-[#9900e5] text-2xl lg:text-3xl font-extrabold mb-6">{service.price}</p>
            <ul className="text-left space-y-2 text-md lg:text-lg">
              {service.features.map((feature, idx) => (
                <li key={idx} className="flex items-center text-gray-700">
                  <Icon
                    class="flex-shrink-0 text-[#b442ed] mr-2"
                    id="circleCheck"
                    height={20}
                    width={20}
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
