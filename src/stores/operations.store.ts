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

    operations.value = data.map((operation) => ({ ...operation, isActive: false }));
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

  return { operations, getOperations };
});
