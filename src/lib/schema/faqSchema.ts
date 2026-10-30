export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqSchemaArgs = {
  pageUrl: string; 
  faqs: FaqItem[];
};

export function buildFaqSchema(args: FaqSchemaArgs) {
  const { pageUrl, faqs } = args;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}