import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import appConfig from '@/config';

export const config = {
  runtime: 'edge',
};

export async function POST(req: NextRequest) {
  try {
    const { image, prompt } = await req.json();
    const data = {
      input: {
        input_image_base_64: image.replace(/^data:image\/\w+;base64,/, ''),
        prompt: prompt,
        // use_low_res: true,
        use_canny: true,
      }
    }
    const response = await axios.post(
      `https://api.runpod.ai/v2/${appConfig.runpod_id}/run`, data, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer 1S0BMKC4M87AFFGOFW0PZGEIMMAS9HJLBAT6ZZW5",
      },
    });
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    console.error('Error processing image:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
