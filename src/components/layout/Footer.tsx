import Link from "next/link";
import { siteData } from "@/data/content";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black-obsidian text-off-white pt-24 pb-8 px-6 md:px-12 mt-auto">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-24">
          
          <div className="col-span-1 lg:col-span-2">
            <Link href="/" className="inline-block hover:opacity-70 transition-opacity mb-6">
              <span className="font-serif font-medium text-3xl tracking-editorial block">
                Devson Lisboa
              </span>
              <span className="font-sans text-xs uppercase tracking-wide-editorial opacity-60 mt-2 block delay-100">
                Studio
              </span>
            </Link>
            <p className="font-sans text-sm leading-relaxed text-off-white/70 max-w-sm">
              Trabalhando na intersecção entre arquitetura de alto padrão, artes visuais e inteligência artificial para criar narrativas espaciais memoráveis.
            </p>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-wide-editorial text-off-white/40 mb-6">
              Navegação
            </h4>
            <ul className="flex flex-col gap-4">
              {['Sobre', 'Serviços', 'Projetos', 'Contato'].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/${item.toLowerCase().replace('ç', 'c')}`}
                    className="font-sans font-medium text-sm hover:text-accent-bronze transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
              <li>
                <Link 
                  href="/admin"
                  className="font-sans font-medium text-sm hover:text-accent-bronze transition-colors duration-300 text-off-white/70"
                >
                  Área Admin
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-sans text-xs uppercase tracking-wide-editorial text-off-white/40 mb-6">
              Contato
            </h4>
            <ul className="flex flex-col gap-4 font-sans text-sm text-off-white/80">
              <li>
                <a href="mailto:contato@devsonlisboa.com" className="hover:text-accent-bronze transition-colors">
                  contato@devsonlisboa.com
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-bronze transition-colors">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-accent-bronze transition-colors">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-off-white/10 flex flex-col md:flex-row items-center justify-between gap-4 font-sans text-xs text-off-white/40">
          <p>© {currentYear} {siteData.about.name}. Todos os direitos reservados.</p>
          <div className="flex gap-6 items-center">
            <Link href="#" className="hover:text-off-white transition-colors">Privacidade</Link>
            <Link href="#" className="hover:text-off-white transition-colors">Termos</Link>
            <span className="w-1 h-1 rounded-full bg-off-white/20"></span>
            <Link href="/admin" className="hover:text-off-white transition-colors font-medium">Site Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
