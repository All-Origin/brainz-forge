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
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Logo } from "@/components/shared/Logo";

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
     
 <Sidebar className="w-80 ">
  <SidebarHeader className="p-6 border-b border-white/20">
    <div className="flex items-center justify-between">
      
      <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-rose-500 via-pink-500 to-yellow-400 bg-clip-text">
        | Junior Training
      </h2>
      
    </div>

    {/* Divider */}
    <hr className="my-4 border-black/30" />

    {/* New Chat Button */}
    <Button
      onClick={onNewChat}
      className="w-full mb-3 bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white font-medium hover:from-rose-600 hover:via-pink-600 hover:to-yellow-500 shadow-md"
    >
      <PlusCircle className="h-4 w-4 mr-2" />
  <h2 className="text-md  text-transparent bg-white bg-clip-text">New chat</h2>    </Button>


    
  </SidebarHeader>
  
{/* Fixed Search Bar - Ensuring text is black */}
<div className="relative w-48 ml-7"> {/* Added ml-4 for left margin */}
  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
  <Input
    placeholder="Search chats..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="pl-9 text-black border border-gray-300 shadow-sm placeholder-gray-500"
  />
</div>

          <hr className="my-4 border-black/30" />
        
        {/* Chat list */}
        <SidebarContent className="p-4">
          <ScrollArea className="h-full">
            <SidebarMenu>
              <div className="space-y-2">
                {filteredChats.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageCircle className="h-12 w-12 mx-auto mb-4 text-muted-foreground/60" />
                    <p className="text-muted-foreground/90 text-sm">
                      {searchQuery ? "No chats found" : "No training chats yet"}
                    </p>
                    <p className="text-muted-foreground/60 text-xs mt-1">
                      {searchQuery ? "Try a different search term" : "Start a new chat to begin training"}
                    </p>
                  </div>
                ) : (
                  filteredChats.map((chat) => (
                    <SidebarMenuItem key={chat.id} className="mb-1 last:mb-0">
                      <div className="relative group">
                        <SidebarMenuButton
                          onClick={() => onSelectChat(chat)}
                          className={`w-full p-3 rounded-lg transition-all duration-200 pr-10 text-foreground/90 ${
                            activeChat?.id === chat.id
                              ? "bg-gradient-to-br from-rose-500/20 via-pink-500/20 to-yellow-400/20 border border-primary/30 shadow-sm"
                              : "bg-card/60 hover:bg-muted/80 border border-transparent"
                          }`}
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="flex-1 min-w-0 pr-2">
                              <h3 className="font-medium text-sm truncate text-foreground/90">{chat.name}</h3>
                              <div className="flex items-center gap-1 text-xs text-foreground/70 mt-1">
                              </div>
                            </div>
                            <Badge
                              variant="secondary"
                              className="ml-2 bg-primary/20 text-primary text-xs border-primary/30 flex-shrink-0"
                            >
                              {chat.messages.length}
                            </Badge>
                          </div>
                        </SidebarMenuButton>

                        {/* Actions menu */}
                        <Button
                          variant="ghost"
                          size="icon"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-muted"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActionsChatId(chat.id);
                          }}
                        >
                          <MoreVertical className="h-3 w-3 text-foreground/70" />
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

      {/* Actions dialog */}
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