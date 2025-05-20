export interface GalleryDTO {
    ImgaeFile: File;
    caption?: string;
    spaceId: number;
}

export interface Gallery {
    id: number;
    imageUrl: string;
    caption?: string;
    spaceId: number;
} 