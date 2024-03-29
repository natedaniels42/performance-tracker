export interface Data {
    day: number,
    weight: number,
    bloodPressureSystolic: number,
    bloodPressureDiastolic: number,
    workout: YesNo,
    food: YesNo,
    alcohol: YesNo,
    notes: string,
    date: string,
    user: string,
    photo: string
}

export enum YesNo {
    Yes = 'Y',
    No = 'N'
}