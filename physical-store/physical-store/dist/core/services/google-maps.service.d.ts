export declare class GoogleMapsService {
    private readonly apiKey;
    getCoordinatesFromAddress(address: string): Promise<{
        lat: number;
        lng: number;
    }>;
    calculateDistance(origin: string, destination: string): Promise<number>;
}
