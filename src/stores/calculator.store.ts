import { API_ROUTES, baseURL, client, currencyBaseURL } from '@/api/api';
import type { OperationItem } from '@/interfaces/operations.interface';
import type { SquareItem } from '@/interfaces/square.interface';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

export const useCalculatorStore = defineStore('calculator', () => {
  const squares = ref<SquareItem[]>([]);
  const operations = ref<OperationItem[]>([]);
  const dollarCurrency = ref<number>(0);
  const totalPrice = ref<number>(4000);
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

  async function getOperations(): Promise<void> {
    const { data } = await client().get<OperationItem[]>(baseURL + API_ROUTES.operations);

    operations.value = data;
  }

  async function getCurrentCurrency(): Promise<void> {
    const { data } = await client().get(currencyBaseURL + API_ROUTES.currencyDollar);

    dollarCurrency.value = Math.ceil(totalPrice.value / data.rates.UAH);
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

  return {
    squares,
    operations,
    dollarCurrency,
    totalPrice,
    ceilingHeight,
    calculatedCeilingHeight,
    getSquares,
    getOperations,
    getCurrentCurrency,
  };
});
