// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var conversation_pb = require('./conversation_pb.js');

function serialize_conversation_BuildLinkFromURLMessage(arg) {
  if (!(arg instanceof conversation_pb.BuildLinkFromURLMessage)) {
    throw new Error('Expected argument of type conversation.BuildLinkFromURLMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_BuildLinkFromURLMessage(buffer_arg) {
  return conversation_pb.BuildLinkFromURLMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_BuildLinkFromURLResponse(arg) {
  if (!(arg instanceof conversation_pb.BuildLinkFromURLResponse)) {
    throw new Error('Expected argument of type conversation.BuildLinkFromURLResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_BuildLinkFromURLResponse(buffer_arg) {
  return conversation_pb.BuildLinkFromURLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_CreateConversationMessage(arg) {
  if (!(arg instanceof conversation_pb.CreateConversationMessage)) {
    throw new Error('Expected argument of type conversation.CreateConversationMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_CreateConversationMessage(buffer_arg) {
  return conversation_pb.CreateConversationMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_CreateConversationResponse(arg) {
  if (!(arg instanceof conversation_pb.CreateConversationResponse)) {
    throw new Error('Expected argument of type conversation.CreateConversationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_CreateConversationResponse(buffer_arg) {
  return conversation_pb.CreateConversationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_CreateLinkMessage(arg) {
  if (!(arg instanceof conversation_pb.CreateLinkMessage)) {
    throw new Error('Expected argument of type conversation.CreateLinkMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_CreateLinkMessage(buffer_arg) {
  return conversation_pb.CreateLinkMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_CreateLinkResponse(arg) {
  if (!(arg instanceof conversation_pb.CreateLinkResponse)) {
    throw new Error('Expected argument of type conversation.CreateLinkResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_CreateLinkResponse(buffer_arg) {
  return conversation_pb.CreateLinkResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_GetByUserIDMessage(arg) {
  if (!(arg instanceof conversation_pb.GetByUserIDMessage)) {
    throw new Error('Expected argument of type conversation.GetByUserIDMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_GetByUserIDMessage(buffer_arg) {
  return conversation_pb.GetByUserIDMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_GetByUserIDResponse(arg) {
  if (!(arg instanceof conversation_pb.GetByUserIDResponse)) {
    throw new Error('Expected argument of type conversation.GetByUserIDResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_GetByUserIDResponse(buffer_arg) {
  return conversation_pb.GetByUserIDResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_GetInvitationsByUserIDMessage(arg) {
  if (!(arg instanceof conversation_pb.GetInvitationsByUserIDMessage)) {
    throw new Error('Expected argument of type conversation.GetInvitationsByUserIDMessage');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_GetInvitationsByUserIDMessage(buffer_arg) {
  return conversation_pb.GetInvitationsByUserIDMessage.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_conversation_GetInvitationsByUserIDResponse(arg) {
  if (!(arg instanceof conversation_pb.GetInvitationsByUserIDResponse)) {
    throw new Error('Expected argument of type conversation.GetInvitationsByUserIDResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_conversation_GetInvitationsByUserIDResponse(buffer_arg) {
  return conversation_pb.GetInvitationsByUserIDResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// SERVICES
var ConversationServiceService = exports.ConversationServiceService = {
  createConversation: {
    path: '/conversation.ConversationService/CreateConversation',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.CreateConversationMessage,
    responseType: conversation_pb.CreateConversationResponse,
    requestSerialize: serialize_conversation_CreateConversationMessage,
    requestDeserialize: deserialize_conversation_CreateConversationMessage,
    responseSerialize: serialize_conversation_CreateConversationResponse,
    responseDeserialize: deserialize_conversation_CreateConversationResponse,
  },
  getByUserID: {
    path: '/conversation.ConversationService/GetByUserID',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.GetByUserIDMessage,
    responseType: conversation_pb.GetByUserIDResponse,
    requestSerialize: serialize_conversation_GetByUserIDMessage,
    requestDeserialize: deserialize_conversation_GetByUserIDMessage,
    responseSerialize: serialize_conversation_GetByUserIDResponse,
    responseDeserialize: deserialize_conversation_GetByUserIDResponse,
  },
  // rpc GetByID(GetByIDMessage) returns (GetByIDResponse);
  createLink: {
    path: '/conversation.ConversationService/CreateLink',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.CreateLinkMessage,
    responseType: conversation_pb.CreateLinkResponse,
    requestSerialize: serialize_conversation_CreateLinkMessage,
    requestDeserialize: deserialize_conversation_CreateLinkMessage,
    responseSerialize: serialize_conversation_CreateLinkResponse,
    responseDeserialize: deserialize_conversation_CreateLinkResponse,
  },
  buildLinkFromURL: {
    path: '/conversation.ConversationService/BuildLinkFromURL',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.BuildLinkFromURLMessage,
    responseType: conversation_pb.BuildLinkFromURLResponse,
    requestSerialize: serialize_conversation_BuildLinkFromURLMessage,
    requestDeserialize: deserialize_conversation_BuildLinkFromURLMessage,
    responseSerialize: serialize_conversation_BuildLinkFromURLResponse,
    responseDeserialize: deserialize_conversation_BuildLinkFromURLResponse,
  },
  getInvitationsByUserID: {
    path: '/conversation.ConversationService/GetInvitationsByUserID',
    requestStream: false,
    responseStream: false,
    requestType: conversation_pb.GetInvitationsByUserIDMessage,
    responseType: conversation_pb.GetInvitationsByUserIDResponse,
    requestSerialize: serialize_conversation_GetInvitationsByUserIDMessage,
    requestDeserialize: deserialize_conversation_GetInvitationsByUserIDMessage,
    responseSerialize: serialize_conversation_GetInvitationsByUserIDResponse,
    responseDeserialize: deserialize_conversation_GetInvitationsByUserIDResponse,
  },
};

exports.ConversationServiceClient = grpc.makeGenericClientConstructor(ConversationServiceService);
