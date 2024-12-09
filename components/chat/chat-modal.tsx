"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Send } from "lucide-react";
import { toast } from "react-hot-toast";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  propertyId: string;
  agentId: string;
}

export function ChatModal({ isOpen, onClose, propertyId, agentId }: ChatModalProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.error("Veuillez entrer un message");
      return;
    }

    setIsSending(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/messages/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          content: message,
          receiverId: agentId,
          propertyId: propertyId,
        }),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      setMessage("");
      onClose();
      toast.success("Message envoyé avec succès");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Erreur lors de l'envoi du message");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Envoyer un message à l&apos;agent</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Votre message concernant cette propriété..."
            className="min-h-[100px]"
          />
          <div className="flex justify-end">
            <Button onClick={handleSendMessage} disabled={isSending}>
              <Send className="w-4 h-4 mr-2" />
              {isSending ? "Envoi..." : "Envoyer"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 