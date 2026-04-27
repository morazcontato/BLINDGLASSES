"use client";

import { useState } from "react";

const faqs = [
  {
    question: "Os oculos BLIND tem protecao UV?",
    answer:
      "Sim! Todos os modelos BLIND possuem lentes com protecao UV400, bloqueando 100% dos raios UVA e UVB.",
  },
  {
    question: "Como faco para comprar?",
    answer:
      "Voce pode comprar diretamente pelo nosso WhatsApp. Basta clicar no botao 'Tenho interesse' no produto desejado e voce sera redirecionado para o atendimento.",
  },
  {
    question: "Voces enviam para todo o Brasil?",
    answer:
      "Sim! Enviamos para todos os estados do Brasil com rastreamento completo. O prazo varia conforme a regiao.",
  },
  {
    question: "Posso trocar ou devolver?",
    answer:
      "Sim. Se o produto apresentar defeito ou voce nao ficar satisfeito, entre em contato pelo WhatsApp em ate 7 dias apos o recebimento.",
  },
  {
    question: "Os precos ja estao disponiveis?",
    answer:
      "Estamos finalizando a precificacao de alguns modelos. Os precos serao atualizados em breve. Enquanto isso, voce pode demonstrar interesse pelo WhatsApp.",
  },
  {
    question: "Voces vendem em marketplaces?",
    answer:
      "Em breve estaremos disponiveis no TikTok Shop, Shopee e Mercado Livre. Fique de olho nas nossas redes sociais para novidades!",
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
          Tire suas duvidas sobre a BLIND.
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
