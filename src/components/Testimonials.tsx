const testimonials = [
  {
    text: "Qualidade surpreendente pelo preço. Já comprei dois modelos e ambos são incríveis.",
    author: "Lucas M.",
  },
  {
    text: "Atendimento rápido pelo WhatsApp e o óculos chegou super bem embalado. Recomendo!",
    author: "Camila R.",
  },
  {
    text: "Design muito bonito e proteção UV de verdade. Uso todos os dias.",
    author: "Rafael S.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-20" id="depoimentos">
      <div className="max-w-7xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-4">
          O que dizem sobre a BLIND
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
          Quem usa, recomenda.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item.author}
              className="bg-white rounded-xl p-8 shadow-md"
            >
              <div className="text-yellow-500 mb-4">
                {"★".repeat(5)}
              </div>
              <p className="text-sm text-gray-700 leading-relaxed italic mb-4">
                &ldquo;{item.text}&rdquo;
              </p>
              <p className="text-sm font-semibold">- {item.author}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
