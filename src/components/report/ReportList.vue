<script>
import api from '@/api'
import HeaderApp from '@/components/layout/Header.vue'
import FooterApp from '@/components/layout/Footer.vue'

export default {
  name: 'reports-data',
  components: { FooterApp, HeaderApp },
  data () {
    return {
      columns: [
        {
          label: 'Пользователь',
          field: 'users.login'
        },
        {
          label: 'Описание',
          field: 'description'
        },
        {
          label: 'Дата создания',
          field: 'data'
        }
      ],
      rows: []
    }
  },
  methods: {
    getAllReports () {
      api.getAllReports().then((response) => {
        this.rows = response.data
      })
    }
  },
  created () {
    this.getAllReports()
  }
}
</script>

<template>
  <HeaderApp/>
  <div class="table-responsive-sm">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
      enabled: true
      }"
      v-on:selected-rows-change="selectionChanged"
      :select-options="{
        enabled: false,

      }"
      :line-numbers="true"
      theme="nocturnal"
      compactMode
      styleClass="vgt-table condensed bordered "
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
    >
      <template #table-actions>
        <div>
          <a type="button" class="btn me-3 btn-secondary bi bi-file-earmark-plus" href="/equipment/add"/>
        </div>
      </template>
      <template #table-row ="props">
          <span v-if="props.column.field == 'name'">
            <a :href="'/equipment/'+props.row.id">
              {{props.row.name}}
            </a>
          </span>
        <span v-else>
              {{props.formattedRow[props.column.field]}}
          </span>
      </template>
    </vue-good-table>
  </div>
  <FooterApp/>
</template>

<style scoped>

</style>
