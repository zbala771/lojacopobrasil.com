import { motion } from "framer-motion";
import { XCircle, ArrowLeft, ShieldCheck } from "lucide-react";
import { useLocation } from "wouter";

export default function Cancel() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="max-w-lg w-full text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="flex justify-center mb-6"
        >
          <div className="w-24 h-24 rounded-full bg-red-500/20 flex items-center justify-center">
            <XCircle className="w-14 h-14 text-red-400" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Pagamento Cancelado
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-8"
        >
          Não se preocupe, nenhum valor foi cobrado. Sua oferta especial ainda está disponível!
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-primary/20 rounded-2xl p-6 mb-8"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <ShieldCheck className="w-5 h-5 text-green-400" />
            <span className="text-foreground font-semibold">Sua oferta ainda está reservada</span>
          </div>
          <div className="text-center">
            <p className="text-muted-foreground line-through text-sm">De: R$ 97,90</p>
            <p className="text-primary font-bold text-3xl">R$ 51,90</p>
            <p className="text-muted-foreground text-sm mt-1">ou 3x de R$ 17,30 sem juros</p>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/")}
          data-testid="button-try-again"
          className="w-full py-4 rounded-xl font-bold text-black text-lg mb-4 animate-pulse-gold"
          style={{ background: "linear-gradient(135deg, #f5c518, #d4a017)" }}
        >
          Tentar Novamente — Garantir Meu Copo
        </motion.button>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          onClick={() => setLocation("/")}
          data-testid="button-back-home-cancel"
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mx-auto"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para a página
        </motion.button>
      </motion.div>
    </div>
  );
}
