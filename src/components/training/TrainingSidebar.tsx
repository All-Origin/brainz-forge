import { Sidebar, SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { PlusCircle, MessageCircle, Clock, MoreVertical, Search } from "lucide-react";
import { Chat } from "@/pages/Train";
import { formatDistanceToNow } from "date-fns";
import { ChatActionsDialog } from "./ChatActionsDialog";
import { useState } from "react";

interface TrainingSidebarProps {
  chats: Chat[];
  activeChat: Chat | null;
  onSelectChat: (chat: Chat) => void;
  onNewChat: () => void;
  onDeleteChat: (chatId: string) => void;
}

export function TrainingSidebar({ chats, activeChat, onSelectChat, onNewChat, onDeleteChat }: TrainingSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [actionsChatId, setActionsChatId] = useState<string | null>(null);

  const filteredChats = chats.filter(chat => 
    chat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const actionsChat = chats.find(chat => chat.id === actionsChatId);

  return (
    <>
      <Sidebar className="w-80 bg-card/95 backdrop-blur-md border-r border-border/30 shadow-lg">
        <SidebarHeader className="p-4 border-b border-border/30 bg-gradient-to-br from-rose-500/10 via-pink-500/10 to-yellow-400/10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
              Junior Training
            </h2>
          </div>
          
          {/* New Chat Button */}
          <Button 
            onClick={onNewChat}
            className="w-full mb-3 bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white hover:from-rose-600 hover:via-pink-600 hover:to-yellow-500 shadow-md"
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            New Chat
          </Button>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search chats..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-background/60 border-border/50 focus:border-primary/50"
            />
          </div>
        </SidebarHeader>

        <SidebarContent className="p-4">
          <ScrollArea className="h-full">
            <SidebarMenu>
              <div className="space-y-2">
                {filteredChats.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
                    <p className="text-muted-foreground text-sm">
                      {searchQuery ? "No chats found" : "No training chats yet"}
                    </p>
                    <p className="text-muted-foreground/60 text-xs mt-1">
                      {searchQuery ? "Try a different search term" : "Start a new chat to begin training"}
                    </p>
                  </div>
                ) : (
                  filteredChats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <div className="relative group">
                        <SidebarMenuButton 
                          onClick={() => onSelectChat(chat)}
                          className={`w-full p-3 rounded-lg transition-all duration-200 pr-10 ${
                            activeChat?.id === chat.id 
                              ? "bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-yellow-400/20 text-foreground border border-primary/30 shadow-sm" 
                              : "bg-card/60 hover:bg-muted/80 text-foreground/80 hover:text-foreground border border-transparent"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium text-sm truncate">{chat.name}</h3>
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <Clock className="h-3 w-3" />
                                {formatDistanceToNow(chat.updatedAt, { addSuffix: true })}
                              </div>
                            </div>
                            <Badge 
                              variant="secondary" 
                              className="ml-2 bg-primary/20 text-primary text-xs border-primary/30"
                            >
                              {chat.messages.length}
                            </Badge>
                          </div>
                        </SidebarMenuButton>
                        
                        {/* Three dots menu */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionsChatId(chat.id);
                          }}
                        >
                          <MoreVertical className="h-3 w-3" />
                        </Button>
                      </div>
                    </SidebarMenuItem>
                  ))
                )}
              </div>
            </SidebarMenu>
          </ScrollArea>
        </SidebarContent>
      </Sidebar>

      {/* Chat Actions Dialog */}
      {actionsChat && (
        <ChatActionsDialog
          chat={actionsChat}
          open={actionsChatId !== null}
          onOpenChange={(open) => !open && setActionsChatId(null)}
          onDelete={onDeleteChat}
        />
      )}
    </>
  );
}