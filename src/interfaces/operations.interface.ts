export interface OperationItem {
  name: string;
  count: number;
  unit: string;
  id: string;
  isActive?: boolean;
  value?: undefined | number;
}

export interface CalculationParams {
  area: number;
  height: number;
  areaRooted: number;
  count: number;
  totalSumBathroomSquare: number;
}
