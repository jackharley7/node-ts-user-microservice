// package: conversation
// file: conversation.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as conversation_pb from "./conversation_pb";

interface IConversationServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    createConversation: IConversationServiceService_ICreateConversation;
    getByUserID: IConversationServiceService_IGetByUserID;
    createLink: IConversationServiceService_ICreateLink;
    buildLinkFromURL: IConversationServiceService_IBuildLinkFromURL;
    getInvitationsByUserID: IConversationServiceService_IGetInvitationsByUserID;
}

interface IConversationServiceService_ICreateConversation extends grpc.MethodDefinition<conversation_pb.CreateConversationMessage, conversation_pb.CreateConversationResponse> {
    path: string; // "/conversation.ConversationService/CreateConversation"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<conversation_pb.CreateConversationMessage>;
    requestDeserialize: grpc.deserialize<conversation_pb.CreateConversationMessage>;
    responseSerialize: grpc.serialize<conversation_pb.CreateConversationResponse>;
    responseDeserialize: grpc.deserialize<conversation_pb.CreateConversationResponse>;
}
interface IConversationServiceService_IGetByUserID extends grpc.MethodDefinition<conversation_pb.GetByUserIDMessage, conversation_pb.GetByUserIDResponse> {
    path: string; // "/conversation.ConversationService/GetByUserID"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<conversation_pb.GetByUserIDMessage>;
    requestDeserialize: grpc.deserialize<conversation_pb.GetByUserIDMessage>;
    responseSerialize: grpc.serialize<conversation_pb.GetByUserIDResponse>;
    responseDeserialize: grpc.deserialize<conversation_pb.GetByUserIDResponse>;
}
interface IConversationServiceService_ICreateLink extends grpc.MethodDefinition<conversation_pb.CreateLinkMessage, conversation_pb.CreateLinkResponse> {
    path: string; // "/conversation.ConversationService/CreateLink"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<conversation_pb.CreateLinkMessage>;
    requestDeserialize: grpc.deserialize<conversation_pb.CreateLinkMessage>;
    responseSerialize: grpc.serialize<conversation_pb.CreateLinkResponse>;
    responseDeserialize: grpc.deserialize<conversation_pb.CreateLinkResponse>;
}
interface IConversationServiceService_IBuildLinkFromURL extends grpc.MethodDefinition<conversation_pb.BuildLinkFromURLMessage, conversation_pb.BuildLinkFromURLResponse> {
    path: string; // "/conversation.ConversationService/BuildLinkFromURL"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<conversation_pb.BuildLinkFromURLMessage>;
    requestDeserialize: grpc.deserialize<conversation_pb.BuildLinkFromURLMessage>;
    responseSerialize: grpc.serialize<conversation_pb.BuildLinkFromURLResponse>;
    responseDeserialize: grpc.deserialize<conversation_pb.BuildLinkFromURLResponse>;
}
interface IConversationServiceService_IGetInvitationsByUserID extends grpc.MethodDefinition<conversation_pb.GetInvitationsByUserIDMessage, conversation_pb.GetInvitationsByUserIDResponse> {
    path: string; // "/conversation.ConversationService/GetInvitationsByUserID"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<conversation_pb.GetInvitationsByUserIDMessage>;
    requestDeserialize: grpc.deserialize<conversation_pb.GetInvitationsByUserIDMessage>;
    responseSerialize: grpc.serialize<conversation_pb.GetInvitationsByUserIDResponse>;
    responseDeserialize: grpc.deserialize<conversation_pb.GetInvitationsByUserIDResponse>;
}

export const ConversationServiceService: IConversationServiceService;

export interface IConversationServiceServer {
    createConversation: grpc.handleUnaryCall<conversation_pb.CreateConversationMessage, conversation_pb.CreateConversationResponse>;
    getByUserID: grpc.handleUnaryCall<conversation_pb.GetByUserIDMessage, conversation_pb.GetByUserIDResponse>;
    createLink: grpc.handleUnaryCall<conversation_pb.CreateLinkMessage, conversation_pb.CreateLinkResponse>;
    buildLinkFromURL: grpc.handleUnaryCall<conversation_pb.BuildLinkFromURLMessage, conversation_pb.BuildLinkFromURLResponse>;
    getInvitationsByUserID: grpc.handleUnaryCall<conversation_pb.GetInvitationsByUserIDMessage, conversation_pb.GetInvitationsByUserIDResponse>;
}

export interface IConversationServiceClient {
    createConversation(request: conversation_pb.CreateConversationMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateConversationResponse) => void): grpc.ClientUnaryCall;
    createConversation(request: conversation_pb.CreateConversationMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateConversationResponse) => void): grpc.ClientUnaryCall;
    createConversation(request: conversation_pb.CreateConversationMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateConversationResponse) => void): grpc.ClientUnaryCall;
    getByUserID(request: conversation_pb.GetByUserIDMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetByUserIDResponse) => void): grpc.ClientUnaryCall;
    getByUserID(request: conversation_pb.GetByUserIDMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetByUserIDResponse) => void): grpc.ClientUnaryCall;
    getByUserID(request: conversation_pb.GetByUserIDMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetByUserIDResponse) => void): grpc.ClientUnaryCall;
    createLink(request: conversation_pb.CreateLinkMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateLinkResponse) => void): grpc.ClientUnaryCall;
    createLink(request: conversation_pb.CreateLinkMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateLinkResponse) => void): grpc.ClientUnaryCall;
    createLink(request: conversation_pb.CreateLinkMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateLinkResponse) => void): grpc.ClientUnaryCall;
    buildLinkFromURL(request: conversation_pb.BuildLinkFromURLMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.BuildLinkFromURLResponse) => void): grpc.ClientUnaryCall;
    buildLinkFromURL(request: conversation_pb.BuildLinkFromURLMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.BuildLinkFromURLResponse) => void): grpc.ClientUnaryCall;
    buildLinkFromURL(request: conversation_pb.BuildLinkFromURLMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.BuildLinkFromURLResponse) => void): grpc.ClientUnaryCall;
    getInvitationsByUserID(request: conversation_pb.GetInvitationsByUserIDMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetInvitationsByUserIDResponse) => void): grpc.ClientUnaryCall;
    getInvitationsByUserID(request: conversation_pb.GetInvitationsByUserIDMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetInvitationsByUserIDResponse) => void): grpc.ClientUnaryCall;
    getInvitationsByUserID(request: conversation_pb.GetInvitationsByUserIDMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetInvitationsByUserIDResponse) => void): grpc.ClientUnaryCall;
}

export class ConversationServiceClient extends grpc.Client implements IConversationServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public createConversation(request: conversation_pb.CreateConversationMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateConversationResponse) => void): grpc.ClientUnaryCall;
    public createConversation(request: conversation_pb.CreateConversationMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateConversationResponse) => void): grpc.ClientUnaryCall;
    public createConversation(request: conversation_pb.CreateConversationMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateConversationResponse) => void): grpc.ClientUnaryCall;
    public getByUserID(request: conversation_pb.GetByUserIDMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetByUserIDResponse) => void): grpc.ClientUnaryCall;
    public getByUserID(request: conversation_pb.GetByUserIDMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetByUserIDResponse) => void): grpc.ClientUnaryCall;
    public getByUserID(request: conversation_pb.GetByUserIDMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetByUserIDResponse) => void): grpc.ClientUnaryCall;
    public createLink(request: conversation_pb.CreateLinkMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateLinkResponse) => void): grpc.ClientUnaryCall;
    public createLink(request: conversation_pb.CreateLinkMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateLinkResponse) => void): grpc.ClientUnaryCall;
    public createLink(request: conversation_pb.CreateLinkMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.CreateLinkResponse) => void): grpc.ClientUnaryCall;
    public buildLinkFromURL(request: conversation_pb.BuildLinkFromURLMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.BuildLinkFromURLResponse) => void): grpc.ClientUnaryCall;
    public buildLinkFromURL(request: conversation_pb.BuildLinkFromURLMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.BuildLinkFromURLResponse) => void): grpc.ClientUnaryCall;
    public buildLinkFromURL(request: conversation_pb.BuildLinkFromURLMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.BuildLinkFromURLResponse) => void): grpc.ClientUnaryCall;
    public getInvitationsByUserID(request: conversation_pb.GetInvitationsByUserIDMessage, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetInvitationsByUserIDResponse) => void): grpc.ClientUnaryCall;
    public getInvitationsByUserID(request: conversation_pb.GetInvitationsByUserIDMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetInvitationsByUserIDResponse) => void): grpc.ClientUnaryCall;
    public getInvitationsByUserID(request: conversation_pb.GetInvitationsByUserIDMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: conversation_pb.GetInvitationsByUserIDResponse) => void): grpc.ClientUnaryCall;
}
