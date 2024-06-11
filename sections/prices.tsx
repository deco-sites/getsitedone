interface Props {
  name?: string;
}

export default function Section({ name = "Capy" }: Props) {
  return (
    <div className="flex flex-col items-center py-12 bg-white">
      <h2 className="text-3xl font-bold mb-8">Serviços desenvolvidos</h2>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 max-w-7xl">
        <div className="bg-white p-6 rounded-lg text-center border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Landing Page simples</h3>
          <p className="text-purple-500 text-2xl font-bold mb-4">R$499</p>
          <p className="text-left mb-2">Landing page contendo:</p>
          <ul className="text-left">
            <li className="flex items-center mb-2">
              <span className="text-purple-500 mr-2">✔</span> Design pré-definido
            </li>
            <li className="flex items-center mb-2">
              <span className="text-purple-500 mr-2">✔</span> Header
            </li>
            <li className="flex items-center mb-2">
              <span className="text-purple-500 mr-2">✔</span> 4 seções
            </li>
            <li className="flex items-center mb-2">
              <span className="text-purple-500 mr-2">✔</span> Footer
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg text-center border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Landing Page complexa</h3>
          <p className="text-purple-500 text-2xl font-bold mb-4">R$999</p>
          <p className="text-left mb-2">Landing page contendo:</p>
          <ul className="text-left">
            <li className="flex items-center mb-2">
              <span className="text-purple-500 mr-2">✔</span> Landing page complexa ou
            </li>
            <li className="flex items-center mb-2">
              <span className="text-purple-500 mr-2">✔</span> 3 páginas simples no mesmo site
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg text-center border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Site com integrações</h3>
          <p className="text-purple-500 text-2xl font-bold mb-4">R$2499</p>
          <p className="text-left mb-2">Implementação de website com:</p>
          <ul className="text-left">
            <li className="flex items-center mb-2">
              <span className="text-purple-500 mr-2">✔</span> Integração com banco de dados e/ou terceiros.
            </li>
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg text-center border border-gray-200 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Website Ecommerce</h3>
          <p className="text-purple-500 text-2xl font-bold mb-4">R$4999</p>
          <p className="text-left mb-2">Ecommerce de produto único com:</p>
          <ul className="text-left">
            <li className="flex items-center mb-2">
              <span className="text-purple-500 mr-2">✔</span> Integração com meios de pagamento.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
