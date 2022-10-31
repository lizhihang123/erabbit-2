<template>
  <div class="home-special-skeleton">
    <XtxSkeleton
      width="404px"
      height="360px"
      animated
    />
    <XtxSkeleton
      width="404px"
      height="360px"
      animated
    />
    <XtxSkeleton
      width="404px"
      height="360px"
      animated
    />
  </div>
</template>

<script>
export default {
  name: 'home-special-skeleton'
}
</script>

<style scoped lang='less'>
.home-special-skeleton {
  display: flex;
  justify-content: space-between;
}
</style>
