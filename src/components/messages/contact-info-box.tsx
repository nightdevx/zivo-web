import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Badge } from "../ui/badge";

interface Contact {
  id: string;
  avatar: string;
  name: string;
  initials: string;
  online: boolean;
  time: string;
  lastMessage: string;
  unread: number;
}

interface ContactInfoBoxProps {
  contact: Contact;
  activeChat: string;
  setActiveChat: (id: string) => void;
}

const ContactInfoBox: React.FC<ContactInfoBoxProps> = ({
  contact,
  activeChat,
  setActiveChat,
}) => {
  return (
    <div
      key={contact.id}
      className={`flex items-center gap-3 p-3 cursor-pointer transition-colors ${
        activeChat === contact.id
          ? "bg-accent text-accent-foreground"
          : "hover:bg-muted"
      }`}
      onClick={() => setActiveChat(contact.id)}
    >
      <div className="relative flex-shrink-0">
        <Avatar>
          <AvatarImage src={contact.avatar} alt={contact.name} />
          <AvatarFallback>{contact.initials}</AvatarFallback>
        </Avatar>
        {contact.online && (
          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"></span>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{contact.name}</div>
          <div className="text-xs text-muted-foreground ml-2 flex-shrink-0">
            {contact.time}
          </div>
        </div>
        <div className="text-sm truncate text-muted-foreground">
          {contact.lastMessage}
        </div>
      </div>
      {contact.unread > 0 && (
        <Badge className="ml-1 flex-shrink-0">{contact.unread}</Badge>
      )}
    </div>
  );
};

export default ContactInfoBox;
