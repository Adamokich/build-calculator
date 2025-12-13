import { API_ROUTES, baseURL, client } from '@/api/api';
import type { OperationItem } from '@/interfaces/operations.interface';
import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';
import { useCalculatorStore } from './calculator.store';

export const useOperationsStore = defineStore('operations', () => {
  const calculatorStore = useCalculatorStore();
  const operations = ref<OperationItem[]>([]);

  async function getOperations(): Promise<void> {
    const { data } = await client().get<OperationItem[]>(baseURL + API_ROUTES.operations);

    operations.value = data.map((operation) => ({
      ...operation,
      isActive: false,
      value: undefined,
    }));
  }

  async function updateOperations(newCount: number | undefined, id: string): Promise<void> {
    if (!newCount) {
      return;
    }

    const count = newCount < 0 ? 0 : newCount;
    try {
      await client().patch(baseURL + `${API_ROUTES.operations}/${id}`, {
        count,
      });

      getOperations();
    } catch (error: unknown) {
      if (typeof error === 'object' && error !== null && 'response' in error) {
        throw new Error(`Произошла ошибка. Подробности: ${error.response}`);
      }
    }
  }

  const selectedOperations = computed(() =>
    operations.value.filter((operation) => operation.isActive),
  );

  watch(
    () => selectedOperations.value,
    (newSelectedOp) => {
      calculatorStore.calcOperations(newSelectedOp);
    },
    { deep: true },
  );

  watch(
    () => calculatorStore.totalSumSquare,
    () => {
      calculatorStore.calcOperations(selectedOperations.value);
    },
  );

  watch(
    () => calculatorStore.calculatedCeilingHeight,
    () => calculatorStore.calcOperations(selectedOperations.value),
  );

  return { operations, getOperations, updateOperations };
});
