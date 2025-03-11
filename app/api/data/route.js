import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'lib', 'table24Data.json');

export async function GET() {
  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    return new Response(data, { status: 200 });
  } catch (error) {
    return new Response('Error reading data file', { status: 500 });
  }
}

export async function PUT(req) {
  const { id, updatedValues } = await req.json();

  try {
    // Read existing data
    const data = fs.readFileSync(filePath, 'utf-8');
    const parsedData = JSON.parse(data);

    // Find and update the specific item
    const index = parsedData.findIndex((item) => item.id === id);
    if (index === -1) {
      return new Response('Item not found', { status: 404 });
    }

    // Update the item
    parsedData[index] = { ...parsedData[index], ...updatedValues };

    // Write the updated data back to the file
    fs.writeFileSync(filePath, JSON.stringify(parsedData, null, 2));

    return new Response(JSON.stringify(parsedData[index]), {
      status: 200,
    });
  } catch (error) {
    return new Response('Error updating data file', { status: 500 });
  }
}
