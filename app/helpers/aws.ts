import config from '../config/configuration';
import * as aws from 'aws-sdk';

const {
  accessKeyId,
  secretAccessKey,
  region,
} = config.aws;

aws.config.update({
  accessKeyId,
  secretAccessKey,
  region,
});

export default aws;
