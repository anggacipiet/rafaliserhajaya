const algoliasearch = require('algoliasearch');
const client = algoliasearch('YOUR_APP_ID', 'YOUR_ADMIN_API_KEY');
const index = client.initIndex('rafaliserhajaya');

// Fungsi untuk mengindeks konten
async function indexContent() {
  // Ambil data dari Hugo JSON output
  const content = require('../public/index.json');
  
  const objects = content.map(item => ({
    objectID: item.uri,
    url: item.permalink,
    title: item.title,
    description: item.description,
    image: item.image,
    content: item.content,
    categories: item.categories,
    tags: item.tags
  }));

  try {
    await index.saveObjects(objects);
    console.log('Content indexed successfully');
  } catch (error) {
    console.error('Error indexing content:', error);
  }
}

indexContent(); 