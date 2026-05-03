import { useEffect, useState, useCallback, memo } from "react";
import { ArrowLeft, MessageSquare } from "lucide-react";
import { motion, useSpring } from "motion/react";
import { PhoenixBonfire } from "./components/PhoenixBonfire";
import { SparkButtonArea } from "./components/SparkButtonArea";
import { SparkMessages, SparkMessage } from "./components/SparkMessages";

const INITIAL_SPARKS = 842;

const Counter = memo(function Counter({ value }: { value: number }) {
  const [display, setDisplay] = useState(value);
  const spring = useSpring(value, { bounce: 0, duration: 800 });

  useEffect(() => {
    spring.set(value);
  }, [value, spring]);

  useEffect(() => {
    return spring.on("change", (v) => setDisplay(Math.round(v)));
  }, [spring]);

  return (
    <div className="text-center z-20 relative pointer-events-none">
      <div className="font-bebas text-[70px] md:text-[90px] text-[#E4BA4B] leading-none tracking-[0.05em] drop-shadow-[0_0_20px_rgba(228,186,75,0.3)]">
        {display.toLocaleString("pt-BR")}
      </div>
      <div className="text-xs md:text-sm tracking-[0.3em] uppercase text-[#F0F0F0]/40 mt-1 md:mt-2 font-semibold">
        Faíscas da Chama
      </div>
    </div>
  );
});

export default function App() {
  const [sparkCount, setSparkCount] = useState(INITIAL_SPARKS);
  const [clickTrigger, setClickTrigger] = useState(0);
  const [isMessagesOpen, setIsMessagesOpen] = useState(false);
  const [messages, setMessages] = useState<SparkMessage[]>([
    {
      id: "1",
      text: "Avante Vingadores! A paz e a justiça dependem de nós.",
      timestamp: Date.now() - 3600000,
    },
    {
      id: "2",
      text: "Juntos somos mais fortes. Que essa chama nunca apague.",
      timestamp: Date.now() - 7200000,
    },
  ]);

  useEffect(() => {
    const savedSparks = localStorage.getItem("bonfire_sparks");
    if (savedSparks) {
      setSparkCount(Math.max(INITIAL_SPARKS, parseInt(savedSparks, 10)));
    }
    const savedMessages = localStorage.getItem("bonfire_messages");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {}
    }
  }, []);

  const handleAddSpark = useCallback(() => {
    setSparkCount((prev) => {
      const newCount = prev + 1;
      localStorage.setItem("bonfire_sparks", newCount.toString());
      return newCount;
    });
    setClickTrigger((prev) => prev + 1);
  }, []);

  const handleAddMessage = useCallback(
    (text: string) => {
      const newMessage: SparkMessage = {
        id: Date.now().toString(),
        text,
        timestamp: Date.now(),
      };
      setMessages((prev) => {
        const newMessages = [newMessage, ...prev].slice(0, 15);
        localStorage.setItem("bonfire_messages", JSON.stringify(newMessages));
        return newMessages;
      });
      handleAddSpark();
    },
    [handleAddSpark],
  );

  return (
    <div className="h-[100dvh] w-full bg-[#030303] text-[#F0F0F0] overflow-hidden selection:bg-[#E4BA4B] selection:text-[#030303] flex flex-col relative">
      {/* Abstract Grid background */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.02] z-0"
        style={{
          backgroundImage:
            "linear-gradient(#F0F0F0 1px, transparent 1px), linear-gradient(90deg, #F0F0F0 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Header */}
      <header className="px-6 py-6 md:py-8 relative z-20 flex justify-between items-center w-full border-b border-[#F0F0F0]/5 shrink-0">
        <a
          href="https://pagina-inicial.vingadores.workers.dev/"
          className="flex items-center gap-3 text-[#F0F0F0]/50 hover:text-[#E4BA4B] transition-colors tracking-[0.2em] uppercase text-[10px] font-semibold cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span className="hidden md:inline">O Retorno</span>
          <span className="inline md:hidden">Voltar</span>
        </a>
        <div className="font-bebas text-lg md:text-xl text-[#F0F0F0]/80 tracking-[0.2em]">
          PROJETO <span className="text-[#E4BA4B]">VINGADORES</span>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center justify-around w-full px-4 py-8 relative z-10 max-h-full">
        <motion.div
          className="text-center z-20 relative shrink-0"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="inline-block px-4 py-1 rounded-full border border-[#8C1C2A]/20 bg-[#050505] text-[9px] md:text-[10px] tracking-[0.3em] text-[#E4BA4B] uppercase font-semibold mb-4 md:mb-6">
            Fogueira Coletiva
          </div>
          <h1 className="font-bebas text-[3rem] md:text-[5rem] text-[#F0F0F0] mb-2 md:mb-4 tracking-[0.05em] leading-none">
            A Chama <span className="text-[#E4BA4B]">Eterna</span>
          </h1>
          <p className="text-[#F0F0F0]/50 text-xs md:text-sm leading-relaxed max-w-sm mx-auto px-4 font-medium tracking-wide">
            A essência do que construímos transcende o tempo.{" "}
            <br className="hidden md:block" />
            Deixe sua marca.
          </p>
        </motion.div>

        {/* Visuals - using flex-1 to distribute remaining space and shrinking if needed */}
        <div className="flex-1 w-full max-w-lg mx-auto relative flex flex-col justify-center items-center shrink min-h-0 py-4">
          <div className="relative w-full h-[30vh] sm:h-[40vh] min-h-[200px] flex items-center justify-center shrink-0">
            <PhoenixBonfire
              sparkCount={sparkCount}
              clickTrigger={clickTrigger}
            />
          </div>

          <div className="my-2 md:my-4 shrink-0">
            <Counter value={sparkCount} />
          </div>

          <div className="scale-75 md:scale-90 lg:scale-100 shrink-0 origin-top">
            <SparkButtonArea
              onAddSpark={handleAddSpark}
              sparkCount={sparkCount}
            />
          </div>
        </div>
      </main>

      {/* Floating Action Button for Messages */}
      <motion.button
        onClick={() => setIsMessagesOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-6 right-6 md:bottom-8 md:right-8 z-30 p-4 rounded-full bg-[#050505] border border-[#8C1C2A]/30 text-[#E4BA4B] shadow-[0_0_30px_rgba(140,28,42,0.15)] hover:border-[#E4BA4B]/50 hover:bg-[#0A0A0A] transition-colors cursor-pointer group flex items-center gap-3 overflow-hidden"
      >
        <MessageSquare
          size={24}
          className="group-hover:drop-shadow-[0_0_8px_rgba(228,186,75,0.8)] transition-all"
        />
        <span className="hidden sm:inline font-bebas tracking-[0.1em] text-lg leading-none mt-1 group-hover:text-[#F0F0F0] transition-colors">
          Mensagens
        </span>
      </motion.button>

      <SparkMessages
        messages={messages}
        onAddMessage={handleAddMessage}
        isOpen={isMessagesOpen}
        onClose={() => setIsMessagesOpen(false)}
      />
    </div>
  );
}
