export type search_data_user = {
    id: string;
    name: string;
    email: string;
    imageUrl?: string;
}

export type Notification = {
    id: string;
    userId: string;
    user: User;
    title: string;
    body: string;
    read: boolean;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type User = {
    id: string;
    userId: string;
    name: string;
    imageUrl: string;
    email: string;
    phone: string;
    status: string;
    notification: Notification[];
    conversations: Conversation[];
    groups: Group[];
    createdAt: Date;
    updatedAt: Date;
    SeenBy: SeenBy[];
    GroupSeenBy: GroupSeenBy[];
  }
  
  export type Conversation = {
    id: string;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
    lastMessage: string;
    lastMessageTime: Date;
    messages: MessageDirect[];
  }
  
  export type SeenBy = {
    id: string;
    user: User;
    userId: string;
    message: MessageDirect;
    messageId: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type MessageDirect = {
    id?: string;
    content: string;
    fileUrl?: string;
    conversationId: string;
    memberId: string;
    deleted?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
    seenBy?: SeenBy[];
  }
  
  export type Group = {
    id: string;
    name: string;
    Members: Member[];
    createdAt: Date;
    updatedAt: Date;
    lastMessage: string;
    lastMessageTime: Date;
    messages: Message[];
    author?: User;
    authorId?: string;
  }
  
  enum MemberRole {
    ADMIN = "ADMIN",
    COADMIN = "COADMIN",
    MEMBER = "MEMBER",
  }
  
  export type Member = {
    id: string;
    role: MemberRole;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    groupId: string;
    group: Group;
  }
  
  export type GroupSeenBy = {
    id: string;
    userId: string;
    messageId: string;
    message: Message;
    createdAt: Date;
    updatedAt: Date;
    MessageDirect?: MessageDirect;
    messageDirectId?: string;
    User: User;
  }
  
  export type Message = {
    id: string;
    content: string;
    fileUrl?: string;
    memberId: string;
    groupId: string;
    group: Group;
    deleted: boolean;
    seenBy: GroupSeenBy[];
    createdAt: Date;
    updatedAt: Date;
  }

  export type typingState = {
    conversationId?: string,
    senderId?: string,
    receiverId?: string,
    typing: boolean
}