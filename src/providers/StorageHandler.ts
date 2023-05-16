class StorageHandler {
    public set(key: string, value: any): void {
        const serializedValue = JSON.stringify(value);
        chrome.storage.local.set({ [key]: serializedValue }, () => {
            console.log("Data set to storage:", { [key]: serializedValue });
        });
    }

    public get(key: string, callback: (value: any) => void): void {
        chrome.storage.local.get(key, (result) => {
            const value = JSON.parse(result[key]);
            callback(value);
        });
    }
}
export default StorageHandler;
