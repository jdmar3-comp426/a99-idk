// inventory items are stored and managed using item class
export default class Item {
    static toDB(id, name, amount, price) {
        return {
            id: id,
            name: name,
            amount: amount,
            price: price
        };
    }
}