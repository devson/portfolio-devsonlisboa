import { Reveal } from "@/components/ui/Reveal";
import { Heading, BodyText, Label } from "@/components/ui/Typography";
import { prisma } from "@/lib/prisma";

export async function Testimonials() {
  let testimonials: { id: string; name: string; role: string; company: string | null; quote: string }[] = [];

  try {
    testimonials = await (prisma as any).testimonial.findMany({
      where: { featured: true },
      orderBy: { order: "asc" },
      take: 3,
    });
  } catch {}

  if (testimonials.length === 0) return null;

  return (
    <section className="py-32 px-6 md:px-12 bg-warm-gray">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <Reveal>
            <Label className="mb-4 block">Depoimentos</Label>
            <Heading className="max-w-2xl leading-snug">
              O que dizem sobre o trabalho.
            </Heading>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.15}>
              <blockquote className="flex flex-col h-full">
                <div className="font-serif text-5xl text-foreground/10 leading-none mb-4">"</div>
                <BodyText className="text-foreground/80 italic mb-8 flex-1">
                  {t.quote}
                </BodyText>
                <div className="border-t border-foreground/10 pt-4">
                  <p className="font-sans font-semibold text-sm">{t.name}</p>
                  <p className="font-sans text-xs text-foreground/50 mt-1">
                    {t.role}{t.company ? ` · ${t.company}` : ""}
                  </p>
                </div>
              </blockquote>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
