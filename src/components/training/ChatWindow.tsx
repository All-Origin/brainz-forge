import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, Bot } from "lucide-react";
import { Chat } from "@/pages/Train";
import { Card } from "@/components/ui/card";

interface ChatWindowProps {
  chat: Chat;
  onSendMessage: (content: string) => void;
}

export function ChatWindow({ chat, onSendMessage }: ChatWindowProps) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat.messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  return (
    // ⬇ Main wrapper — you can add a background here if you want the entire chat to have a color
    <div className="flex flex-col h-full bg-card/80"> 
      {/* bg-card/80 → controls overall background (from Tailwind theme) */}

      {/* Chat messages area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {chat.messages.length === 0 ? (
          <div className="text-center py-12">
            <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium mb-2">
              Start Your Training Session
            </h3>
            <p className="text-muted-foreground">
              Send a message to begin training your Junior AI.
            </p>
          </div>
        ) : (
          chat.messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex items-start gap-3 ${
                msg.role === "user" ? "flex-row-reverse ml-auto" : ""
              } max-w-[80%]`} // ← max width for avatar + bubble
            >
              <Avatar className="w-8 h-8 bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400">
                <AvatarFallback className="bg-transparent text-white">
                  {msg.role === "user" ? <User className="h-4 w-4" /> : "Jr."}
                </AvatarFallback>
              </Avatar>

              <Card
                className={`p-4 shadow-soft border-border/50 break-words whitespace-pre-wrap max-w-[75%]
                  ${
                    msg.role === "user"
                      ? "bg-mint/10 border-mint/20"
                      : "bg-rose/10 border-rose/20"
                  }`}
                // ↑ bg-mint/10 and bg-rose/10 control message bubble background colors
              >
                <p className="text-sm leading-relaxed">{msg.content}</p>
                <span className="text-xs text-muted-foreground mt-2 block">
                  {msg.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </Card>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input section */}
      <div
        className="border-t border-border/20 p-4 bg-card/50"
        // bg-card/50 → controls background color of the input area
      >
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your training message..."
            className="flex-1"
          />
          <Button
            type="submit"
            disabled={!message.trim()}
            className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white hover:from-rose-600 hover:via-pink-600 hover:to-yellow-500"
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
