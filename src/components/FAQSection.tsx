"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Os óculos BLIND têm proteção UV?",
    answer:
      "Sim! Todos os modelos BLIND possuem lentes com proteção UV400, bloqueando 100% dos raios UVA e UVB.",
  },
  {
    question: "Como faço para comprar?",
    answer:
      "Você pode comprar diretamente pelo nosso WhatsApp. Basta clicar no botão 'Tenho interesse' no produto desejado e você será redirecionado para o atendimento.",
  },
  {
    question: "Vocês enviam para todo o Brasil?",
    answer:
      "Sim! Enviamos para todos os estados do Brasil com rastreamento completo. O prazo varia conforme a região.",
  },
  {
    question: "Posso trocar ou devolver?",
    answer:
      "Sim. Se o produto apresentar defeito ou você não ficar satisfeito, entre em contato pelo WhatsApp em até 7 dias após o recebimento.",
  },
  {
    question: "Os preços já estão disponíveis?",
    answer:
      "Estamos finalizando a precificação de alguns modelos. Os preços serão atualizados em breve. Enquanto isso, você pode demonstrar interesse pelo WhatsApp.",
  },
  {
    question: "Vocês vendem em marketplaces?",
    answer:
      "Em breve estaremos disponíveis no TikTok Shop, Shopee e Mercado Livre. Fique de olho nas nossas redes sociais para novidades!",
  },
];

function FAQItem({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200">
      <button
        className="w-full flex items-center justify-between py-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <span className="text-base font-semibold pr-4">{question}</span>
        <span className="text-xl text-gray-400 flex-shrink-0">
          {open ? "\u2212" : "+"}
        </span>
      </button>
      {open && (
        <p className="pb-5 text-sm text-gray-500 leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <section className="py-20" id="faq">
      <div className="max-w-3xl mx-auto px-5">
        <h2 className="text-3xl font-bold text-center mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-lg mx-auto">
          Tire suas dúvidas sobre a BLIND.
        </p>
        <div>
          {faqs.map((faq) => (
            <FAQItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
