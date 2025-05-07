import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MessageAreaProps {
  activeMessages: {
    id: string;
    sender: string;
    text: string;
    time: string;
  }[];
}

const MessageArea: React.FC<MessageAreaProps> = ({ activeMessages }) => {
  return (
    <ScrollArea className="h-full p-4">
      <div className="space-y-4">
        {activeMessages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "client" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                msg.sender === "client"
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary text-primary-foreground"
              }`}
            >
              <div>{msg.text}</div>
              <div
                className={`text-xs mt-1 ${
                  msg.sender === "client"
                    ? "text-muted-foreground/70"
                    : "text-primary-foreground/80"
                }`}
              >
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export default MessageArea;
