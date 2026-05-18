import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Package, Truck, MessageCircle } from "lucide-react";
import { useLocation } from "wouter";

export default function Success() {
  const [, setLocation] = useLocation();
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("session_id");
    if (id) setSessionId(id);
  }, []);

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
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center">
              <CheckCircle className="w-14 h-14 text-green-400" />
            </div>
            <div className="absolute inset-0 rounded-full bg-green-500/10 animate-ping" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-3"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          Pedido Confirmado!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-muted-foreground text-lg mb-8"
        >
          Seu <span className="text-primary font-semibold">Copo Stanley Personalizado Brasil</span> está sendo preparado com muito carinho. 🇧🇷❤️
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-card border border-border rounded-2xl p-6 mb-8 text-left space-y-4"
        >
          <h3 className="text-foreground font-semibold text-center mb-4">Próximos passos</h3>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <MessageCircle className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium">Confirmação por e-mail</p>
              <p className="text-muted-foreground text-sm">Você receberá um e-mail com os detalhes do pedido em breve.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium">Personalização em 1-2 dias úteis</p>
              <p className="text-muted-foreground text-sm">Seu copo será personalizado com o nome informado com técnica premium.</p>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-foreground font-medium">Frete Grátis para todo o Brasil</p>
              <p className="text-muted-foreground text-sm">Entrega em 5-10 dias úteis após a personalização.</p>
            </div>
          </div>
        </motion.div>

        {sessionId && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-muted-foreground text-xs mb-6"
          >
            Código do pedido: <span className="font-mono text-primary">{sessionId.slice(0, 24)}...</span>
          </motion.p>
        )}

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setLocation("/")}
          data-testid="button-back-home"
          className="w-full py-4 rounded-xl font-bold text-black text-lg"
          style={{ background: "linear-gradient(135deg, #f5c518, #d4a017)" }}
        >
          Voltar para a Página Inicial
        </motion.button>
      </motion.div>
    </div>
  );
}
