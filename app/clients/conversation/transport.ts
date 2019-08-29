import * as grpc from 'grpc';

import {
  ConversationServiceClient,
} from './__generated__/conversation_grpc_pb';
import {
  BuildLinkFromURLMessage,
} from './__generated__/conversation_pb';

export const BuildLinkFromUrl = (url: string) => {
  const client = new ConversationServiceClient('conversation-service:50051', grpc.credentials.createInsecure());

  const urlMessage = new BuildLinkFromURLMessage();
  urlMessage.setUrl(url);

  return new Promise((resolve, reject) => {
    client.buildLinkFromURL(urlMessage, (err: grpc.ServiceError | null, res) => {
      client.close();
      if (err) {
        reject(err);
        return;
      }
      resolve(res.toObject());
    });
  });
};
