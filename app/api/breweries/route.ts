import { BreweryList } from '@/types/interface';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const state = searchParams.get('state');

     // Return empty array if no state provided
     if (!state || state.trim() === '') {
        return NextResponse.json([]);
      }

    if (!state) {
      return NextResponse.json(
        { error: 'State parameter is required' },
        { status: 400 }
      );
    }

    const url = `${process.env.API_BASE_URL}?by_state=${encodeURIComponent(state)}`;
    
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json(
        { error: `Failed to fetch breweries. Status: ${response.status}` },
        { status: response.status }
      );
    }

    const breweries: BreweryList = await response.json();

    return NextResponse.json(breweries);
  } catch (error) {
    console.error('Error fetching breweries:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}