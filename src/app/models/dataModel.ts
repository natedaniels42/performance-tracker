export interface Data {
    day: number,
    weight: number,
    workout: YesNo,
    food: YesNo,
    alcohol: YesNo,
    date: string,
    user: string,
    photo: string
}

export enum YesNo {
    Yes = 'Y',
    No = 'N'
}