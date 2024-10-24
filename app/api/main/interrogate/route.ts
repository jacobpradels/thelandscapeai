import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';
import Image from '@/models/Image';
import crypto from 'crypto';
import connectMongo from '@/libs/mongoose';
import { assertAuthenticated } from "@/libs/assert_authenticated";

export async function POST(req: NextRequest) {
  const authenticated = await assertAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  try {
    const { image } = await req.json();

    await connectMongo();

    const hash = crypto.createHash('sha256').update(image).digest("base64");

    const imageResp = await Image.findOne({ hash: hash });
    if (imageResp) {
      return NextResponse.json({ interrogation: imageResp.interrogation }, { status: 200 });
    }

    if (!image) {
      return NextResponse.json({ error: 'No image data provided' }, { status: 400 });
    }

    const replicate = new Replicate();

    const input = {
      image: image,
      task_input: "More Detailed Caption"
    };


    const output = await replicate.run(
      "lucataco/florence-2-large:da53547e17d45b9cfb48174b2f18af8b83ca020fa76db62136bf9c6616762595",
      { input }
    );
    const properJSONOutput = (output as any).text.replaceAll("'", "\"");
    const caption = JSON.parse(properJSONOutput)["<MORE_DETAILED_CAPTION>"];

    const newImage = new Image({ hash: hash, interrogation: caption });
    await newImage.save();

    return NextResponse.json({ caption: caption }, { status: 200 });

  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
