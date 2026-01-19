require('dotenv').config({ path: '.env.local', override: true });
const { MongoClient } = require('mongodb');

const sampleRequests = [
  { requestorName: 'Alice Johnson', itemRequested: 'Water bottles', status: 'pending' },
  { requestorName: 'Bob Smith', itemRequested: 'First aid kits', status: 'approved' },
  { requestorName: 'Carol Davis', itemRequested: 'Blankets', status: 'completed' },
  { requestorName: 'David Wilson', itemRequested: 'Canned food', status: 'pending' },
  { requestorName: 'Emma Brown', itemRequested: 'Flashlights', status: 'rejected' },
  { requestorName: 'Frank Miller', itemRequested: 'Batteries', status: 'approved' },
  { requestorName: 'Grace Lee', itemRequested: 'Baby formula', status: 'pending' },
  { requestorName: 'Henry Taylor', itemRequested: 'Sleeping bags', status: 'completed' },
  { requestorName: 'Isabel Martinez', itemRequested: 'Medical supplies', status: 'pending' },
  { requestorName: 'Jack Anderson', itemRequested: 'Portable generators', status: 'approved' },
  { requestorName: 'Karen White', itemRequested: 'Hygiene kits', status: 'pending' },
  { requestorName: 'Leo Harris', itemRequested: 'Non-perishable meals', status: 'pending' },
];

async function populateDatabase() {
  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('crisis-corner');
    const collection = db.collection('requests');
    
    // Clear existing data
    const deleteResult = await collection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} existing documents`);
    
    // Insert sample data with timestamps
    const now = new Date();
    const documentsToInsert = sampleRequests.map((req, index) => ({
      ...req,
      requestCreatedDate: new Date(now.getTime() - (index * 3600000)), // Each request 1 hour apart
      lastEditedDate: new Date(now.getTime() - (index * 3600000)),
    }));
    
    const result = await collection.insertMany(documentsToInsert);
    console.log(`Successfully inserted ${result.insertedCount} sample requests`);
    
    // Show summary
    const counts = await Promise.all([
      collection.countDocuments({ status: 'pending' }),
      collection.countDocuments({ status: 'approved' }),
      collection.countDocuments({ status: 'completed' }),
      collection.countDocuments({ status: 'rejected' }),
    ]);
    
    console.log('\nDatabase Summary:');
    console.log(`  Pending: ${counts[0]}`);
    console.log(`  Approved: ${counts[1]}`);
    console.log(`  Completed: ${counts[2]}`);
    console.log(`  Rejected: ${counts[3]}`);
    console.log(`  Total: ${counts[0] + counts[1] + counts[2] + counts[3]}`);
    
  } catch (error) {
    console.error('Error populating database:', error.message);
    process.exit(1);
  } finally {
    await client.close();
    console.log('\nDatabase connection closed');
  }
}

populateDatabase();
