import { useState, useEffect, useRef } from "react";
import { Send, Brain, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Bot } from "lucide-react";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export function JuniorChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hi there! I'm your Junior AI companion. I'm excited to chat with you and help you learn! What would you like to explore today? 🌸",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");

  // Ref for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "That's a great question! Let me think about that... 🤔 I'm still learning and growing with you, so this is exciting for both of us! 🌺",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`flex items-start gap-3 max-w-[80%] ${
                message.isUser ? "flex-row-reverse" : ""
              }`}
            >
              <Avatar
                className={`h-8 w-8 ${
                  message.isUser ? "bg-gradient-mint" : "bg-gradient-rose"
                }`}
              >
                <AvatarFallback className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white text-md">
                  {message.isUser ? <User className="h-4 w-4" /> : "Jr."}
                </AvatarFallback>
              </Avatar>

              <Card
                className={`p-4 shadow-soft border-border/50 max-w-[75%] break-words whitespace-pre-wrap
                ${
                  message.isUser
                    ? "bg-mint/10 border-mint/20"
                    : "bg-rose/10 border-rose/20"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </Card>
            </div>
          </div>
        ))}
        {/* This is the auto-scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-6 border-t border-border/50 bg-card/80 backdrop-blur-md">
        <div className="flex gap-3">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Junior anything... 🌼"
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            className="flex-1 border-rose/20 focus:border-rose"
          />
          <Button
            onClick={handleSend}
            variant="rose"
            size="icon"
            disabled={!input.trim()}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Junior learns from our conversations and grows smarter with you and
          Your DNA! 🌱
        </p>
      </div>
    </div>
  );
}
