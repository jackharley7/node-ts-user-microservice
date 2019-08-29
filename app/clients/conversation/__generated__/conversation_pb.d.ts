// package: conversation
// file: conversation.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

export class Link extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getTitle(): string;
    setTitle(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;

    getType(): string;
    setType(value: string): void;

    getUrl(): string;
    setUrl(value: string): void;

    getSite(): string;
    setSite(value: string): void;

    getSitename(): string;
    setSitename(value: string): void;

    getImageurl(): string;
    setImageurl(value: string): void;

    getVideourl(): string;
    setVideourl(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Link.AsObject;
    static toObject(includeInstance: boolean, msg: Link): Link.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Link, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Link;
    static deserializeBinaryFromReader(message: Link, reader: jspb.BinaryReader): Link;
}

export namespace Link {
    export type AsObject = {
        id: number,
        title: string,
        description: string,
        type: string,
        url: string,
        site: string,
        sitename: string,
        imageurl: string,
        videourl: string,
    }
}

export class User extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getName(): string;
    setName(value: string): void;

    getUsername(): string;
    setUsername(value: string): void;

    getAvatar(): string;
    setAvatar(value: string): void;

    getTwitterhandle(): string;
    setTwitterhandle(value: string): void;

    getTwitterverified(): boolean;
    setTwitterverified(value: boolean): void;

    getIstwitteraccount(): boolean;
    setIstwitteraccount(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): User.AsObject;
    static toObject(includeInstance: boolean, msg: User): User.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: User, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): User;
    static deserializeBinaryFromReader(message: User, reader: jspb.BinaryReader): User;
}

export namespace User {
    export type AsObject = {
        id: number,
        name: string,
        username: string,
        avatar: string,
        twitterhandle: string,
        twitterverified: boolean,
        istwitteraccount: boolean,
    }
}

export class ConversationEntry extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getCreatedAt(): string;
    setCreatedAt(value: string): void;

    getContent(): string;
    setContent(value: string): void;

    getUserId(): number;
    setUserId(value: number): void;

    getConversationId(): number;
    setConversationId(value: number): void;

    clearLinksList(): void;
    getLinksList(): Array<Link>;
    setLinksList(value: Array<Link>): void;
    addLinks(value?: Link, index?: number): Link;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ConversationEntry.AsObject;
    static toObject(includeInstance: boolean, msg: ConversationEntry): ConversationEntry.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ConversationEntry, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ConversationEntry;
    static deserializeBinaryFromReader(message: ConversationEntry, reader: jspb.BinaryReader): ConversationEntry;
}

export namespace ConversationEntry {
    export type AsObject = {
        id: number,
        createdAt: string,
        content: string,
        userId: number,
        conversationId: number,
        linksList: Array<Link.AsObject>,
    }
}

export class Conversation extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getTitle(): string;
    setTitle(value: string): void;

    getDescription(): string;
    setDescription(value: string): void;

    clearUsersList(): void;
    getUsersList(): Array<User>;
    setUsersList(value: Array<User>): void;
    addUsers(value?: User, index?: number): User;


    hasLink(): boolean;
    clearLink(): void;
    getLink(): Link | undefined;
    setLink(value?: Link): void;

    clearEntriesList(): void;
    getEntriesList(): Array<ConversationEntry>;
    setEntriesList(value: Array<ConversationEntry>): void;
    addEntries(value?: ConversationEntry, index?: number): ConversationEntry;

    getAccepted(): boolean;
    setAccepted(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Conversation.AsObject;
    static toObject(includeInstance: boolean, msg: Conversation): Conversation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Conversation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Conversation;
    static deserializeBinaryFromReader(message: Conversation, reader: jspb.BinaryReader): Conversation;
}

export namespace Conversation {
    export type AsObject = {
        id: number,
        title: string,
        description: string,
        usersList: Array<User.AsObject>,
        link?: Link.AsObject,
        entriesList: Array<ConversationEntry.AsObject>,
        accepted: boolean,
    }
}

export class Invitation extends jspb.Message { 
    getId(): number;
    setId(value: number): void;

    getUserId(): number;
    setUserId(value: number): void;

    getTwitterScreenname(): string;
    setTwitterScreenname(value: string): void;

    getName(): string;
    setName(value: string): void;

    getAvatar(): string;
    setAvatar(value: string): void;


    hasConversation(): boolean;
    clearConversation(): void;
    getConversation(): Conversation | undefined;
    setConversation(value?: Conversation): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Invitation.AsObject;
    static toObject(includeInstance: boolean, msg: Invitation): Invitation.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Invitation, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Invitation;
    static deserializeBinaryFromReader(message: Invitation, reader: jspb.BinaryReader): Invitation;
}

export namespace Invitation {
    export type AsObject = {
        id: number,
        userId: number,
        twitterScreenname: string,
        name: string,
        avatar: string,
        conversation?: Conversation.AsObject,
    }
}

export class CreateLinkMessage extends jspb.Message { 

    hasLink(): boolean;
    clearLink(): void;
    getLink(): Link | undefined;
    setLink(value?: Link): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateLinkMessage.AsObject;
    static toObject(includeInstance: boolean, msg: CreateLinkMessage): CreateLinkMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateLinkMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateLinkMessage;
    static deserializeBinaryFromReader(message: CreateLinkMessage, reader: jspb.BinaryReader): CreateLinkMessage;
}

export namespace CreateLinkMessage {
    export type AsObject = {
        link?: Link.AsObject,
    }
}

export class CreateLinkResponse extends jspb.Message { 

    hasLink(): boolean;
    clearLink(): void;
    getLink(): Link | undefined;
    setLink(value?: Link): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateLinkResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateLinkResponse): CreateLinkResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateLinkResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateLinkResponse;
    static deserializeBinaryFromReader(message: CreateLinkResponse, reader: jspb.BinaryReader): CreateLinkResponse;
}

export namespace CreateLinkResponse {
    export type AsObject = {
        link?: Link.AsObject,
    }
}

export class BuildLinkFromURLMessage extends jspb.Message { 
    getUrl(): string;
    setUrl(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildLinkFromURLMessage.AsObject;
    static toObject(includeInstance: boolean, msg: BuildLinkFromURLMessage): BuildLinkFromURLMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildLinkFromURLMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildLinkFromURLMessage;
    static deserializeBinaryFromReader(message: BuildLinkFromURLMessage, reader: jspb.BinaryReader): BuildLinkFromURLMessage;
}

export namespace BuildLinkFromURLMessage {
    export type AsObject = {
        url: string,
    }
}

export class BuildLinkFromURLResponse extends jspb.Message { 

    hasLink(): boolean;
    clearLink(): void;
    getLink(): Link | undefined;
    setLink(value?: Link): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BuildLinkFromURLResponse.AsObject;
    static toObject(includeInstance: boolean, msg: BuildLinkFromURLResponse): BuildLinkFromURLResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: BuildLinkFromURLResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): BuildLinkFromURLResponse;
    static deserializeBinaryFromReader(message: BuildLinkFromURLResponse, reader: jspb.BinaryReader): BuildLinkFromURLResponse;
}

export namespace BuildLinkFromURLResponse {
    export type AsObject = {
        link?: Link.AsObject,
    }
}

export class CreateConversationMessage extends jspb.Message { 

    hasConversation(): boolean;
    clearConversation(): void;
    getConversation(): Conversation | undefined;
    setConversation(value?: Conversation): void;


    hasInvitation(): boolean;
    clearInvitation(): void;
    getInvitation(): Invitation | undefined;
    setInvitation(value?: Invitation): void;

    getInvitetwitteruser(): boolean;
    setInvitetwitteruser(value: boolean): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateConversationMessage.AsObject;
    static toObject(includeInstance: boolean, msg: CreateConversationMessage): CreateConversationMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateConversationMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateConversationMessage;
    static deserializeBinaryFromReader(message: CreateConversationMessage, reader: jspb.BinaryReader): CreateConversationMessage;
}

export namespace CreateConversationMessage {
    export type AsObject = {
        conversation?: Conversation.AsObject,
        invitation?: Invitation.AsObject,
        invitetwitteruser: boolean,
    }
}

export class CreateConversationResponse extends jspb.Message { 

    hasConversation(): boolean;
    clearConversation(): void;
    getConversation(): Conversation | undefined;
    setConversation(value?: Conversation): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateConversationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateConversationResponse): CreateConversationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateConversationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateConversationResponse;
    static deserializeBinaryFromReader(message: CreateConversationResponse, reader: jspb.BinaryReader): CreateConversationResponse;
}

export namespace CreateConversationResponse {
    export type AsObject = {
        conversation?: Conversation.AsObject,
    }
}

export class GetByUserIDMessage extends jspb.Message { 
    getUserId(): number;
    setUserId(value: number): void;

    getPage(): number;
    setPage(value: number): void;

    getLimit(): number;
    setLimit(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByUserIDMessage.AsObject;
    static toObject(includeInstance: boolean, msg: GetByUserIDMessage): GetByUserIDMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByUserIDMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByUserIDMessage;
    static deserializeBinaryFromReader(message: GetByUserIDMessage, reader: jspb.BinaryReader): GetByUserIDMessage;
}

export namespace GetByUserIDMessage {
    export type AsObject = {
        userId: number,
        page: number,
        limit: number,
    }
}

export class GetByUserIDResponse extends jspb.Message { 
    clearConversationlistList(): void;
    getConversationlistList(): Array<Conversation>;
    setConversationlistList(value: Array<Conversation>): void;
    addConversationlist(value?: Conversation, index?: number): Conversation;

    getPage(): number;
    setPage(value: number): void;

    getLimit(): number;
    setLimit(value: number): void;

    getCount(): number;
    setCount(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByUserIDResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetByUserIDResponse): GetByUserIDResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByUserIDResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByUserIDResponse;
    static deserializeBinaryFromReader(message: GetByUserIDResponse, reader: jspb.BinaryReader): GetByUserIDResponse;
}

export namespace GetByUserIDResponse {
    export type AsObject = {
        conversationlistList: Array<Conversation.AsObject>,
        page: number,
        limit: number,
        count: number,
    }
}

export class GetInvitationsByUserIDMessage extends jspb.Message { 
    getUserId(): number;
    setUserId(value: number): void;

    getPage(): number;
    setPage(value: number): void;

    getLimit(): number;
    setLimit(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetInvitationsByUserIDMessage.AsObject;
    static toObject(includeInstance: boolean, msg: GetInvitationsByUserIDMessage): GetInvitationsByUserIDMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetInvitationsByUserIDMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetInvitationsByUserIDMessage;
    static deserializeBinaryFromReader(message: GetInvitationsByUserIDMessage, reader: jspb.BinaryReader): GetInvitationsByUserIDMessage;
}

export namespace GetInvitationsByUserIDMessage {
    export type AsObject = {
        userId: number,
        page: number,
        limit: number,
    }
}

export class GetInvitationsByUserIDResponse extends jspb.Message { 
    clearInvitationlistList(): void;
    getInvitationlistList(): Array<Invitation>;
    setInvitationlistList(value: Array<Invitation>): void;
    addInvitationlist(value?: Invitation, index?: number): Invitation;

    getPage(): number;
    setPage(value: number): void;

    getLimit(): number;
    setLimit(value: number): void;

    getCount(): number;
    setCount(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetInvitationsByUserIDResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetInvitationsByUserIDResponse): GetInvitationsByUserIDResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetInvitationsByUserIDResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetInvitationsByUserIDResponse;
    static deserializeBinaryFromReader(message: GetInvitationsByUserIDResponse, reader: jspb.BinaryReader): GetInvitationsByUserIDResponse;
}

export namespace GetInvitationsByUserIDResponse {
    export type AsObject = {
        invitationlistList: Array<Invitation.AsObject>,
        page: number,
        limit: number,
        count: number,
    }
}

export class GetByIDMessage extends jspb.Message { 
    getConversationId(): number;
    setConversationId(value: number): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByIDMessage.AsObject;
    static toObject(includeInstance: boolean, msg: GetByIDMessage): GetByIDMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByIDMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByIDMessage;
    static deserializeBinaryFromReader(message: GetByIDMessage, reader: jspb.BinaryReader): GetByIDMessage;
}

export namespace GetByIDMessage {
    export type AsObject = {
        conversationId: number,
    }
}

export class GetByIDResponse extends jspb.Message { 

    hasConversation(): boolean;
    clearConversation(): void;
    getConversation(): Conversation | undefined;
    setConversation(value?: Conversation): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetByIDResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetByIDResponse): GetByIDResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetByIDResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetByIDResponse;
    static deserializeBinaryFromReader(message: GetByIDResponse, reader: jspb.BinaryReader): GetByIDResponse;
}

export namespace GetByIDResponse {
    export type AsObject = {
        conversation?: Conversation.AsObject,
    }
}
