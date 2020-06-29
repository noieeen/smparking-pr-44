<template>
  <div class="mt-5">
    <nav aria-label="Page navigation example">
      <div class="pagination overflow-auto justify-content-center">
        <div>
          <b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" first-number></b-pagination>
        </div>

      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rows: 94,
      perPage: 1,
      currentPage: 4
    };
  }
};
</script>
<style lang="scss">
$pageNaviColor: #81b9bf;

.pagination > .active > a {
  color: white;
  background-color: $pageNaviColor !important;
  border: solid 1px $pageNaviColor !important;
}

.pagination > li > a {
  background-color: white;
  color: $pageNaviColor;
}

.pagination > li > a:focus,
.pagination > li > a:hover,
.pagination > li > span:focus,
.pagination > li > span:hover {
  color: #5a5a5a;
  background-color: #eee;
  border-color: #ddd;
}

.pagination > .active > a:hover {
  background-color: $pageNaviColor !important;
  border: solid 1px $pageNaviColor;
}
</style>