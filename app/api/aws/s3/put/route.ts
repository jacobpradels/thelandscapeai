import { NextResponse } from 'next/server';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

export async function POST(request: Request) {
  try {
    console.log("Uploading to S3");
    const { fileName, fileType, base64Image } = await request.json();

    // Decode base64 image
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
    });

    await s3Client.send(command);

    console.log("Uploaded to S3");

    return NextResponse.json({ status: "success" });
  } catch (error) {
    console.error('Error uploading to S3:', error);
    return NextResponse.json({ error: 'Failed to upload to S3' }, { status: 500 });
  }
}
