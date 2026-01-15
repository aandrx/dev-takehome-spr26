import { NextRequest, NextResponse } from 'next/server';
import { getItemRequests, createNewRequest, editStatusRequest } from '@/server/requests';

export async function GET(request: NextRequest) {
    try {
        const status = request.nextUrl.searchParams.get('status');
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1');

        const result = await getItemRequests(status, page);
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await createNewRequest(body);
        return NextResponse.json(result, { status: 201 });
    } catch (error: any) {
        if (error.message === 'Invalid input') {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await editStatusRequest(body);
        return NextResponse.json(result, { status: 200 });
    } catch (error: any) {
        if (error.message === 'Invalid input' || error.message === 'Request not found') {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

