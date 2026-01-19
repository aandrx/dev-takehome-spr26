import { NextRequest, NextResponse } from 'next/server';
import { getItemRequests, createNewRequest, editStatusRequest, batchEditStatusRequest, deleteRequest, batchDeleteRequest } from '@/server/requests';

export async function GET(request: NextRequest) {
    try {
        const status = request.nextUrl.searchParams.get('status');
        const page = parseInt(request.nextUrl.searchParams.get('page') || '1');

        const result = await getItemRequests(status, page);
        return NextResponse.json(result, { status: 200 });
    } catch {
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const body = await request.json();
        const result = await createNewRequest(body);
        return NextResponse.json(result, { status: 201 });
    } catch (error: unknown) {
        if (error instanceof Error && error.message === 'Invalid input') {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const body = await request.json();
        
        // Check if this is a batch update (ids array) or single update (id string)
        if (body.ids && Array.isArray(body.ids)) {
            const result = await batchEditStatusRequest(body.ids, body.status);
            return NextResponse.json(result, { status: 200 });
        } else {
            const result = await editStatusRequest(body);
            return NextResponse.json(result, { status: 200 });
        }
    } catch (error: unknown) {
        if (error instanceof Error && (error.message === 'Invalid input' || error.message === 'Request not found')) {
            return NextResponse.json({ error: error.message }, { status: 400 });
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');
        const idsParam = url.searchParams.get('ids');
        
        //handle batch delete
        if (idsParam) {
            const ids = idsParam.split(',');
            const result = await batchDeleteRequest(ids);
            return NextResponse.json(result, { status: 200 });
        }
        
        //handle single delete
        if (!id) {
            return NextResponse.json({ error: 'ID or IDs required' }, { status: 400 });
        }

        const result = await deleteRequest(id);
        return NextResponse.json(result, { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error && error.message === 'Request not found') {
            return NextResponse.json({ error: error.message }, { status: 404 });
        }
        return NextResponse.json({ error: 'Server error' }, { status: 500 });
    }
}
