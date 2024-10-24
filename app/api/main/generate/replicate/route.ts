import Replicate from "replicate";
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';
import { putObject } from '@/libs/aws/s3/put';
import { assertAuthenticated } from "@/libs/assert_authenticated";
import { updatePendingImages } from "@/libs/update_pending_images";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

export async function POST(req: NextRequest) {
  const authenticated = await assertAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const {
    image,
    prompt,
    creativity,
    control_type,
    user_id,
    metadata
  } = await req.json();

  // Convert image from base64 to buffer
  const imageBuffer = Buffer.from(image.split(',')[1], 'base64');

  // Resize the image while maintaining aspect ratio, only if a dimension exceeds 1920
  const resizedImage = await sharp(imageBuffer)
    .resize({
      width: 1920,
      height: 1920,
      fit: sharp.fit.inside,
      withoutEnlargement: true
    })
    .toBuffer();

  const base64Image = resizedImage.toString('base64');

  const input = {
    prompt: prompt,
    control_image: `data:image/png;base64,${base64Image}`,
    guidance_scale: 2.5,
    output_quality: 100,
    steps: 28,
    negative_prompt: "low quality, ugly, distorted, artifacts",
    control_strength: 0.45,
    image_to_image_strength: 1 - (creativity / 100),
    control_type: control_type,
  }
  await updatePendingImages(1);
  const output = await replicate.run("xlabs-ai/flux-dev-controlnet:f2c31c31d81278a91b2447a304dae654c64a5d5a70340fba811bb1cbd41019a2", { input });
  await updatePendingImages(-1);

  const outputUrl = (output as any)[0] as string;
  const response = await fetch(outputUrl);
  const blob = await response.blob();
  const arrayBuffer = await blob.arrayBuffer();
  const base64String = Buffer.from(arrayBuffer).toString('base64');
  const outputImageBase64 = `data:${response.headers.get('content-type') || 'image/png'};base64,${base64String}`;

  const fileName = `${user_id}/${Date.now()}.png`;
  const fileType = response.headers.get('content-type') || 'image/png';
  const success = await putObject(
    fileName,
    fileType,
    outputImageBase64,
    metadata
  );
  if (!success) {
    return NextResponse.json({ error: 'Failed to upload to S3' }, { status: 500 });
  }

  return NextResponse.json({ image: outputImageBase64 }, { status: 200 });
}