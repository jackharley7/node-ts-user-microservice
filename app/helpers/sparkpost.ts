import * as SparkPost from 'sparkpost';
import config from './../config/configuration';

const client = new SparkPost(config.sparkpost.apiKey);

export const send = (
  targetAddress: string,
  templateId: string,
  data: {},
) => {
  try {
    return client.transmissions.send({
      options: {
        sandbox: false,
      },
      content: {
        template_id: templateId,
      },
      substitution_data: data,
      recipients: [
        { address: 'jackharley7@gmail.com' },
      ],
    });
  } catch (err) {
    console.log('ERROR', err);
  }
};
