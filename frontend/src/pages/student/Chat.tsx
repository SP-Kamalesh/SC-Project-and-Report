
import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { Send, PaperclipIcon, Clock } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

// Mock chat conversations
const conversations = [
  /*{
    id: "chat1",
    counselorId: "c1",
    counselorName: "Dr. Sarah Johnson",
    lastMessage: "How are you feeling today?",
    lastMessageTime: "10:30 AM",
    unread: true,
  },
  {
    id: "chat2",
    counselorId: "c2",
    counselorName: "Dr. Michael Chen",
    lastMessage: "Let's continue our discussion about your career plans.",
    lastMessageTime: "Yesterday",
    unread: false,
  },
  {
    id: "chat3",
    counselorId: "c3",
    counselorName: "Dr. Emily Rodriguez",
    lastMessage: "I've shared some resources on mindfulness you might find helpful.",
    lastMessageTime: "Apr 15",
    unread: false,
  },*/
];

// Mock message history for a selected conversation
const messageHistory = [
  /*{
    id: "msg1",
    senderId: "c1",
    senderName: "Dr. Sarah Johnson",
    content: "Hello! How can I help you today?",
    timestamp: "10:15 AM",
    isCounselor: true,
  },
  {
    id: "msg2",
    senderId: "user",
    senderName: "You",
    content: "I've been feeling overwhelmed with my coursework lately.",
    timestamp: "10:18 AM",
    isCounselor: false,
  },
  {
    id: "msg3",
    senderId: "c1",
    senderName: "Dr. Sarah Johnson",
    content: "I understand. That's quite common, especially during midterms. Could you tell me more about what's making you feel overwhelmed?",
    timestamp: "10:20 AM",
    isCounselor: true,
  },
  {
    id: "msg4",
    senderId: "user",
    senderName: "You",
    content: "I have three major projects due next week, and I'm also preparing for exams. I'm having trouble sleeping and feeling anxious most of the time.",
    timestamp: "10:25 AM",
    isCounselor: false,
  },
  {
    id: "msg5",
    senderId: "c1",
    senderName: "Dr. Sarah Johnson",
    content: "That's a lot to handle at once. Let's talk about some strategies to manage your workload and reduce anxiety. How are you currently organizing your tasks?",
    timestamp: "10:30 AM",
    isCounselor: true,
  },*/
];

const ChatPage = () => {
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const [activeChat, setActiveChat] = React.useState<string | null>(null);
  const [activeCounselor, setActiveCounselor] = React.useState<any>(null);
  const [messages, setMessages] = React.useState<any[]>([]);
  const [newMessage, setNewMessage] = React.useState("");
  const messageEndRef = React.useRef<HTMLDivElement>(null);
  const [showConversations, setShowConversations] = React.useState(!isMobile);

  // Initialize with first conversation on desktop
  React.useEffect(() => {
    if (!isMobile && conversations.length > 0 && !activeChat) {
      handleSelectChat(conversations[0].id, conversations[0]);
    }
    
    setShowConversations(!isMobile);
  }, [isMobile]);

  // Scroll to bottom of messages
  React.useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSelectChat = (chatId: string, counselor: any) => {
    setActiveChat(chatId);
    setActiveCounselor(counselor);
    setMessages(messageHistory);
    setShowConversations(isMobile ? false : true);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim()) return;
    
    const newMsg = {
      id: `msg${Date.now()}`,
      senderId: "user",
      senderName: "You",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isCounselor: false,
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage("");
    
    // Simulate counselor response
    setTimeout(() => {
      const responseMsg = {
        id: `msg${Date.now() + 1}`,
        senderId: activeCounselor.counselorId,
        senderName: activeCounselor.counselorName,
        content: "Thank you for sharing that. I'll respond to your message soon.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCounselor: true,
      };
      
      setMessages((prevMessages) => [...prevMessages, responseMsg]);
    }, 1500);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Chat</h1>
        <p className="text-muted-foreground">
          Secure messaging with your counselors
        </p>
      </div>

      <div className="h-[calc(100vh-240px)] flex border rounded-lg overflow-hidden">
        {/* Conversations List */}
        {showConversations && (
          <div className="w-full md:w-80 border-r">
            <div className="p-4 border-b">
              <h2 className="font-semibold">Messages</h2>
            </div>
            <ScrollArea className="h-[calc(100%-61px)]">
              <div className="py-2">
                {conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`px-4 py-3 hover:bg-muted/50 cursor-pointer ${
                      activeChat === conversation.id ? "bg-muted" : ""
                    }`}
                    onClick={() => handleSelectChat(conversation.id, conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar>
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {conversation.counselorName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <h3 className="font-medium text-sm truncate">
                            {conversation.counselorName}
                          </h3>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">
                            {conversation.lastMessageTime}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground truncate">
                          {conversation.lastMessage}
                        </p>
                      </div>
                      {conversation.unread && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2"></div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </div>
        )}

        {/* Chat Window */}
        {!activeChat && !isMobile && (
          <div className="flex-1 flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <Clock className="h-12 w-12 text-muted-foreground mb-4 mx-auto" />
              <h3 className="text-lg font-medium mb-2">Select a conversation</h3>
              <p className="text-muted-foreground max-w-md px-4">
                Choose a counselor from the list to view your conversation history
              </p>
            </div>
          </div>
        )}

        {/* Mobile: No Chat Selected View */}
        {!activeChat && isMobile && (
          <div className="flex-1 flex items-center justify-center bg-muted/30">
            <div className="text-center">
              <Clock className="h-12 w-12 text-muted-foreground mb-4 mx-auto" />
              <h3 className="text-lg font-medium mb-2">Your Messages</h3>
              <p className="text-muted-foreground max-w-md px-4 mb-4">
                Connect with your counselors through secure messaging
              </p>
              <div className="space-y-4 px-4">
                {conversations.map((conversation) => (
                  <Card key={conversation.id} className="text-left">
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <Avatar>
                          <AvatarFallback className="bg-primary text-primary-foreground">
                            {conversation.counselorName.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex justify-between items-center">
                            <h3 className="font-medium">
                              {conversation.counselorName}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {conversation.lastMessageTime}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground line-clamp-1 mt-1">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                      <Button 
                        className="w-full mt-3"
                        onClick={() => handleSelectChat(conversation.id, conversation)}
                      >
                        Continue Chat
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeChat && (
          <div className="flex-1 flex flex-col h-full">
            {/* Chat Header */}
            <div className="p-4 border-b flex justify-between items-center">
              <div className="flex items-center gap-3">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setShowConversations(true)}
                  >
                    Back
                  </Button>
                )}
                <Avatar>
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {activeCounselor?.counselorName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{activeCounselor?.counselorName}</h3>
                  <p className="text-xs text-muted-foreground">Online now</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${
                      message.isCounselor ? "justify-start" : "justify-end"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        message.isCounselor
                          ? "bg-muted"
                          : "bg-primary text-primary-foreground"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs mt-1 opacity-70">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  className="flex-shrink-0"
                  onClick={() => 
                    toast({
                      title: "Feature coming soon",
                      description: "File uploads will be available in a future update.",
                    })
                  }
                >
                  <PaperclipIcon className="h-5 w-5" />
                </Button>
                <Input
                  type="text"
                  placeholder="Type your message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                />
                <Button type="submit" size="icon" className="flex-shrink-0">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
