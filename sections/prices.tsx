import Icon from "../components/ui/Icon.tsx";

/** @titleBy title */
export interface Service {
  title: string;
  price: string;
  features: string[];
}

export interface Props {
  /** @format color-input */
  backgroundColor?: string;
  /** @format html */
  title?: string;
  services: Service[];
  id?: string;
}

export default function Section(
  { services, title, backgroundColor, id }: Props,
) {
  return (
    <div
      className={`w-full py-20 ${
        backgroundColor ? `bg-[${backgroundColor}]` : "bg-[#fafafa]"
      }`}
      id={id}
    >
      <div className="flex flex-col items-center w-full">
        {title && (
          <h2
            className="text-5xl font-extrabold mb-16 text-center text-gray-800"
            dangerouslySetInnerHTML={{ __html: title }}
          />
        )}
        <div className="flex justify-center max-w-7xl px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 lg:p-10 rounded-2xl text-left shadow-lg w-full max-w-xs"
              >
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-[#9900e5] text-2xl lg:text-3xl font-extrabold mb-5">
                  {service.price}
                </p>
                <ul className="space-y-2 text-xs lg:text-sm">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-gray-700">
                      {feature !== "ou"
                        ? (
                          <>
                            <Icon
                              class="flex-shrink-0 text-[#b442ed] mr-2"
                              id="circleCheck"
                              height={20}
                              width={20}
                            />
                            <span className="font-bold">{feature}</span>
                          </>
                        )
                        : <span className="w-full text-center">{feature}</span>}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>``
    </div>
  );
} 
