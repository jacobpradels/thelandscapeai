import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';

export const inspectObject = async (
  fileName: string,
) => {
  try {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new HeadObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
    });

    const response = await s3Client.send(command);

    return response;
  } catch (error) {
    console.error('Error getting object from S3:', error);
    return false;
  }
}
