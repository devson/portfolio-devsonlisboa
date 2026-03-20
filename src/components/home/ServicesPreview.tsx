import { Reveal } from "@/components/ui/Reveal";
import { Heading, BodyText, Label } from "@/components/ui/Typography";
import { prisma } from "@/lib/prisma";

interface ServicesPreviewProps {
  content: Record<string, string>;
}

export async function ServicesPreview({ content }: ServicesPreviewProps) {
  // Try to pull services from the database; fallback to static data
  let services: { id: string; title: string; description: string }[] = [];

  try {
    const dbServices = await prisma.service.findMany({ orderBy: { order: "asc" } });
    if (dbServices.length > 0) {
      services = dbServices;
    }
  } catch {}

  // Fallback to static data if no DB services
  if (services.length === 0) {
    const { siteData } = await import("@/data/content");
    services = siteData.services;
  }

  return (
    <section className="py-32 px-6 md:px-12 bg-off-white">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <Reveal>
            <Label className="mb-4 block">
              {content.services_label || "Competências"}
            </Label>
            <Heading className="max-w-3xl leading-snug">
              {content.services_title || "Unindo design de precisão, ferramentas generativas e percepção estética comercial."}
            </Heading>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {services.map((service, index) => (
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
