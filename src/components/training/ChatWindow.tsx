import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, User, Bot } from "lucide-react";
import { Chat } from "@/pages/Train";
import { formatDistanceToNow } from "date-fns";

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
    <div className="flex flex-col h-full">
      {/* Chat Info Bar */}
      <div className="bg-card/50 border-b border-border/20 p-4">
        <div className="flex flex-col gap-1">
          <h3 className="font-medium">{chat.name}</h3>
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <span><strong>Topic:</strong> {chat.topic}</span>
            <span><strong>Aim:</strong> {chat.aim}</span>
          </div>
          {chat.description && (
            <p className="text-sm text-muted-foreground mt-1">{chat.description}</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {chat.messages.length === 0 ? (
            <div className="text-center py-12">
              <Bot className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">Start Your Training Session</h3>
              <p className="text-muted-foreground">Send a message to begin training your Junior AI.</p>
            </div>
          ) : (
            chat.messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <Avatar className="w-8 h-8 bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400">
                    <AvatarFallback className="bg-transparent text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    msg.role === 'user'
                      ? 'bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white'
                      : 'bg-card border border-border/50'
                  }`}
                >
                  <p className="text-sm">{msg.content}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.role === 'user' ? 'text-white/70' : 'text-muted-foreground'
                    }`}
                  >
                    {formatDistanceToNow(msg.timestamp, { addSuffix: true })}
                  </p>
                </div>

                {msg.role === 'user' && (
                  <Avatar className="w-8 h-8 bg-primary">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-border/20 p-4 bg-card/50">
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