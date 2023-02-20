import S3 from "aws-sdk/clients/s3";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const awsBucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

export const uploadImageToAWS = (file: any) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: awsBucketName,
    Body: fileStream,
    Key: file.filename,
  };

  /* @ts-expect-error giving error */
  return s3.upload(uploadParams).promise();
};