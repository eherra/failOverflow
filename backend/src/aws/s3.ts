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

interface IUploadValues {
  file: Express.Multer.File;
  awsFileKey?: string; // only used if updating existing avatar -> using the same existing key
}

export const uploadImageToAWS = ({ file, awsFileKey }: IUploadValues) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams = {
    Bucket: awsBucketName,
    Body: fileStream,
    Key: awsFileKey ? awsFileKey : file.filename,
    ContentType: "image/jpeg",
  };

  /* @ts-expect-error giving error */
  return s3.upload(uploadParams).promise();
};

export const deleteImageFromAws = (awsFileKey: string) => {
  const deleteParams = {
    Bucket: awsBucketName,
    Key: awsFileKey,
  };

  /* @ts-expect-error giving error */
  return s3.deleteObject(deleteParams).promise();
};
