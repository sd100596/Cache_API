//Generates a random string
function generateRandomString() {
    let result = (Math.random() + 1).toString(36).substring(7);
    return result
}

//Get count of documents in a collection
async function findDocumentCount(collection_name) {
    const count = await collection_name.countDocuments()
    return count
}

module.exports = { generateRandomString, findDocumentCount }