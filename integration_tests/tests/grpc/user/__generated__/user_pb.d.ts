// package: users
// file: user.proto

/* tslint:disable */

import * as jspb from "google-protobuf";

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

    getTimezone(): string;
    setTimezone(value: string): void;


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
        timezone: string,
    }
}

export class GetUserByTwitterScreenNameMessage extends jspb.Message { 
    getScreenname(): string;
    setScreenname(value: string): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserByTwitterScreenNameMessage.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserByTwitterScreenNameMessage): GetUserByTwitterScreenNameMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserByTwitterScreenNameMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserByTwitterScreenNameMessage;
    static deserializeBinaryFromReader(message: GetUserByTwitterScreenNameMessage, reader: jspb.BinaryReader): GetUserByTwitterScreenNameMessage;
}

export namespace GetUserByTwitterScreenNameMessage {
    export type AsObject = {
        screenname: string,
    }
}

export class GetUserByTwitterScreenNameResponse extends jspb.Message { 

    hasUser(): boolean;
    clearUser(): void;
    getUser(): User | undefined;
    setUser(value?: User): void;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUserByTwitterScreenNameResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUserByTwitterScreenNameResponse): GetUserByTwitterScreenNameResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUserByTwitterScreenNameResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUserByTwitterScreenNameResponse;
    static deserializeBinaryFromReader(message: GetUserByTwitterScreenNameResponse, reader: jspb.BinaryReader): GetUserByTwitterScreenNameResponse;
}

export namespace GetUserByTwitterScreenNameResponse {
    export type AsObject = {
        user?: User.AsObject,
    }
}

export class GetUsersByIdsMessage extends jspb.Message { 
    clearUseridsList(): void;
    getUseridsList(): Array<number>;
    setUseridsList(value: Array<number>): void;
    addUserids(value: number, index?: number): number;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUsersByIdsMessage.AsObject;
    static toObject(includeInstance: boolean, msg: GetUsersByIdsMessage): GetUsersByIdsMessage.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUsersByIdsMessage, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUsersByIdsMessage;
    static deserializeBinaryFromReader(message: GetUsersByIdsMessage, reader: jspb.BinaryReader): GetUsersByIdsMessage;
}

export namespace GetUsersByIdsMessage {
    export type AsObject = {
        useridsList: Array<number>,
    }
}

export class GetUsersByIdsResponse extends jspb.Message { 
    clearUsersList(): void;
    getUsersList(): Array<User>;
    setUsersList(value: Array<User>): void;
    addUsers(value?: User, index?: number): User;


    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetUsersByIdsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetUsersByIdsResponse): GetUsersByIdsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetUsersByIdsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetUsersByIdsResponse;
    static deserializeBinaryFromReader(message: GetUsersByIdsResponse, reader: jspb.BinaryReader): GetUsersByIdsResponse;
}

export namespace GetUsersByIdsResponse {
    export type AsObject = {
        usersList: Array<User.AsObject>,
    }
}
