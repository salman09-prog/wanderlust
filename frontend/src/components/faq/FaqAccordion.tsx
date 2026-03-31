
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { faqs } from '@/constants/destinations';

const FaqAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-white/10">
          <AccordionTrigger className="text-left font-medium text-white hover:text-zinc-300">
            {faq.question}
          </AccordionTrigger>
          <AccordionContent className="text-zinc-400">
            {faq.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqAccordion;
