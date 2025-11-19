<template>
  <h1 class="title"><span>Калькулятор</span> стоимости ремонта</h1>
</template>

<style scoped lang="scss">
.title {
  font-size: 48px;

  span {
    position: relative;

    &::before {
      content: '';
      background-color: var(--color-accent);
      height: 4px;
      width: 300px;
      position: absolute;
      left: 50%;
      translate: -50%;
      bottom: -14px;
    }
  }
}
</style>
