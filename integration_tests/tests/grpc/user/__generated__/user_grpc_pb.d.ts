// package: users
// file: user.proto

/* tslint:disable */

import * as grpc from "grpc";
import * as user_pb from "./user_pb";

interface IUserServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    getUserByTwitterScreenName: IUserServiceService_IGetUserByTwitterScreenName;
    getUsersByIds: IUserServiceService_IGetUsersByIds;
}

interface IUserServiceService_IGetUserByTwitterScreenName extends grpc.MethodDefinition<user_pb.GetUserByTwitterScreenNameMessage, user_pb.GetUserByTwitterScreenNameResponse> {
    path: string; // "/users.UserService/GetUserByTwitterScreenName"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.GetUserByTwitterScreenNameMessage>;
    requestDeserialize: grpc.deserialize<user_pb.GetUserByTwitterScreenNameMessage>;
    responseSerialize: grpc.serialize<user_pb.GetUserByTwitterScreenNameResponse>;
    responseDeserialize: grpc.deserialize<user_pb.GetUserByTwitterScreenNameResponse>;
}
interface IUserServiceService_IGetUsersByIds extends grpc.MethodDefinition<user_pb.GetUsersByIdsMessage, user_pb.GetUsersByIdsResponse> {
    path: string; // "/users.UserService/GetUsersByIds"
    requestStream: boolean; // false
    responseStream: boolean; // false
    requestSerialize: grpc.serialize<user_pb.GetUsersByIdsMessage>;
    requestDeserialize: grpc.deserialize<user_pb.GetUsersByIdsMessage>;
    responseSerialize: grpc.serialize<user_pb.GetUsersByIdsResponse>;
    responseDeserialize: grpc.deserialize<user_pb.GetUsersByIdsResponse>;
}

export const UserServiceService: IUserServiceService;

export interface IUserServiceServer {
    getUserByTwitterScreenName: grpc.handleUnaryCall<user_pb.GetUserByTwitterScreenNameMessage, user_pb.GetUserByTwitterScreenNameResponse>;
    getUsersByIds: grpc.handleUnaryCall<user_pb.GetUsersByIdsMessage, user_pb.GetUsersByIdsResponse>;
}

export interface IUserServiceClient {
    getUserByTwitterScreenName(request: user_pb.GetUserByTwitterScreenNameMessage, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserByTwitterScreenNameResponse) => void): grpc.ClientUnaryCall;
    getUserByTwitterScreenName(request: user_pb.GetUserByTwitterScreenNameMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserByTwitterScreenNameResponse) => void): grpc.ClientUnaryCall;
    getUserByTwitterScreenName(request: user_pb.GetUserByTwitterScreenNameMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserByTwitterScreenNameResponse) => void): grpc.ClientUnaryCall;
    getUsersByIds(request: user_pb.GetUsersByIdsMessage, callback: (error: grpc.ServiceError | null, response: user_pb.GetUsersByIdsResponse) => void): grpc.ClientUnaryCall;
    getUsersByIds(request: user_pb.GetUsersByIdsMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetUsersByIdsResponse) => void): grpc.ClientUnaryCall;
    getUsersByIds(request: user_pb.GetUsersByIdsMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetUsersByIdsResponse) => void): grpc.ClientUnaryCall;
}

export class UserServiceClient extends grpc.Client implements IUserServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public getUserByTwitterScreenName(request: user_pb.GetUserByTwitterScreenNameMessage, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserByTwitterScreenNameResponse) => void): grpc.ClientUnaryCall;
    public getUserByTwitterScreenName(request: user_pb.GetUserByTwitterScreenNameMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserByTwitterScreenNameResponse) => void): grpc.ClientUnaryCall;
    public getUserByTwitterScreenName(request: user_pb.GetUserByTwitterScreenNameMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetUserByTwitterScreenNameResponse) => void): grpc.ClientUnaryCall;
    public getUsersByIds(request: user_pb.GetUsersByIdsMessage, callback: (error: grpc.ServiceError | null, response: user_pb.GetUsersByIdsResponse) => void): grpc.ClientUnaryCall;
    public getUsersByIds(request: user_pb.GetUsersByIdsMessage, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: user_pb.GetUsersByIdsResponse) => void): grpc.ClientUnaryCall;
    public getUsersByIds(request: user_pb.GetUsersByIdsMessage, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: user_pb.GetUsersByIdsResponse) => void): grpc.ClientUnaryCall;
}
