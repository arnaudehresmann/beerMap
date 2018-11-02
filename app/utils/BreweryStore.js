let store = null;

export function CreateStore(breweries) {
    store = breweries;
}

export function GetStore() {
    return store;
}