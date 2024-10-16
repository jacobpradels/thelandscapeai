import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const ONE_MONTH_IN_MS = 1000 * 60 * 60 * 24 * 30;

export const putObject = async (
  fileName: string,
  fileType: string,
  base64Image: string,
  expiration: Date = new Date(Date.now() + ONE_MONTH_IN_MS),
  metadata: Record<string, string> = {}
) => {
  try {
    const buffer = Buffer.from(base64Image.split(',')[1], 'base64');

    const s3Client = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: fileName,
      ContentType: fileType,
      Body: buffer,
      Expires: expiration,
      Metadata: metadata,
    });

    await s3Client.send(command);

    console.log("Uploaded to S3");

    return true;
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return false;
  }
}
