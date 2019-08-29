// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_pb = require('./user_pb.js');

function serialize_users_GetUserByTwitterScreenNameMessage(arg) {
  if (!(arg instanceof user_pb.GetUserByTwitterScreenNameMessage)) {
    throw new Error('Expected argument of type users.GetUserByTwitterScreenNameMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetUserByTwitterScreenNameMessage(buffer_arg) {
  return user_pb.GetUserByTwitterScreenNameMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetUserByTwitterScreenNameResponse(arg) {
  if (!(arg instanceof user_pb.GetUserByTwitterScreenNameResponse)) {
    throw new Error('Expected argument of type users.GetUserByTwitterScreenNameResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetUserByTwitterScreenNameResponse(buffer_arg) {
  return user_pb.GetUserByTwitterScreenNameResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetUsersByIdsMessage(arg) {
  if (!(arg instanceof user_pb.GetUsersByIdsMessage)) {
    throw new Error('Expected argument of type users.GetUsersByIdsMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetUsersByIdsMessage(buffer_arg) {
  return user_pb.GetUsersByIdsMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_users_GetUsersByIdsResponse(arg) {
  if (!(arg instanceof user_pb.GetUsersByIdsResponse)) {
    throw new Error('Expected argument of type users.GetUsersByIdsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_users_GetUsersByIdsResponse(buffer_arg) {
  return user_pb.GetUsersByIdsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserServiceService = exports.UserServiceService = {
  getUserByTwitterScreenName: {
    path: '/users.UserService/GetUserByTwitterScreenName',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetUserByTwitterScreenNameMessage,
    responseType: user_pb.GetUserByTwitterScreenNameResponse,
    requestSerialize: serialize_users_GetUserByTwitterScreenNameMessage,
    requestDeserialize: deserialize_users_GetUserByTwitterScreenNameMessage,
    responseSerialize: serialize_users_GetUserByTwitterScreenNameResponse,
    responseDeserialize: deserialize_users_GetUserByTwitterScreenNameResponse,
  },
  getUsersByIds: {
    path: '/users.UserService/GetUsersByIds',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetUsersByIdsMessage,
    responseType: user_pb.GetUsersByIdsResponse,
    requestSerialize: serialize_users_GetUsersByIdsMessage,
    requestDeserialize: deserialize_users_GetUsersByIdsMessage,
    responseSerialize: serialize_users_GetUsersByIdsResponse,
    responseDeserialize: deserialize_users_GetUsersByIdsResponse,
  },
};

exports.UserServiceClient = grpc.makeGenericClientConstructor(UserServiceService);
