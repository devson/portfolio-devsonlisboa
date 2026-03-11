import { Reveal } from "@/components/ui/Reveal";
import { Heading, BodyText, Label } from "@/components/ui/Typography";
import { siteData } from "@/data/content";

export function ServicesPreview() {
  return (
    <section className="py-32 px-6 md:px-12 bg-off-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <Reveal>
            <Label className="mb-4 block">Competências</Label>
            <Heading className="max-w-3xl leading-snug">
              Unindo design de precisão, ferramentas generativas e percepção estética comercial.
            </Heading>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {siteData.services.map((service, index) => (
            <Reveal
              key={service.id}
              delay={index * 0.1}
              className="border-t border-black-obsidian/10 pt-6 group"
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="font-serif text-2xl font-medium tracking-editorial">
                  {service.title}
                </h3>
                <span className="font-sans text-xs uppercase tracking-widest text-black-obsidian/40 group-hover:text-black-obsidian transition-colors mt-2">
                  0{index + 1}
                </span>
              </div>
              <BodyText className="text-black-obsidian/70">
                {service.description}
              </BodyText>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
