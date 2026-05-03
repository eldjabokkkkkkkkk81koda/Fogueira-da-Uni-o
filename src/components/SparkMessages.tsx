import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageSquarePlus, X } from "lucide-react";

export interface SparkMessage {
  id: string;
  text: string;
  timestamp: number;
}

interface SparkMessagesProps {
  messages: SparkMessage[];
  onAddMessage: (msg: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export function SparkMessages({
  messages,
  onAddMessage,
  isOpen,
  onClose,
}: SparkMessagesProps) {
  const [text, setText] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAddMessage(text);
      setText("");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-[#030303]/80 backdrop-blur-sm z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed right-0 top-0 bottom-0 w-full md:w-[450px] bg-[#0A0A0A] border-l border-[#8C1C2A]/20 shadow-[-10px_0_30px_rgba(140,28,42,0.1)] z-50 flex flex-col will-change-transform"
            initial={{ x: "100%" }}
            animate={{ x: "0%" }}
            exit={{ x: "100%" }}
            transition={{
              type: "tween",
              ease: [0.16, 1, 0.3, 1],
              duration: 0.4,
            }}
          >
            <div className="p-6 border-b border-[#F0F0F0]/5 flex justify-between items-center relative shrink-0 z-20 bg-[#0A0A0A]">
              <h3 className="font-bebas text-2xl text-[#E4BA4B] tracking-[0.1em]">
                Essência da Chama
              </h3>
              <button
                onClick={onClose}
                className="p-2 text-[#F0F0F0]/50 hover:text-[#E4BA4B] hover:bg-[#8C1C2A]/10 rounded-full transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div
              className="flex-1 overflow-y-auto p-6 flex flex-col gap-3"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              <AnimatePresence>
                {messages.map((m) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="px-5 py-4 bg-[#050505] border border-[#8C1C2A]/10 rounded-xl flex flex-col gap-3 group hover:border-[#E4BA4B]/20 transition-colors"
                  >
                    <p className="text-sm text-[#F0F0F0]/80 font-medium leading-relaxed tracking-wide">
                      "{m.text}"
                    </p>
                    <span className="text-[10px] text-[#E4BA4B]/40 uppercase tracking-[0.2em] font-semibold">
                      {new Date(m.timestamp).toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className="p-6 border-t border-[#F0F0F0]/5 bg-[#030303] shrink-0 z-20">
              <form onSubmit={submit} className="relative w-full">
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full bg-[#0A0A0A] border border-[#8C1C2A]/30 rounded-full py-4 pl-6 pr-16 text-[#F0F0F0] text-sm focus:outline-none focus:border-[#E4BA4B]/60 transition-all font-medium"
                  placeholder="Deixe sua mensagem..."
                  maxLength={120}
                />
                <button
                  type="submit"
                  disabled={!text.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-transparent text-[#E4BA4B] rounded-full hover:bg-[#8C1C2A]/20 disabled:opacity-30 transition-colors cursor-pointer"
                >
                  <MessageSquarePlus size={20} />
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
