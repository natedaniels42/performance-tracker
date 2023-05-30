export interface Data {
    day: number,
    weight: number,
    workout: YesNo,
    food: YesNo,
    alcohol: YesNo,
    date: string
}

export enum YesNo {
    Yes = 'Y',
    No = 'N'
}