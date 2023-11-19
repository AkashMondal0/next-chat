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

  export type UserHistory = {
    id: string;
    searchUsers: User[];
  }
  
  export type User = {
    id: string;
    name: string;
    imageUrl: string;
    email: string;
    phone: string;
    status: string;
    cloudMessageId: string;
    notification: Notification[];
    conversations: Conversation[];
    userHistory: UserHistory[];
    groups: Group[];
    createdAt: Date;
    updatedAt: Date;
  }
  
  export type Conversation = {
    id: string;
    users: User[];
    createdAt: Date;
    updatedAt: Date;
    lastMessage: string;
    lastMessageTime: Date;
    messages: MessageDirect[];
    type:"DIRECT" | "GROUP";
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
    imageUrl: string;
    Members: Member[];
    users: User[];
    createdAt: Date;
    updatedAt: Date;
    lastMessage: string;
    lastMessageTime: Date;
    messages: GroupMessage[];
    author?: User;
    authorId?: string;
    type:"DIRECT" | "GROUP";
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
    id?: string;
    userId: string;
    messageId?: string;
    message?: GroupMessage;
    createdAt?: Date;
    updatedAt?: Date;
    MessageDirect?: MessageDirect;
    messageDirectId?: string;
    User?: User;
  }
  
  export type GroupMessage = {
    id?: string;
    content: string;
    fileUrl?: string;
    memberId: string;
    groupId: string;
    group?: Group;
    deleted?: boolean;
    seenBy?: GroupSeenBy[];
    createdAt?: Date;
    updatedAt?: Date;
  }

  export type typingState = {
    conversationId?: string,
    groupId?: string,
    senderId?: string,
    receiverId?: string,
    typing: boolean
}

export type login_credential = {
    email: string;
    password: string;
}

export type register_credential = {
    name: string;
    email: string;
    password: string;
    phone?: string;
    imageUrl?: string;
}