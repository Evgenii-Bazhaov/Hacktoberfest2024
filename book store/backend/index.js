const express = require('express');
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// MongoDB config
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = "mongodb+srv://adminn:BoUJPYvBUtgktqhr@blog.2lxxj.mongodb.net/?retryWrites=true&w=majority&appName=blog";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect to the MongoDB server
        await client.connect();

        const bookCollections = client.db("BookInventory").collection("Books");

        // Insert a new book into the database
        app.post('/upload-book', async (req, res) => {
            const { title, category, price, date } = req.body;

            if (!title || !category || !price || !date) {
                return res.status(400).json({ error: 'All fields are required' });
            }

            try {
                const newBook = { title, category, price, date };
                const result = await bookCollections.insertOne(newBook);
                res.status(201).json(result);
            } catch (error) {
                console.error('Error inserting book:', error);
                res.status(500).json({ error: 'Failed to add book' });
            }
        });

        // Get all books from the database, with optional category filter
        app.get("/all-books", async (req, res) => {
            let query = {};
            if (req.query?.category) {
                query = { category: req.query.category };
            }
            const result = await bookCollections.find(query).toArray();
            res.send(result);
        });

        // Get a single book by ID
        app.get("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            const result = await bookCollections.findOne(filter);
            res.send(result);
        });

        // Update a book by ID (supports updating title, category, price, and date)
        app.patch("/book/:id", async (req, res) => {
            const id = req.params.id;
            const updateBookData = req.body;
            const filter = { _id: new ObjectId(id) };
            const updatedDoc = {
                $set: {
                    title: updateBookData.title,
                    category: updateBookData.category,
                    price: updateBookData.price,
                    date: updateBookData.date
                }
            };
            const options = { upsert: true };
            try {
                const result = await bookCollections.updateOne(filter, updatedDoc, options);
                res.send(result);
            } catch (error) {
                console.error('Error updating book:', error);
                res.status(500).json({ error: 'Failed to update book' });
            }
        });

        // Delete a book by ID
        app.delete("/book/:id", async (req, res) => {
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) };
            try {
                const result = await bookCollections.deleteOne(filter);
                res.send(result);
            } catch (error) {
                console.error('Error deleting book:', error);
                res.status(500).json({ error: 'Failed to delete book' });
            }
        });

        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
