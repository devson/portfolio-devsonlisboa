"use client";

import { useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { Display, Heading, BodyText, Label } from "@/components/ui/Typography";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

export default function ContatoPage() {
  const [formState, setFormState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "", email: "", interest: "", message: "",
  });
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("sending");

    const whatsappText = `*Novo contato pelo Site Devson Lisboa*%0A%0A*Nome:* ${formData.name}%0A*Email:* ${formData.email}%0A*Interesse:* ${formData.interest}%0A*Mensagem:* ${formData.message}`;
    const whatsappUrl = `https://wa.me/5511933436479?text=${whatsappText}`;

    try {
      // 1. Enviar email de notificação via FormSubmit
      await fetch("https://formsubmit.co/ajax/devson.lisboa@gmail.com", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json", 
          "Accept": "application/json" 
        },
        body: JSON.stringify({
          _subject: `Novo Lead Premium: ${formData.name}`,
          Nome: formData.name,
          Email: formData.email,
          Interesse: formData.interest,
          Mensagem: formData.message,
          _template: "table"
        }),
      });
    } catch (e) {
      console.error(e);
      // Ignora erro de rede para não bloquear o WhatsApp
    }

    setFormState("success");

    // 2. Acionar alerta/WhatsApp
    setTimeout(() => {
      window.open(whatsappUrl, "_blank");
    }, 1000);
  };

  const inputClass = "bg-transparent border-b border-foreground/20 focus:border-foreground outline-none py-3 font-serif text-lg transition-colors w-full pt-6";
  const labelClass = "absolute left-0 transition-all duration-300 pointer-events-none font-sans";

  const getLabelClass = (field: string) => {
    const isFocusedOrFilled = focusedField === field || formData[field as keyof typeof formData] !== "";
    return `${labelClass} ${isFocusedOrFilled ? "-top-2 text-xs text-foreground/50 uppercase tracking-widest" : "top-5 text-base text-foreground/60"}`;
  };

  if (formState === "success") {
    return (
      <div className="flex flex-col w-full pb-32">
        <div className="pt-12 px-6 md:px-12 max-w-4xl mx-auto w-full text-center flex flex-col items-center justify-center min-h-[60vh]">
          <Reveal>
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ type: "spring", stiffness: 200, damping: 20 }}
               className="text-4xl mb-8 flex justify-center items-center w-24 h-24 rounded-full border border-foreground/20 mx-auto"
            >
               ✓
            </motion.div>
            <Display className="mb-6">Visão Alinhada</Display>
            <Heading as="h2" className="text-foreground/70 mb-8 max-w-lg mx-auto">
              Sua mensagem foi enviada. Seu WhatsApp foi aberto para continuarmos a conversa por lá.
            </Heading>
            <Button href="/" variant="outline">Voltar ao Início</Button>
          </Reveal>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full pb-32">
      <div className="pt-12 px-6 md:px-12 max-w-4xl mx-auto w-full text-center">
        <Reveal>
          <Display className="mb-6">Iniciar Conversa</Display>
        </Reveal>
        <Reveal delay={0.2}>
          <Heading as="h2" className="text-foreground/70 mb-24">
            Empreendimentos memoráveis começam com o alinhamento da visão.
          </Heading>
        </Reveal>
      </div>

      <div className="px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* Contact Info */}
          <div className="flex flex-col gap-16">
            <Reveal delay={0.3}>
              <Label className="block mb-4">Email</Label>
              <a 
                href="mailto:devson.lisboa@gmail.com" 
                className="font-serif text-3xl font-medium tracking-editorial border-b border-foreground/20 hover:border-foreground transition-colors pb-1 inline-block"
              >
                devson.lisboa@gmail.com
              </a>
            </Reveal>

            <Reveal delay={0.35}>
              <Label className="block mb-4">WhatsApp</Label>
              <a 
                href="https://wa.me/5511933436479"
                target="_blank"
                rel="noopener noreferrer"
                className="font-serif text-3xl font-medium tracking-editorial border-b border-foreground/20 hover:border-foreground transition-colors pb-1 inline-block"
              >
                (11) 93343-6479
              </a>
            </Reveal>

            <Reveal delay={0.4}>
              <Label className="block mb-4">Studio</Label>
              <BodyText className="text-foreground/80 max-w-xs">
                Disponível para projetos remotos globalmente e reuniões presenciais mediante agendamento.
              </BodyText>
            </Reveal>

            <Reveal delay={0.5}>
              <Label className="block mb-4">Redes</Label>
              <div className="flex flex-col gap-4">
                <a href="https://www.instagram.com/devsonlisboa.au/" target="_blank" rel="noopener noreferrer" className="font-sans font-medium text-lg hover:text-accent-bronze transition-colors flex items-center justify-between group max-w-[200px]">
                  <span>Instagram</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="https://www.linkedin.com/in/devson-lisboa-89978723/" target="_blank" rel="noopener noreferrer" className="font-sans font-medium text-lg hover:text-accent-bronze transition-colors flex items-center justify-between group max-w-[200px]">
                  <span>LinkedIn</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
                <a href="https://behance.net/devsonlisboa" target="_blank" rel="noopener noreferrer" className="font-sans font-medium text-lg hover:text-accent-bronze transition-colors flex items-center justify-between group max-w-[200px]">
                  <span>Behance</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </div>
            </Reveal>
          </div>

          {/* Contact Form */}
          <Reveal delay={0.4} className="bg-warm-gray p-8 md:p-14 border border-foreground/5 relative overflow-hidden h-fit">
            
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-foreground/20 to-transparent opacity-50" />
            
            <Label className="block mb-10 text-xs tracking-widest text-foreground/50">NOVO PROJETO</Label>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
              
              <div className="relative">
                <label htmlFor="name" className={getLabelClass("name")}>Nome</label>
                <input 
                  type="text" id="name" value={formData.name} onChange={handleChange} 
                  onFocus={() => setFocusedField("name")} onBlur={() => setFocusedField(null)}
                  className={inputClass} required 
                />
              </div>

              <div className="relative">
                <label htmlFor="email" className={getLabelClass("email")}>Email</label>
                <input 
                  type="email" id="email" value={formData.email} onChange={handleChange} 
                  onFocus={() => setFocusedField("email")} onBlur={() => setFocusedField(null)}
                  className={inputClass} required 
                />
              </div>

              <div className="relative group">
                <label htmlFor="interest" className={getLabelClass("interest")}>Interesse principal</label>
                <select 
                  id="interest" value={formData.interest} onChange={handleChange} 
                  onFocus={() => setFocusedField("interest")} onBlur={() => setFocusedField(null)}
                  className={`${inputClass} appearance-none cursor-pointer bg-transparent`} required
                >
                  <option value="" disabled className="hidden"></option>
                  <option value="Projeto Arquitetônico">Projeto Arquitetônico</option>
                  <option value="Interiores Corporativos">Interiores Corporativos</option>
                  <option value="Visualização (Archviz)">Visualização (Archviz)</option>
                  <option value="Estratégia com IA">Estratégia com IA</option>
                  <option value="Consultoria Criativa">Consultoria Criativa</option>
                </select>
                <div className="absolute right-0 top-8 pointer-events-none text-foreground/50 group-hover:text-foreground transition-colors">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                </div>
              </div>

              <div className="relative mb-6">
                <label htmlFor="message" className={getLabelClass("message")}>Mensagem</label>
                <textarea 
                  id="message" rows={4} value={formData.message} onChange={handleChange} 
                  onFocus={() => setFocusedField("message")} onBlur={() => setFocusedField(null)}
                  className={`${inputClass} resize-none`} required 
                />
              </div>

              <div className="flex flex-col mt-4">
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  disabled={formState === "sending"}
                  className="w-full bg-black-obsidian text-off-white py-5 font-sans text-xs uppercase tracking-widest hover:bg-black-obsidian/90 transition-colors flex items-center justify-center gap-3"
                >
                  {formState === "sending" ? (
                    <motion.div 
                      animate={{ rotate: 360 }} 
                      transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                      className="w-5 h-5 border-2 border-off-white/20 border-t-off-white rounded-full"
                    />
                  ) : "Enviar Mensagem"}
                </motion.button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </div>
  );
}
