import { Timestamp } from "rxjs";
import { Amenity } from "./amenity.model";
import { Gallery } from "./gallery.model";

export enum SpaceTypes {
    'Study Space' = 0,
    'Meeting Room' = 1,
    'Event Space' = 2,
    'Tech Lab' = 3
}

export interface SpaceDTO {
    name: string;
    description: string;
    capacity: number;
    pricePerHour: number;
    availableFrom: string;
    availableTo: string;
    isAvailable: boolean;
    spaceType: number;
    amenitieIds: number[];
}

export interface Space {
    id: number;
    name: string;
    capacity: number;
    pricePerHour: number;
    spaceType: SpaceTypes;
    availableFrom: string;
    availableTo: string;
    isAvailable: boolean;
    description: string;
    amenites: Amenity[];
    galleries?: Gallery[];
}

export interface SpaceAmenity {
    amenityId: number;
    spaceId: number;
}
