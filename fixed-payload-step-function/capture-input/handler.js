const AWS = require('aws-sdk')
const s3 = new AWS.S3();
const payloadFolder = 'temp-sf-payload'
const Bucket = process.env.BUCKET_NAME;

exports.handler = async ({number = 10, chunk = 1}) => {

  const data = paginate(number, chunk)

  const path = `${payloadFolder}/${Date.now()}.json`

  const res = await s3.putObject({
    Bucket,
    Key: path,
    Body: JSON.stringify(data)
  }).promise()

  console.log('Saved output: ', {Bucket, path})

  return {bucket: Bucket, path}
}

function paginate(number, chunk){
  const result = [];
  const numPages = Math.ceil(number / chunk);
  for (let i = 0; i < numPages; i++) {
    result.push({
      from: i * chunk,
      to: Math.min((i + 1) * chunk, number),
    });
  }

  return result;
}
