import { ObjectId } from 'mongodb';
import {getDb } from '@/lib/db/mongodb';
import { PAGINATION_PAGE_SIZE } from '@/lib/constants/config'; //given to be 6
import { isValidName, isValidItem, isValidStatus } from '@/lib/validation/requests';

export async function getItemRequests(status: string | null, page: number) {
    const db = await getDb();
    const collection = db.collection('requests');

    const filter: any = {};
    if (status && isValidStatus(status)) {
        filter.status = status;
    }
    //pagination formula 
    const skip = (page - 1) * PAGINATION_PAGE_SIZE;

    const data = await collection 
        .find(filter)
        .sort({ requestCreatedDate: -1 })
        .skip(skip)
        .limit(PAGINATION_PAGE_SIZE)
        .toArray();
    
    const total = await collection.countDocuments(filter);

    return { data, total };
}

export async function createNewRequest(body: any) {
    if (!isValidName(body.requestorName) || !isValidItem(body.itemRequested)) {
        throw new Error('Invalid input');
    }

    const db = await getDb();
    const collection = db.collection('requests');

    const now = new Date();
    const newRequest = {
        requestorName: body.requestorName,
        itemRequested: body.itemRequested,
        requestCreatedDate: now,
        lastEditedDate: now,
        status: 'pending',
    };

    const result = await collection.insertOne(newRequest);

    return { ...newRequest, _id: result.insertedId.toString() };
}

export async function editStatusRequest(body: any) {
    if (!body.id || !isValidStatus(body.status)) {
        throw new Error('Invalid input');
    }

    const db = await getDb();
    const collection = db.collection('requests');

    const result = await collection.findOneAndUpdate(
        { _id: new ObjectId(body.id) },
        { $set: { status: body.status, lastEditedDate: new Date() } },
        { returnDocument: 'after' }
    );

    if (!result) {
        throw new Error('Request not found');
    }

    return result;
}
