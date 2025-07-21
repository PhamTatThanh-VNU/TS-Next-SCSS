import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const DEEZER_API_URL = 'https://api.deezer.com';

export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());

    const endpoint = `${DEEZER_API_URL}/${searchParams.path}`;
    delete searchParams.path;
    
    const response = await axios.get(endpoint, {
      params: searchParams,
    });

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Deezer API error:', error);
    
    return NextResponse.json(
      { error: 'Failed to fetch data from Deezer' },
      { status: 500 }
    );
  }
}
