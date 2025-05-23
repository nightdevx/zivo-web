"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import ContactInfoBox from "@/components/messages/contact-info-box";
import ContactBar from "@/components/messages/contact-bar";
import MessageArea from "@/components/messages/message-area";

export const Route = createFileRoute("/dashboard/messages/")({
  component: MessagesPage,
});

function MessagesPage() {
  const [activeChat, setActiveChat] = useState<string | null>("1");
  const [message, setMessage] = useState("");

  const contacts = [
    {
      id: "1",
      name: "Ayşe Yılmaz",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AY",
      lastMessage: "Thank you for confirming my appointment!",
      time: "10:23",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Mehmet Demir",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MD",
      lastMessage: "I need to cancel my appointment for tomorrow.",
      time: "Yesterday",
      unread: 0,
      online: false,
    },
    {
      id: "3",
      name: "Zeynep Kaya",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ZK",
      lastMessage: "Can I get a price for hair coloring?",
      time: "Yesterday",
      unread: 0,
      online: true,
    },
    {
      id: "4",
      name: "Fatma Şahin",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FŞ",
      lastMessage: "Thank you, see you soon!",
      time: "Monday",
      unread: 0,
      online: false,
    },
  ];

  const messages = [
    {
      id: "1",
      messages: [
        {
          id: "m1",
          sender: "client",
          text: "Hello, I would like to book an appointment for tomorrow.",
          time: "09:30",
        },
        {
          id: "m2",
          sender: "staff",
          text: "Hello Ms. Ayşe, what time would you like to come tomorrow?",
          time: "09:35",
        },
        {
          id: "m3",
          sender: "client",
          text: "Would around 2:00 PM work for you?",
          time: "09:40",
        },
        {
          id: "m4",
          sender: "staff",
          text: "Yes, I have scheduled your appointment for 2:00 PM. What service will you be coming for?",
          time: "09:45",
        },
        {
          id: "m5",
          sender: "client",
          text: "I would like a haircut and blow-dry.",
          time: "09:50",
        },
        {
          id: "m6",
          sender: "staff",
          text: "Alright, your appointment is confirmed. See you tomorrow at 2:00 PM!",
          time: "09:55",
        },
        {
          id: "m7",
          sender: "client",
          text: "Thank you for confirming my appointment!",
          time: "10:23",
        },
      ],
    },
    {
      id: "2",
      messages: [
        {
          id: "m1",
          sender: "client",
          text: "Hello, I need to cancel my appointment for tomorrow.",
          time: "Yesterday",
        },
      ],
    },
    {
      id: "3",
      messages: [
        {
          id: "m1",
          sender: "client",
          text: "Can I get a price for hair coloring?",
          time: "Yesterday",
        },
      ],
    },
    {
      id: "4",
      messages: [
        {
          id: "m1",
          sender: "client",
          text: "Thank you, see you soon!",
          time: "Monday",
        },
      ],
    },
  ];

  const activeMessages =
    messages.find((chat) => chat.id === activeChat)?.messages || [];
  const activeContact = contacts.find((contact) => contact.id === activeChat);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    setMessage("");
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold">Messages</h1>
        </div>

        <div className="grid h-[calc(100vh-10rem)] gap-4 md:grid-cols-3 lg:grid-cols-4">
          <Card className="md:col-span-1 flex flex-col h-full">
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="divide-y">
                  {contacts.map((contact) => (
                    <ContactInfoBox
                      key={contact.id}
                      contact={contact}
                      activeChat={activeChat || ""}
                      setActiveChat={setActiveChat}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
            {activeChat ? (
              <>
                <ContactBar activeContact={activeContact} />

                <div className="flex-1 overflow-hidden">
                  <MessageArea activeMessages={activeMessages} />
                </div>

                <div className="p-4 border-t bg-card">
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Type a message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          handleSendMessage();
                        }
                      }}
                      className="flex-1"
                    />
                    <Button onClick={handleSendMessage} size="icon">
                      <Send className="h-4 w-4" />
                      <span className="sr-only">Send</span>
                    </Button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-full">
                <div className="text-center p-4">
                  <h3 className="text-lg font-medium mb-2">
                    Select a conversation
                  </h3>
                  <p className="text-muted-foreground">
                    Choose a contact from the list to start messaging
                  </p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </main>
    </div>
  );
}
