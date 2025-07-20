import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const DEEZER_API_URL = 'https://api.deezer.com';

export async function GET(request: NextRequest) {
  try {
    // Lấy query parameters từ URL
    const url = new URL(request.url);
    const searchParams = Object.fromEntries(url.searchParams.entries());

    // Tạo endpoint cho request tới Deezer API
    const endpoint = `${DEEZER_API_URL}/${searchParams.path}`;
    delete searchParams.path;
    // Gọi API của Deezer
    const response = await axios.get(endpoint, {
      params: searchParams,
    });

    // Trả về kết quả
    return NextResponse.json(response.data);
  } catch (error: any) {
    console.error('Deezer API error:', error);
    
    // Trả về lỗi
    return NextResponse.json(
      { error: error.message || 'Failed to fetch data from Deezer' },
      { status: error.response?.status || 500 }
    );
  }
}
