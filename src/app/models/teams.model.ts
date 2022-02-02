export interface TeamsModel {
    teamName: string;
    state: string;
    gender: string;
    imageId: number;
}

export interface TeamImage {
    id: number;
    name: string;
    imageUrl: string;
    isSelected: boolean;
    isDuplicated?: boolean;
}
