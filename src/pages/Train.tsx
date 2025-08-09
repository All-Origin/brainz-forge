import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TrainingSidebar } from "@/components/training/TrainingSidebar";
import { ChatWindow } from "@/components/training/ChatWindow";
import { ChatEditDialog } from "@/components/training/ChatEditDialog";
import { PlusCircle, Edit3, Menu } from "lucide-react";

export interface Chat {
  id: string;
  name: string;
  topic: string;
  aim: string;
  description: string;
  messages: Array<{
    id: string;
    role: 'user' | 'assistant';
    content: string;
    timestamp: Date;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

export default function Train() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChat, setActiveChat] = useState<Chat | null>(null);
  const [isEditingChat, setIsEditingChat] = useState(false);

  // Load chats from localStorage on mount
  useEffect(() => {
    const savedChats = localStorage.getItem('training-chats');
    if (savedChats) {
      const parsedChats = JSON.parse(savedChats).map((chat: any) => ({
        ...chat,
        createdAt: new Date(chat.createdAt),
        updatedAt: new Date(chat.updatedAt),
        messages: chat.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
      setChats(parsedChats);
      if (parsedChats.length > 0) {
        setActiveChat(parsedChats[0]);
      }
    }
  }, []);

  // Save chats to localStorage whenever chats change
  useEffect(() => {
    if (chats.length > 0) {
      localStorage.setItem('training-chats', JSON.stringify(chats));
    }
  }, [chats]);

  const createNewChat = () => {
    const newChat: Chat = {
      id: Date.now().toString(),
      name: `Training Session ${chats.length + 1}`,
      topic: "General Training",
      aim: "Improve knowledge and understanding",
      description: "A new training session to enhance learning",
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    setChats(prev => [newChat, ...prev]);
    setActiveChat(newChat);
  };

  const updateChat = (chatId: string, updates: Partial<Chat>) => {
    setChats(prev => prev.map(chat => 
      chat.id === chatId 
        ? { ...chat, ...updates, updatedAt: new Date() }
        : chat
    ));
    
    if (activeChat?.id === chatId) {
      setActiveChat(prev => prev ? { ...prev, ...updates, updatedAt: new Date() } : null);
    }
  };

  const sendMessage = (content: string) => {
    if (!activeChat) return;

    const userMessage = {
      id: Date.now().toString(),
      role: 'user' as const,
      content,
      timestamp: new Date()
    };

    // Simulate AI response (commented out API call as requested)
    const aiMessage = {
      id: (Date.now() + 1).toString(),
      role: 'assistant' as const,
      content: `Thank you for your message: "${content}". I'm here to help you train and learn!`,
      timestamp: new Date()
    };

    const updatedMessages = [...activeChat.messages, userMessage, aiMessage];
    updateChat(activeChat.id, { messages: updatedMessages });

    // TODO: Replace with actual API call
    // try {
    //   const response = await fetch('/api/chat', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ chatId: activeChat.id, message: content })
    //   });
    //   const data = await response.json();
    //   // Handle response
    // } catch (error) {
    //   console.error('Error sending message:', error);
    // }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400">
      <SidebarProvider>
        <TrainingSidebar 
          chats={chats}
          activeChat={activeChat}
          onSelectChat={setActiveChat}
          onNewChat={createNewChat}
        />
        
        <div className="flex-1 min-w-0 flex flex-col bg-background/95 backdrop-blur-md ml-0 md:ml-[4rem]">
          {/* Header */}
          <header className="border-b border-border/20 bg-card/80 backdrop-blur-md">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-white bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 hover:from-rose-600 hover:via-pink-600 hover:to-yellow-500" />
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-semibold bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                    {activeChat?.name || "Select a chat to start training"}
                  </h1>
                  {activeChat && (
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => setIsEditingChat(true)}
                      className="h-8 w-8"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
              
              <Button 
                onClick={createNewChat}
                className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white hover:from-rose-600 hover:via-pink-600 hover:to-yellow-500"
              >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Chat
              </Button>
            </div>
          </header>

          {/* Main Content */}
          <div className="flex-1 overflow-hidden">
            {activeChat ? (
              <ChatWindow 
                chat={activeChat}
                onSendMessage={sendMessage}
              />
            ) : (
              <div className="h-full flex items-center justify-center">
                <Card className="max-w-md mx-auto shadow-lg">
                  <CardHeader className="text-center">
                    <CardTitle className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                      Start Training Your Junior
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-muted-foreground mb-4">
                      Create your first training chat to begin improving your Junior's knowledge and capabilities.
                    </p>
                    <Button 
                      onClick={createNewChat}
                      className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white hover:from-rose-600 hover:via-pink-600 hover:to-yellow-500"
                    >
                      <PlusCircle className="h-4 w-4 mr-2" />
                      Create First Chat
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Chat Edit Dialog */}
        {activeChat && (
          <ChatEditDialog
            chat={activeChat}
            open={isEditingChat}
            onOpenChange={setIsEditingChat}
            onSave={(updates) => updateChat(activeChat.id, updates)}
          />
        )}
      </SidebarProvider>
    </div>
  );
}