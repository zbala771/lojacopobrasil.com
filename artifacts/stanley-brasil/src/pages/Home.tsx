import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Star,
  Check,
  X,
  ChevronDown,
  Truck,
  Shield,
  Clock,
  Award,
  PenTool,
  Droplets,
  Gift,
  Heart,
  Globe2,
} from "lucide-react";
import { SiVisa, SiMastercard, SiMercadopago, SiPix } from "react-icons/si";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

// --- Subcomponents --- //

function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 47,
    minutes: 23,
    seconds: 59,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds -= 1;
        if (seconds < 0) {
          seconds = 59;
          minutes -= 1;
        }
        if (minutes < 0) {
          minutes = 59;
          hours -= 1;
        }
        if (hours < 0) {
          hours = 47;
          minutes = 23;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 text-primary font-mono text-xl font-bold bg-primary/10 px-4 py-2 rounded-lg border border-primary/20 w-fit">
      <Clock className="w-5 h-5" />
      <span>{String(timeLeft.hours).padStart(2, "0")}</span>:
      <span>{String(timeLeft.minutes).padStart(2, "0")}</span>:
      <span>{String(timeLeft.seconds).padStart(2, "0")}</span>
    </div>
  );
}

function SocialProofPopup() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  const messages = [
    { name: "Ana", city: "São Paulo", time: "3" },
    { name: "Juliana", city: "Curitiba", time: "7" },
    { name: "Camila", city: "Rio de Janeiro", time: "1" },
    { name: "Beatriz", city: "Belo Horizonte", time: "12" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
      setIsVisible(true);
      setTimeout(() => setIsVisible(false), 4000);
    }, 20000); // Every 20s

    // Initial popup
    setTimeout(() => setIsVisible(true), 5000);
    setTimeout(() => setIsVisible(false), 9000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -50, y: 20 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          exit={{ opacity: 0, x: -50, y: 20 }}
          className="fixed bottom-24 md:bottom-8 left-4 md:left-8 z-50 bg-card/95 backdrop-blur border border-border p-3 rounded-lg shadow-xl flex items-center gap-3 max-w-[280px]"
        >
          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary border border-primary/30">
            <Star className="w-5 h-5 fill-current" />
          </div>
          <div className="text-sm">
            <p className="font-semibold text-foreground">
              {messages[currentIndex].name} de {messages[currentIndex].city}
            </p>
            <p className="text-muted-foreground text-xs">
              comprou há {messages[currentIndex].time} minutos
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-4 flex items-center justify-between text-left font-medium hover:text-primary transition-colors focus:outline-none"
      >
        <span>{question}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <p className="pb-4 text-muted-foreground leading-relaxed">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CtaButton({ className = "" }: { className?: string }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckout = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json() as { url?: string; error?: string };
      if (!response.ok || !data.url) {
        throw new Error(data.error ?? "Erro ao iniciar checkout");
      }
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <motion.button
        whileHover={{ scale: loading ? 1 : 1.02 }}
        whileTap={{ scale: loading ? 1 : 0.98 }}
        onClick={handleCheckout}
        disabled={loading}
        data-testid="button-cta-checkout"
        className="w-full bg-primary hover:bg-yellow-400 text-black font-bold text-lg py-4 px-8 rounded-full shadow-lg glow-gold animate-pulse-gold transition-all flex items-center justify-center gap-2 disabled:opacity-80 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-2 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Redirecionando...
          </>
        ) : (
          "QUERO O MEU AGORA ➜"
        )}
      </motion.button>
      {error && (
        <p className="text-red-400 text-sm text-center">{error}</p>
      )}
    </div>
  );
}

// --- Main Page Component --- //

export default function Home() {
  const scrollToCTA = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background selection:bg-primary/30 text-foreground overflow-x-hidden">
      {/* 1. Sticky Announcement Bar */}
      <div className="sticky top-0 z-40 w-full bg-primary text-black font-bold text-sm py-2 text-center shadow-md">
        🔥 Restam poucas unidades disponíveis — Oferta por tempo limitado!
      </div>

      <SocialProofPopup />

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-4 bg-background/90 backdrop-blur border-t border-border md:hidden">
        <CtaButton />
      </div>

      {/* 2. HERO Section */}
      <section className="relative pt-12 pb-20 px-4 md:px-8 overflow-hidden max-w-7xl mx-auto">
        <div className="absolute inset-0 -z-10 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 bg-red-500/20 text-red-500 font-bold px-3 py-1 rounded-full w-fit text-sm border border-red-500/30">
              <Award className="w-4 h-4" /> Oferta Limitada
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-tight text-white font-serif">
              Presenteie o Seu Namorado com um{" "}
              <span className="text-gradient-gold">Copo Stanley Personalizado</span> 🇧🇷❤️
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground font-medium">
              O presente perfeito para quem ama futebol, Brasil e exclusividade.
            </p>

            <ul className="space-y-3 mt-2">
              {[
                "Personalizado com o nome dele",
                "Bebida gelada por muitas horas",
                "Alta qualidade premium",
              ].map((text, i) => (
                <li key={i} className="flex items-center gap-3 text-white/90">
                  <div className="bg-accent/20 p-1 rounded-full text-accent border border-accent/30">
                    <Check className="w-4 h-4" />
                  </div>
                  {text}
                </li>
              ))}
            </ul>

            <div className="bg-card/50 border border-border p-6 rounded-2xl backdrop-blur mt-4">
              <Countdown />
              
              <div className="mt-6 flex flex-col gap-1">
                <span className="text-muted-foreground line-through decoration-red-500/50">De: R$ 97,90</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gradient-gold">R$ 51,90</span>
                  <span className="text-sm text-muted-foreground">à vista</span>
                </div>
                <span className="text-sm font-medium text-white/80">ou 3x de R$ 17,30 sem juros</span>
              </div>

              <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-accent" /> Frete Grátis</div>
                <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Garantia 7 dias</div>
              </div>

              <div className="mt-8 hidden md:block">
                <CtaButton />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[3/4] rounded-3xl overflow-hidden border border-border/50 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-primary/10 z-10 pointer-events-none mix-blend-overlay"></div>
              <img src="/cup-1.png" alt="Copo Stanley Personalizado" className="w-full h-full object-cover" />
            </div>
            {/* Floating badges */}
            <div className="absolute -right-4 top-10 bg-card p-3 rounded-xl border border-border shadow-xl backdrop-blur flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-500 fill-red-500/20" />
              <div className="text-sm font-bold">Amor<br/><span className="text-muted-foreground text-xs font-normal">Presente ideal</span></div>
            </div>
            <div className="absolute -left-4 bottom-20 bg-card p-3 rounded-xl border border-border shadow-xl backdrop-blur flex items-center gap-3">
              <Globe2 className="w-8 h-8 text-accent" />
              <div className="text-sm font-bold">Brasil<br/><span className="text-muted-foreground text-xs font-normal">Edição Especial</span></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 3. Social Proof Bar */}
      <div className="bg-primary/5 border-y border-primary/10 py-4 overflow-hidden flex whitespace-nowrap">
        <div className="animate-marquee flex gap-12 items-center px-4">
          {[...Array(3)].map((_, i) => (
            <React.Fragment key={i}>
              <span className="font-bold flex items-center gap-2"><Star className="w-5 h-5 text-primary fill-primary" /> 4.9/5 avaliação</span>
              <span className="text-primary/30">•</span>
              <span className="font-bold flex items-center gap-2"><Check className="w-5 h-5 text-accent" /> 2.400+ pedidos entregues</span>
              <span className="text-primary/30">•</span>
              <span className="font-bold flex items-center gap-2"><Shield className="w-5 h-5 text-primary" /> 100% satisfação garantida</span>
              <span className="text-primary/30">•</span>
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* 4. Benefits Section */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-black mb-4 font-serif text-white">
            Por que este é o <span className="text-gradient-gold">melhor presente</span>?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Qualidade incomparável com um toque de emoção e exclusividade.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { icon: PenTool, title: "Personalização Exclusiva", desc: "O nome dele gravado a laser, tornando a peça única e inesquecível." },
            { icon: Droplets, title: "Gelado por 24h", desc: "A tecnologia de parede dupla a vácuo garante a temperatura ideal sempre." },
            { icon: Shield, title: "Aço Inox 316", desc: "Material premium que não enferruja, não amassa facilmente e dura uma vida." },
            { icon: Heart, title: "Para o Dia dos Namorados", desc: "Surpreenda quem você ama com algo que ele vai usar todos os dias." },
            { icon: Globe2, title: "Edição Copa do Mundo", desc: "Design sutil com elementos brasileiros para os apaixonados por futebol." },
            { icon: Truck, title: "Entrega Rápida", desc: "Despachamos para todo o Brasil com código de rastreio e seguro." },
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border p-6 rounded-2xl hover:border-primary/50 transition-colors group"
            >
              <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 5. How personalization works */}
      <section className="py-20 bg-card/30 border-y border-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black mb-12 font-serif text-white">Como Funciona a Personalização?</h2>
          <div className="flex flex-col md:flex-row justify-between items-center relative gap-8 md:gap-0">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-border -z-10"></div>
            {[
              { step: "1", title: "Escolha o modelo", desc: "Selecione a cor e o estilo." },
              { step: "2", title: "Informe o nome", desc: "Digite o nome para a gravação a laser." },
              { step: "3", title: "Receba em casa", desc: "Chega embalado pronto para presentear." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center bg-background p-6 rounded-2xl border border-border w-full md:w-64">
                <div className="w-12 h-12 rounded-full bg-primary text-black font-black flex items-center justify-center text-xl mb-4 shadow-lg glow-gold">
                  {item.step}
                </div>
                <h4 className="font-bold text-lg mb-2 text-white">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Product Gallery */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-black text-center mb-12 font-serif text-white">Detalhes que Fazem a Diferença</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border">
            <img src="/cup-1.png" alt="Galeria 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border">
            <img src="/cup-2.png" alt="Galeria 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
          <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-border">
            <img src="/cup-3.png" alt="Galeria 3" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
          </div>
        </div>
      </section>

      {/* 8. Star Ratings section & 7. Testimonials */}
      <section className="py-24 bg-card/50 border-y border-border px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            
            <div className="md:col-span-1 flex flex-col items-center justify-center p-8 bg-background rounded-3xl border border-border">
              <h3 className="text-6xl font-black text-white font-serif mb-2">4.9</h3>
              <div className="flex gap-1 text-primary mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-6 h-6 fill-primary" />)}
              </div>
              <p className="text-muted-foreground mb-6 font-medium">Baseado em 2.450 avaliações</p>
              
              <div className="w-full space-y-2">
                {[
                  { stars: 5, pct: 89 },
                  { stars: 4, pct: 8 },
                  { stars: 3, pct: 2 },
                  { stars: 2, pct: 1 },
                  { stars: 1, pct: 0 },
                ].map((row) => (
                  <div key={row.stars} className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1 w-8 text-muted-foreground">{row.stars} <Star className="w-3 h-3" /></div>
                    <div className="flex-1 h-2 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: `${row.pct}%` }}></div>
                    </div>
                    <div className="w-8 text-right text-muted-foreground">{row.pct}%</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
              {[
                { name: "Mariana S.", date: "Há 2 dias", text: "Meu marido amou! A gravação ficou perfeita e a cor é muito elegante. Chegou super rápido.", init: "MS" },
                { name: "Roberto C.", date: "Há 1 semana", text: "Excelente qualidade. Deixo no carro sob o sol e a água continua gelando os dentes no fim do dia.", init: "RC" },
                { name: "Fernanda T.", date: "Há 2 semanas", text: "Dei de presente de Dia dos Namorados adiantado. Ele usa até pra tomar café. Muito lindo!", init: "FT" },
                { name: "Lucas P.", date: "Há 3 semanas", text: "Melhor copo que já tive. O detalhe verde e amarelo é muito sutil e de muito bom gosto.", init: "LP" },
              ].map((review, i) => (
                <div key={i} className="bg-background p-6 rounded-2xl border border-border">
                  <div className="flex gap-1 text-primary mb-3">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-primary" />)}
                  </div>
                  <p className="text-white/90 mb-6 font-medium leading-relaxed">"{review.text}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <Avatar className="w-10 h-10 border border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary">{review.init}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-bold text-sm text-white">{review.name}</p>
                      <p className="text-xs text-muted-foreground">{review.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* 9. Comparison table */}
      <section className="py-24 px-4 max-w-4xl mx-auto">
        <h2 className="text-3xl font-black text-center mb-12 font-serif text-white">Por que não um copo comum?</h2>
        <div className="bg-card border border-border rounded-3xl overflow-hidden">
          <div className="grid grid-cols-3 bg-background border-b border-border p-4 font-bold text-center">
            <div className="text-left px-4 text-muted-foreground">Característica</div>
            <div className="text-primary">Copo Stanley Personalizado</div>
            <div className="text-muted-foreground">Copo Comum</div>
          </div>
          {[
            { feature: "Gravação a laser com nome", us: true, them: false },
            { feature: "Isolamento térmico a vácuo", us: true, them: false },
            { feature: "24h Gelado / 8h Quente", us: true, them: false },
            { feature: "Design premium Brasil", us: true, them: false },
            { feature: "Tampa contra vazamentos", us: true, them: false },
          ].map((row, i) => (
            <div key={i} className="grid grid-cols-3 border-b border-border/50 p-4 items-center text-center last:border-0 hover:bg-white/5 transition-colors">
              <div className="text-left px-4 font-medium text-white/80">{row.feature}</div>
              <div className="flex justify-center"><Check className="w-6 h-6 text-accent" /></div>
              <div className="flex justify-center"><X className="w-6 h-6 text-red-500" /></div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. FAQ */}
      <section className="py-24 bg-card/30 border-y border-border px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-black text-center mb-12 font-serif text-white">Perguntas Frequentes</h2>
          <div className="space-y-2">
            <FAQAccordion 
              question="Qual o prazo de entrega?" 
              answer="Nosso prazo médio é de 5 a 12 dias úteis dependendo da sua região. Logo após a compra, você receberá o código de rastreio no seu e-mail e WhatsApp."
            />
            <FAQAccordion 
              question="Como informo o nome para personalização?" 
              answer="Após clicar no botão de compra e finalizar o pagamento, nossa equipe entrará em contato via WhatsApp para confirmar o nome exato a ser gravado a laser."
            />
            <FAQAccordion 
              question="O copo é original e de qual material?" 
              answer="Sim, trabalhamos apenas com produtos de altíssima qualidade (Aço Inoxidável 316), garantindo a durabilidade térmica e física do produto."
            />
            <FAQAccordion 
              question="Posso devolver se não gostar?" 
              answer="Sim! Você tem garantia incondicional de 7 dias. Se o produto não atender suas expectativas, devolvemos 100% do seu dinheiro, sem burocracia."
            />
            <FAQAccordion 
              question="Quais as formas de pagamento?" 
              answer="Aceitamos PIX (com aprovação imediata) e Cartão de Crédito em até 3x sem juros ou até 12x com pequeno acréscimo. Pagamentos via boleto também estão disponíveis."
            />
          </div>
        </div>
      </section>

      {/* 11. Final CTA */}
      <section className="relative py-32 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[url('/hero-bg.png')] bg-cover bg-center opacity-30 mix-blend-overlay"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="max-w-2xl mx-auto flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl font-black text-white font-serif mb-6 leading-tight">
            Não deixe para a <span className="text-gradient-gold">última hora</span>.
          </h2>
          <p className="text-xl text-muted-foreground mb-10">O estoque da edição especial Brasil é limitado. Garanta o presente dele hoje com desconto.</p>
          
          <div className="bg-background/80 backdrop-blur-xl border border-border p-8 rounded-3xl shadow-2xl w-full max-w-md mx-auto">
             <div className="flex justify-center mb-6">
                <Countdown />
             </div>
             <div className="flex flex-col gap-1 mb-8">
                <span className="text-muted-foreground line-through decoration-red-500/50">De: R$ 97,90</span>
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl font-black text-gradient-gold">R$ 51,90</span>
                </div>
                <span className="text-sm font-medium text-white/80 mt-2">ou 3x de R$ 17,30 sem juros</span>
              </div>
              <div onClick={scrollToCTA}>
                <CtaButton className="py-5 text-xl" />
              </div>
              <div className="flex items-center justify-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-accent" /> Frete Grátis</div>
                <div className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-primary" /> Garantia Total</div>
              </div>
          </div>
        </div>
      </section>

      {/* 12. Footer */}
      <footer className="bg-black py-12 border-t border-border px-4 text-center md:pb-12 pb-28">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div className="flex items-center justify-center gap-4 mb-8 text-muted-foreground">
            <SiPix className="w-8 h-8 hover:text-accent transition-colors" />
            <SiMercadopago className="w-8 h-8 hover:text-blue-400 transition-colors" />
            <SiVisa className="w-8 h-8 hover:text-blue-500 transition-colors" />
            <SiMastercard className="w-8 h-8 hover:text-orange-500 transition-colors" />
          </div>
          <div className="flex items-center justify-center gap-2 text-white/80 font-bold mb-6">
            <Shield className="w-5 h-5 text-accent" /> Compra 100% Segura
          </div>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
            Este site não é afiliado ao Facebook ou a qualquer entidade do Facebook. Depois que você sai do Facebook, a responsabilidade não é deles e sim do nosso site.
          </p>
          <div className="text-xs text-muted-foreground/50 space-x-4">
            <a href="#" className="hover:text-primary transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-primary transition-colors">Política de Privacidade</a>
            <a href="#" className="hover:text-primary transition-colors">Contato</a>
          </div>
          <p className="text-xs text-muted-foreground/50 mt-8">
            © {new Date().getFullYear()} Copo Personalizado Brasil. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
