import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ActiveContact {
  avatar?: string;
  name?: string;
  initials?: string;
  online?: boolean;
}

interface ContactBarProps {
  activeContact?: ActiveContact;
}

const ContactBar: React.FC<ContactBarProps> = ({ activeContact }) => {
  return (
    <div className="p-4 border-b bg-card">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8">
          {activeContact?.avatar ? (
            <AvatarImage src={activeContact.avatar} alt={activeContact.name} />
          ) : (
            <AvatarFallback>{activeContact?.initials}</AvatarFallback>
          )}
        </Avatar>
        <div>
          <div className="font-medium">{activeContact?.name}</div>
          <div className="text-xs text-muted-foreground">
            {activeContact?.online ? "Online" : "Offline"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactBar;
