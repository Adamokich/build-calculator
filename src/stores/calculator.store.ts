import { API_ROUTES, baseURL, client, currencyBaseURL } from '@/api/api';
import type { CalculationParams, OperationItem } from '@/interfaces/operations.interface';
import type { SquareItem } from '@/interfaces/square.interface';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useCalculatorStore = defineStore('calculator', () => {
  const squares = ref<SquareItem[]>([]);
  const dollarCurrency = ref<number>(0);
  const totalPrice = ref<number>(0);
  const ceilingHeight = ref<number | undefined>();
  const calculatedSquaresValues = ref<SquareItem[]>([]);

  async function getSquares(): Promise<void> {
    const { data } = await client().get<SquareItem[]>(baseURL + API_ROUTES.squares);

    squares.value = data.map((item) => {
      if (item.value === 0) {
        return { ...item, value: undefined };
      }

      return item;
    });
  }

  async function getCurrentCurrency(): Promise<void> {
    const { data } = await client().get(currencyBaseURL + API_ROUTES.currencyDollar);

    dollarCurrency.value = Math.ceil(totalPrice.value / data.rates.UAH);

    console.log(dollarCurrency.value);
  }

  function calcByOpName(name: string, area: number, count: number): number {
    let window = 0;
    let doors = 0;

    if (name === 'Откосы оконные') {
      window = area / 7.5 < 0.5 ? 0 : Math.ceil(area / 7.5) * count;
    } else if (name === 'Вставка межкомнатных дверей') {
      doors = area / 25 < 0.5 ? 0 : Math.ceil(area / 25) * count;
    }

    return window + doors;
  }

  const calculatedCeilingHeight = computed(() => {
    if (ceilingHeight.value === undefined) {
      return 0;
    }

    if (ceilingHeight.value < 0) {
      return 0;
    }

    return ceilingHeight.value;
  });

  const totalSumSquare = computed(() => {
    return calculatedSquaresValues.value.reduce(
      (acc, sum) => (sum.value ? acc + sum.value : acc),
      0,
    );
  });

  const totalSumBathroomSquare = computed(() => {
    const totalSquare = calculatedSquaresValues.value.filter(
      (item) =>
        item.name.includes('Санузел (туалет)') || item.name.includes('Санузел (ванная или душ)'),
    );

    return totalSquare.reduce((acc, sum) => (sum.value ? acc + sum.value : acc), 0);
  });

  const operationsStrategies = {
    operation_1: (params: CalculationParams) => params.area * params.count,
    operation_2: (params: CalculationParams) =>
      4 * params.areaRooted * params.height * params.count,
    operation_3: (params: CalculationParams) => 4 * params.areaRooted * params.count,
    operation_4: (params: CalculationParams, operations: OperationItem) =>
      calcByOpName(operations.name, params.area, params.count),
    operation_5: (params: CalculationParams) => params.totalSumBathroomSquare * params.count,
    operation_6: (params: CalculationParams) => params.count,
  };

  function calcOperations(operations: OperationItem[]): void {
    let total = 0;
    const area = totalSumSquare.value;

    const calculationParams: CalculationParams = {
      height: calculatedCeilingHeight.value,
      area: area,
      areaRooted: Math.round(Math.sqrt(area)),
      totalSumBathroomSquare: totalSumBathroomSquare.value,
      count: 0,
    };

    if (area <= 0 || operations.length === 0) {
      totalPrice.value = 0;
      return;
    }

    operations.forEach((operation) => {
      calculationParams.count = +operation.count || 0;

      const operationKey = Object.keys(operationsStrategies).find((key) =>
        operation.id.includes(key),
      );

      if (operationKey) {
        const calculate = operationsStrategies[operationKey as keyof typeof operationsStrategies];
        total += calculate(calculationParams, operation);
      }
    });

    totalPrice.value = Math.round(total);
  }

  watch(
    squares,
    (newValue) => {
      calculatedSquaresValues.value = newValue.map((item) => {
        if (item.value === undefined) {
          return { ...item, value: 0 };
        }

        if (item.value < 0) {
          return { ...item, value: 0 };
        }

        return item;
      });
    },
    { deep: true },
  );

  watch(
    () => totalPrice.value,
    () => getCurrentCurrency(),
  );

  return {
    squares,
    dollarCurrency,
    totalPrice,
    ceilingHeight,
    calculatedCeilingHeight,
    totalSumSquare,
    getSquares,
    getCurrentCurrency,
    calcOperations,
  };
});
