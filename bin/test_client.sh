#!/bin/bash
# npm install grpc_tools_node_protoc_ts --save-dev

PROTO_IMPORT_DIR="./app/grpcControllers"
GEN_OUT_DIR="./integration_tests/tests/grpc/user/__generated__"

# Create the generated output dir if it doesn't exist
if [ ! -d "$GEN_OUT_DIR" ]; then
  mkdir -p ${GEN_OUT_DIR}
fi

FILE_PATHS='./app/grpcControllers/user.proto'

# Generate JavaScript
grpc_tools_node_protoc \
  --js_out=import_style=commonjs,binary:${GEN_OUT_DIR} \
  --grpc_out=${GEN_OUT_DIR} \
  --plugin=protoc-gen-grpc=$(which grpc_tools_node_protoc_plugin) \
  -I ${PROTO_IMPORT_DIR} \
  ${FILE_PATHS}

# Generate TypeScript definitions
grpc_tools_node_protoc \
  --plugin=protoc-gen-ts=./node_modules/.bin/protoc-gen-ts \
  --ts_out=${GEN_OUT_DIR} \
  -I ${PROTO_IMPORT_DIR} \
  ${FILE_PATHS}
