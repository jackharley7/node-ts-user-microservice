import * as protoLoader from '@grpc/proto-loader';
import * as grpc from 'grpc';
import UserController from './grpcControllers/user.grpc.controller';

export default () => {
  const packageDefinition = protoLoader.loadSync('./app/grpcControllers/user.proto');
  const packageObject: any = grpc.loadPackageDefinition(packageDefinition);
  const server = new grpc.Server();

  server.addService(packageObject.users.UserService.service, UserController);

  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());

  server.start();
  console.log('grpc server running on port:', '0.0.0.0:50051');
};
