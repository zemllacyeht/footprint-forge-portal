"use client";

import * as React from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type CarouselApi = UseEmblaCarouselType[1];

export interface Service {
  number: string;
  title: string;
  description: string;
  icon: React.ElementType;
}

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="glass glass-hover rounded-2xl p-8 md:p-10 h-full flex flex-col justify-between relative overflow-hidden group"
    >
      <div className="absolute top-0 left-8 right-8 h-px bg-gradient-gold opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute -top-24 -right-24 h-48 w-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

      <div className="relative flex items-start justify-between mb-12">
        <span className="text-xs uppercase tracking-[0.25em] text-accent">
          ( {service.number} )
        </span>
        <div className="h-12 w-12 rounded-lg glass grid place-items-center group-hover:bg-gradient-primary group-hover:border-transparent transition-all duration-500">
          <Icon className="h-5 w-5 text-primary group-hover:text-primary-foreground transition-colors" />
        </div>
      </div>

      <div className="relative">
        <h3 className="font-display text-3xl md:text-4xl font-light leading-tight mb-4">
          {service.title}
        </h3>
        <div className="h-px w-12 bg-gradient-gold mb-5" />
        <p className="text-muted-foreground leading-relaxed">
          {service.description}
        </p>
      </div>
    </motion.div>
  );
};

export const ServiceCarousel = ({ services }: { services: Service[] }) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    loop: false,
    containScroll: "trimSnaps",
  });
  const [canPrev, setCanPrev] = React.useState(false);
  const [canNext, setCanNext] = React.useState(false);

  const onSelect = React.useCallback((api: CarouselApi) => {
    if (!api) return;
    setCanPrev(api.canScrollPrev());
    setCanNext(api.canScrollNext());
  }, []);

  React.useEffect(() => {
    if (!emblaApi) return;
    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
      className="relative"
    >
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-6">
          {services.map((service, index) => (
            <div
              key={service.number}
              className={cn(
                "pl-6 shrink-0 grow-0",
                "basis-[85%] sm:basis-[60%] md:basis-[45%] lg:basis-[33.333%]"
              )}
            >
              <ServiceCard service={service} index={index} />
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-end gap-3 mt-10">
        <Button
          variant="glass"
          size="icon"
          onClick={() => emblaApi?.scrollPrev()}
          disabled={!canPrev}
          aria-label="Previous"
          className="h-12 w-12 rounded-full"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="glass"
          size="icon"
          onClick={() => emblaApi?.scrollNext()}
          disabled={!canNext}
          aria-label="Next"
          className="h-12 w-12 rounded-full"
        >
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};
