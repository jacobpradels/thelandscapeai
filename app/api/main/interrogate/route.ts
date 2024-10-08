import { NextRequest, NextResponse } from 'next/server';
import Replicate from 'replicate';

export const config = {
  runtime: 'edge',
};

export async function POST(req: NextRequest) {
  try {
    const { image } = await req.json();

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
    const properJSONOutput = output.text.replaceAll("'", "\"");
    const caption = JSON.parse(properJSONOutput)["<MORE_DETAILED_CAPTION>"];
    return NextResponse.json({ caption: caption }, { status: 200 });

  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
