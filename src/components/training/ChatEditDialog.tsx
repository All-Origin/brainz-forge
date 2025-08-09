import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Chat } from "@/pages/Train";

interface ChatEditDialogProps {
  chat: Chat;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (updates: Partial<Chat>) => void;
}

export function ChatEditDialog({ chat, open, onOpenChange, onSave }: ChatEditDialogProps) {
  const [formData, setFormData] = useState({
    name: chat.name,
    topic: chat.topic,
    aim: chat.aim,
    description: chat.description
  });

  const handleSave = () => {
    onSave(formData);
    onOpenChange(false);
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
            Edit Training Chat
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Chat Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="Enter chat name..."
            />
          </div>
          
          <div>
            <Label htmlFor="topic">Main Topic</Label>
            <Input
              id="topic"
              value={formData.topic}
              onChange={(e) => handleChange('topic', e.target.value)}
              placeholder="What is this chat about?"
            />
          </div>
          
          <div>
            <Label htmlFor="aim">Training Aim</Label>
            <Input
              id="aim"
              value={formData.aim}
              onChange={(e) => handleChange('aim', e.target.value)}
              placeholder="What do you want to achieve?"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="Additional details about this training session..."
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-br from-rose-500 via-pink-500 to-yellow-400 text-white hover:from-rose-600 hover:via-pink-600 hover:to-yellow-500"
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}