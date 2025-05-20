import { Timestamp } from "rxjs";

export enum SpaceTypes {
    StudySpace = 0,
    MeetingRoom = 1,
    EventSpace = 2,
    TechLab = 3
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
    spaceAmenities: SpaceAmenity[];
}

export interface SpaceAmenity {
    amenityId: number;
    spaceId: number;
} 