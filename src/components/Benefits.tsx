const values = [
  {
    icon: "\u26AB",
    title: "Estilo Urbano",
    text: "Modelos curados com design moderno que combinam com qualquer visual.",
  },
  {
    icon: "\u2600\uFE0F",
    title: "Protecao UV",
    text: "Todas as lentes com protecao UV400. Estilo com seguranca para seus olhos.",
  },
  {
    icon: "\u2728",
    title: "Modelos Selecionados",
    text: "Curadoria exclusiva. Cada modelo e escolhido a dedo para garantir qualidade.",
  },
];

const features = [
  {
    icon: "\uD83D\uDE9A",
    title: "Envio para todo o Brasil",
    text: "Receba seu oculos onde voce estiver, com rastreamento completo.",
  },
  {
    icon: "\uD83D\uDCAC",
    title: "Compra pelo WhatsApp",
    text: "Atendimento direto e rapido. Tire duvidas e compre em minutos.",
  },
  {
    icon: "\uD83C\uDF1F",
    title: "Curadoria de Modelos",
    text: "Cada modelo e selecionado com criterio de qualidade e tendencia.",
  },
  {
    icon: "\uD83D\uDCB0",
    title: "Premium Acessivel",
    text: "Visual de grife sem o preco de grife. Qualidade que cabe no bolso.",
  },
];

export function ValueProps() {
  return (
    <section className="py-20 bg-[#F5F5F5]" id="proposta">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-4">
          Por que escolher BLIND?
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
          Design pensado para quem vive com estilo.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-xl p-10 text-center shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300"
            >
              <div className="text-4xl mb-5">{item.icon}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Features() {
  return (
    <section className="py-20 bg-[#F5F5F5]" id="diferenciais">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-4">
          Diferenciais BLIND
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
          Mais do que oculos. Uma experiencia.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => (
            <div key={item.title} className="text-center p-8">
              <div className="text-3xl mb-4">{item.icon}</div>
              <h3 className="text-base font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
