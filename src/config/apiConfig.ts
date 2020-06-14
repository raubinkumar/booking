export interface ApiConfigInterface {
    protocol: string;
    host: string;
    dataApiUrl: string;
    apiUrl: string;
}

export const apiConfig: ApiConfigInterface = {
    protocol: "http",
    host: "localhost:5000",
    dataApiUrl: "v1",
    apiUrl: "v1",
};
