import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquarePlus } from 'lucide-react';

export interface SparkMessage {
  id: string;
  text: string;
  timestamp: number;
}

export function SparkMessages({
  messages,
  onAddMessage
}: {
  messages: SparkMessage[],
  onAddMessage: (msg: string) => void
}) {
   const [text, setText] = useState('');

   const submit = (e: any) => {
     e.preventDefault();
     if(text.trim()) {
        onAddMessage(text);
        setText('');
     }
   }

   return (
     <div className="w-full max-w-2xl mx-auto mt-16 px-4 pb-20 relative z-20">
       <h3 className="font-bebas text-3xl md:text-4xl text-[#DAAF37] text-center mb-8 tracking-wide">
         Mensagens de União
       </h3>

       <form onSubmit={submit} className="relative mb-10">
          <input
             type="text"
             value={text}
             onChange={e => setText(e.target.value)}
             className="w-full bg-[#111] border border-[#6B0D1A]/60 rounded-full py-4 pl-6 pr-16 text-[#E6E6E6] focus:outline-none focus:border-[#DAAF37] transition-all"
             placeholder="Deixe sua mensagem ao adicionar uma faísca..."
             maxLength={120}
          />
          <button
             type="submit"
             disabled={!text.trim()}
             className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-[#6B0D1A] text-[#DAAF37] rounded-full hover:bg-[#4A0711] disabled:opacity-50 disabled:hover:bg-[#6B0D1A] transition-colors cursor-pointer"
          >
            <MessageSquarePlus size={20} />
          </button>
       </form>

       <div className="flex flex-col gap-4">
         <AnimatePresence>
            {messages.map(m => (
               <motion.div
                 key={m.id}
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-[#111]/80 border border-[#222] p-5 rounded-2xl"
               >
                 <p className="text-lg text-[#E6E6E6]/90 font-medium">"{m.text}"</p>
                 <span className="text-[10px] md:text-xs text-[#DAAF37]/60 uppercase tracking-widest mt-3 block font-semibold">
                   {new Date(m.timestamp).toLocaleString('pt-BR')}
                 </span>
               </motion.div>
            ))}
         </AnimatePresence>
       </div>
     </div>
   );
}
