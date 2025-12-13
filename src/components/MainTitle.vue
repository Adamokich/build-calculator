<template>
  <h1 class="title"><span>Калькулятор</span> стоимости ремонта</h1>
</template>

<style scoped lang="scss">
@use '../assets/styles/helpers/media' as *;

.title {
  font-size: 48px;
  text-transform: uppercase;

  span {
    position: relative;

    @include mobile-above {
      border-bottom: 4px solid var(--color-accent);
    }
  }
}
</style>
