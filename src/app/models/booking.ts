export enum Status{
  Pending,
  Confirmed,
  Cancelled
}

export interface Booking {
  id: number,
  startTime: string,
  endTime: string,
  amount: number|string,
  status: Status,
  userId: string|null,
  userName: string|null,
  zoneId: string|null,
  zoneName: string
}

