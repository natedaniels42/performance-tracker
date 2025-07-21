export interface Data {
    day: number,
    weight: number,
    bloodPressureSystolic1: number,
    bloodPressureDiastolic1: number,
    bloodPressureSystolic2: number,
    bloodPressureDiastolic2: number,
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