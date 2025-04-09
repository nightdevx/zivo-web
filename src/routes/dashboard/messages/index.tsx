"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Send } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

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
      lastMessage: "Randevumu onayladığınız için teşekkürler!",
      time: "10:23",
      unread: 2,
      online: true,
    },
    {
      id: "2",
      name: "Mehmet Demir",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "MD",
      lastMessage: "Yarınki randevumu iptal etmem gerekiyor.",
      time: "Dün",
      unread: 0,
      online: false,
    },
    {
      id: "3",
      name: "Zeynep Kaya",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "ZK",
      lastMessage: "Saç boyama için fiyat alabilir miyim?",
      time: "Dün",
      unread: 0,
      online: true,
    },
    {
      id: "4",
      name: "Fatma Şahin",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "FŞ",
      lastMessage: "Teşekkür ederim, görüşmek üzere!",
      time: "Pazartesi",
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
          text: "Merhaba, yarın için bir randevu almak istiyorum.",
          time: "09:30",
        },
        {
          id: "m2",
          sender: "staff",
          text: "Merhaba Ayşe Hanım, yarın saat kaçta gelmek istersiniz?",
          time: "09:35",
        },
        {
          id: "m3",
          sender: "client",
          text: "Öğleden sonra 14:00 civarı uygun olur mu?",
          time: "09:40",
        },
        {
          id: "m4",
          sender: "staff",
          text: "Evet, 14:00 için randevunuzu oluşturdum. Hangi hizmet için geleceksiniz?",
          time: "09:45",
        },
        {
          id: "m5",
          sender: "client",
          text: "Saç kesimi ve fön çektirmek istiyorum.",
          time: "09:50",
        },
        {
          id: "m6",
          sender: "staff",
          text: "Tamam, randevunuz oluşturuldu. Yarın saat 14:00'te görüşmek üzere!",
          time: "09:55",
        },
        {
          id: "m7",
          sender: "client",
          text: "Randevumu onayladığınız için teşekkürler!",
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
          text: "Merhaba, yarınki randevumu iptal etmem gerekiyor.",
          time: "Dün",
        },
      ],
    },
    {
      id: "3",
      messages: [
        {
          id: "m1",
          sender: "client",
          text: "Saç boyama için fiyat alabilir miyim?",
          time: "Dün",
        },
      ],
    },
    {
      id: "4",
      messages: [
        {
          id: "m1",
          sender: "client",
          text: "Teşekkür ederim, görüşmek üzere!",
          time: "Pazartesi",
        },
      ],
    },
  ];

  const activeMessages =
    messages.find((chat) => chat.id === activeChat)?.messages || [];
  const activeContact = contacts.find((contact) => contact.id === activeChat);

  const handleSendMessage = () => {
    if (message.trim() === "") return;
    // In a real app, you would send the message to the server
    // and update the messages state
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
            <div className="p-4 border-b bg-card">
              <Tabs defaultValue="all">
                <TabsList className="w-full">
                  <TabsTrigger value="all" className="flex-1">
                    All
                  </TabsTrigger>
                  <TabsTrigger value="unread" className="flex-1">
                    Unread
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full">
                <div className="divide-y">
                  {contacts.map((contact) => (
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
                          <AvatarImage
                            src={contact.avatar}
                            alt={contact.name}
                          />
                          <AvatarFallback>{contact.initials}</AvatarFallback>
                        </Avatar>
                        {contact.online && (
                          <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full bg-green-500 ring-1 ring-background"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div className="font-medium truncate">
                            {contact.name}
                          </div>
                          <div className="text-xs text-muted-foreground ml-2 flex-shrink-0">
                            {contact.time}
                          </div>
                        </div>
                        <div className="text-sm truncate text-muted-foreground">
                          {contact.lastMessage}
                        </div>
                      </div>
                      {contact.unread > 0 && (
                        <Badge className="ml-1 flex-shrink-0">
                          {contact.unread}
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Card>

          <Card className="md:col-span-2 lg:col-span-3 flex flex-col h-full">
            {activeChat ? (
              <>
                <div className="p-4 border-b bg-card">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src={activeContact?.avatar}
                        alt={activeContact?.name}
                      />
                      <AvatarFallback>{activeContact?.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{activeContact?.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {activeContact?.online ? "Online" : "Offline"}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-hidden">
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
