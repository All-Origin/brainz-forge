import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, MessageCircle, Clock } from "lucide-react";
import { Chat } from "@/pages/Train";
import { formatDistanceToNow } from "date-fns";

interface TrainingSidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
}

export function TrainingSidebar({ chats, activeChat, onSelectChat, onNewChat }: TrainingSidebarProps) {
  return (
    <Sidebar className="w-80 bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white border-r border-white/20">
      <SidebarHeader className="p-6 border-b border-white/20">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Junior Training</h2>
        </div>
        <Button 
          onClick={onNewChat}
          className="mt-4 w-full bg-white/20 hover:bg-white/30 text-white border border-white/30"
          variant="outline"
        >
          <PlusCircle className="h-4 w-4 mr-2" />
          New Chat
        </Button>
      </SidebarHeader>

      <SidebarContent className="p-4">
        <ScrollArea className="h-full">
          <SidebarMenu>
            <div className="space-y-3">
              {chats.length === 0 ? (
                <div className="text-center py-8">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-white/60" />
                  <p className="text-white/80 text-sm">No training chats yet</p>
                  <p className="text-white/60 text-xs mt-1">Start a new chat to begin training</p>
                </div>
              ) : (
                chats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton 
                      onClick={() => onSelectChat(chat)}
                      className={`w-full p-4 rounded-lg transition-all duration-200 ${
                        activeChat?.id === chat.id 
                          ? "bg-white/30 text-white shadow-lg" 
                          : "bg-white/10 hover:bg-white/20 text-white/90"
                      }`}
                    >
                      <div className="flex flex-col items-start space-y-2 w-full">
                        <div className="flex items-center justify-between w-full">
                          <h3 className="font-medium text-sm truncate flex-1">{chat.name}</h3>
                          <Badge 
                            variant="secondary" 
                            className="bg-white/20 text-white text-xs border-white/30"
                          >
                            {chat.messages.length}
                          </Badge>
                        </div>
                        
                        <p className="text-xs text-white/70 truncate w-full">{chat.topic}</p>
                        
                        <div className="flex items-center gap-1 text-xs text-white/60">
                          <Clock className="h-3 w-3" />
                          {formatDistanceToNow(chat.updatedAt, { addSuffix: true })}
                        </div>
                        
                        {chat.messages.length > 0 && (
                          <p className="text-xs text-white/60 truncate w-full">
                            {chat.messages[chat.messages.length - 1]?.content || "No messages yet"}
                          </p>
                        )}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))
              )}
            </div>
          </SidebarMenu>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
}