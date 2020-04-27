process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require('./app');
const items = require('./fakeDb')

let item =  {name: "bread", price: 2.79}

beforeEach(() => {
    items.push(item)
})

afterEach(() => {
    items.length = 0
})

describe("GET /items", () => {
    test("Get a list of shopping items", async () => {
        const res = await request(app).get('/items');
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual([item])
    })
})

describe("POST /items", () => {
    test("Add an item to the list", async () => {
        const newItem = {name: "kale", price: 1.50}
        const res = await request(app)
            .post('/items')
            .send([newItem]);
        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({"added": [newItem]});
    })
})

describe("GET /items/:name", () => {
    test("Retrieve a single item", async () => {
        const res = await request(app).get('/items/bread');
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual(item)
    })
})

describe("PATCH /items", () => {
    test("Update an item", async () => {
        const updated = {name: "wheat bread", price: 2.50}
        const res = await request(app).patch('/items/bread').send(updated);
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({updated})
    })
})

describe("DELETE /items", () => {
    test("Delete an item", async () => {
        const res = await request(app).delete('/items/bread');
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({message:"Deleted"})
    })
})