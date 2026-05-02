import { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { motion, useSpring } from 'motion/react';
import { PhoenixBonfire } from './components/PhoenixBonfire';
import { SparkButtonArea } from './components/SparkButtonArea';
import { SparkMessages, SparkMessage } from './components/SparkMessages';

const INITIAL_SPARKS = 842;

function Counter({ value }: { value: number }) {
   const [display, setDisplay] = useState(value);
   const spring = useSpring(value, { bounce: 0, duration: 800 });
   
   useEffect(() => { 
     spring.set(value); 
   }, [value, spring]);
   
   useEffect(() => { 
     return spring.on("change", (v) => setDisplay(Math.round(v))); 
   }, [spring]);

   return (
     <div className="text-center my-6 z-20 relative pointer-events-none">
       <div className="font-bebas text-[80px] md:text-[120px] text-[#DAAF37] leading-none drop-shadow-[0_0_20px_rgba(218,175,55,0.4)]">
         {display.toLocaleString('pt-BR')}
       </div>
       <div className="text-base md:text-xl tracking-[0.25em] uppercase text-[#E6E6E6]/60 mt-4 font-semibold">
         Faíscas da União
       </div>
     </div>
   );
}

export default function App() {
  const [sparkCount, setSparkCount] = useState(INITIAL_SPARKS);
  const [clickTrigger, setClickTrigger] = useState(0);
  const [messages, setMessages] = useState<SparkMessage[]>([
    { id: '1', text: 'Avante Vingadores! A paz e a justiça dependem de nós.', timestamp: Date.now() - 3600000 },
    { id: '2', text: 'Juntos somos mais fortes. Que essa chama nunca apague.', timestamp: Date.now() - 7200000 },
  ]);

  useEffect(() => {
    const savedSparks = localStorage.getItem('bonfire_sparks');
    if (savedSparks) {
       setSparkCount(Math.max(INITIAL_SPARKS, parseInt(savedSparks, 10)));
    }
    const savedMessages = localStorage.getItem('bonfire_messages');
    if (savedMessages) {
       try {
         setMessages(JSON.parse(savedMessages));
       } catch(e) {}
    }
  }, []);

  const handleAddSpark = () => {
    const newCount = sparkCount + 1;
    setSparkCount(newCount);
    setClickTrigger(prev => prev + 1);
    localStorage.setItem('bonfire_sparks', newCount.toString());
  };

  const handleAddMessage = (text: string) => {
    const newMessage: SparkMessage = {
      id: Date.now().toString(),
      text,
      timestamp: Date.now(),
    };
    const newMessages = [newMessage, ...messages].slice(0, 15);
    setMessages(newMessages);
    localStorage.setItem('bonfire_messages', JSON.stringify(newMessages));
    handleAddSpark();
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#E6E6E6] overflow-x-hidden selection:bg-[#DAAF37] selection:text-[#0A0A0A]">
      {/* Header */}
      <header className="p-6 relative z-20 flex justify-between items-center max-w-6xl mx-auto">
        <a href="https://osvingadores.netlify.app/" className="flex items-center gap-2 text-[#E6E6E6]/60 hover:text-[#DAAF37] transition-colors tracking-widest uppercase text-xs md:text-sm font-semibold cursor-pointer">
          <ArrowLeft size={18} />
          <span className="hidden md:inline">Voltar à Linha do Tempo</span>
          <span className="inline md:hidden">Voltar</span>
        </a>
        <div className="font-bebas text-xl md:text-2xl text-[#6B0D1A] tracking-widest">
          Projeto <span className="text-[#DAAF37]">Vingadores</span>
        </div>
      </header>

      <main className="flex flex-col items-center w-full px-4 pt-4 md:pt-10 pb-20 max-w-4xl mx-auto">
        
        <motion.div 
          className="text-center mb-10 z-20 relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="font-bebas text-[3.5rem] md:text-[5.5rem] text-[#E6E6E6] mb-2 md:mb-4 tracking-wider leading-none">
            Fogueira da <span className="text-[#DAAF37]">União</span>
          </h1>
          <p className="text-[#E6E6E6]/70 text-base md:text-xl leading-relaxed max-w-2xl mx-auto px-4 font-medium">
            Cada faísca adicionada fortalece nossa chama. Uma representação visual da união e da força coletiva.
          </p>
        </motion.div>

        {/* Visuals */}
        <PhoenixBonfire sparkCount={sparkCount} clickTrigger={clickTrigger} />
        
        <Counter value={sparkCount} />
        
        <SparkButtonArea onAddSpark={handleAddSpark} sparkCount={sparkCount} />

        <SparkMessages messages={messages} onAddMessage={handleAddMessage} />

      </main>
    </div>
  );
}
