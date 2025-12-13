export interface OperationItem {
  name: string;
  count: string;
  unit: string;
  id: string;
  isActive?: boolean;
}

export interface CalculationParams {
  area: number;
  height: number;
  areaRooted: number;
  count: number;
  totalSumBathroomSquare: number;
}
