import { ObjectId } from 'mongodb';
import {getDb } from '@/lib/db/mongodb';
import { PAGINATION_PAGE_SIZE } from '@/lib/constants/config'; //given to be 6
import { isValidName, isValidItem, isValidStatus } from '@/lib/validation/requests';

export async function getItemRequests(status: string | null, page: number) {
    const db = await getDb();
    const collection = db.collection('requests');

    const filter: Record<string, unknown> = {};
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

    return { 
        success: true,
        data: { 
            requests: data, 
            totalRecords: total 
        } 
    };
}

export async function createNewRequest(body: { requestorName: string; itemRequested: string }) {
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

export async function editStatusRequest(body: { id: string; status: string }) {
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

export async function batchEditStatusRequest(ids: string[], status: string) {
    if (!ids || ids.length === 0 || !isValidStatus(status)) {
        throw new Error('Invalid input');
    }

    const db = await getDb();
    const collection = db.collection('requests');

    const objectIds = ids.map(id => new ObjectId(id));
    const result = await collection.updateMany(
        { _id: { $in: objectIds } },
        { $set: { status: status, lastEditedDate: new Date() } }
    );

    return { 
        success: true, 
        modifiedCount: result.modifiedCount,
        matchedCount: result.matchedCount 
    };
}

export async function batchDeleteRequest(ids: string[]) {
    if (!ids || ids.length === 0) {
        throw new Error('Invalid input');
    }

    const db = await getDb();
    const collection = db.collection('requests');

    const objectIds = ids.map(id => new ObjectId(id));
    const result = await collection.deleteMany({
        _id: { $in: objectIds }
    });

    return { 
        success: true, 
        deletedCount: result.deletedCount 
    };
}

export async function deleteRequest(id: string) {
    const db = await getDb();
    const collection = db.collection('requests');

    const result = await collection.deleteOne({
        _id: new ObjectId(id)
    });

    if (result.deletedCount === 0) {
        throw new Error('Request not found');
    }

    return { success: true };
}
