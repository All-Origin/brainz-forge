import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share2, Download, Trash2 } from "lucide-react";
import { Chat } from "@/pages/Train";
import { useToast } from "@/hooks/use-toast";

interface ChatActionsDialogProps {
  chat: Chat;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (chatId: string) => void;
}

export function ChatActionsDialog({ chat, open, onOpenChange, onDelete }: ChatActionsDialogProps) {
  const { toast } = useToast();

  const handleShare = async () => {
    try {
      const shareData = {
        title: `Training Chat: ${chat.name}`,
        text: `Check out this training session about ${chat.topic}`,
        url: window.location.href
      };

      if (navigator.share && navigator.canShare(shareData)) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast({
          title: "Link copied!",
          description: "Training chat link copied to clipboard",
        });
      }
    } catch (error) {
      console.error('Error sharing:', error);
      toast({
        title: "Error",
        description: "Failed to share chat",
        variant: "destructive"
      });
    }
    onOpenChange(false);
  };

  const handleDownload = () => {
    const chatData = {
      name: chat.name,
      topic: chat.topic,
      aim: chat.aim,
      description: chat.description,
      createdAt: chat.createdAt.toISOString(),
      messages: chat.messages.map(msg => ({
        role: msg.role,
        content: msg.content,
        timestamp: msg.timestamp.toISOString()
      }))
    };

    const blob = new Blob([JSON.stringify(chatData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${chat.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_chat.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Chat downloaded!",
      description: "Chat has been saved to your device",
    });
    onOpenChange(false);
  };

  const handleDelete = () => {
    onDelete(chat.id);
    toast({
      title: "Chat deleted",
      description: "Training chat has been removed",
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            Chat Actions
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-3">
          <Button
            onClick={handleShare}
            variant="outline"
            className="w-full justify-start"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share Chat
          </Button>
          
          <Button
            onClick={handleDownload}
            variant="outline"
            className="w-full justify-start"
          >
            <Download className="h-4 w-4 mr-2" />
            Download Chat
          </Button>
          
          <Button
            onClick={handleDelete}
            variant="outline"
            className="w-full justify-start text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Chat
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}