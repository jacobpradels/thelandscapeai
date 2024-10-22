import { S3Client, ListObjectsV2Command } from '@aws-sdk/client-s3';

export const listObjects = async (
  user_id: string
) => {
  try {
    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new ListObjectsV2Command({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Prefix: user_id,
    });

    const response = await s3Client.send(command);

    return response.Contents ?? [];
  } catch (error) {
    console.error('Error listing objects in S3:', error);
    return [];
  }
}
