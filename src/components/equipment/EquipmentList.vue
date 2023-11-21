<script>
import api from '@/api'
import { useToast } from 'vue-toastification'
import HeaderApp from '@/components/layout/Header.vue'
import FooterApp from '@/components/layout/Footer.vue'
// import { Modal } from 'bootstrap'

export default {
  name: 'equipments-data',
  components: { FooterApp, HeaderApp },
  setup () {
    const toast = useToast()
    return { toast }
  },
  data () {
    return {
      // tables column and rows
      columns: [
        {
          label: 'Название',
          field: 'name'
        },
        {
          label: 'Производитель',
          field: 'models.manufacturers.name'
        },
        {
          label: 'Модель',
          field: 'models.name'
        },
        {
          label: 'Ответственнное лицо',
          field: 'responsible.full'
        },
        {
          label: 'Инвентарный номер',
          field: 'inventory'
        },
        {
          label: 'Серийный номер',
          field: 'serial'
        },
        {
          label: 'Местоположение',
          field: 'positions.name'
        },
        {
          label: 'Комментарий',
          field: 'comments'
        },
        {
          label: 'Цена',
          field: 'price'
        },
        {
          label: 'Статус',
          field: 'statuses.status'
        },
        {
          label: 'Редактировать',
          field: 'update'
        },
        {
          label: 'Списать',
          field: 'write-off'
        }
      ],
      rows: [],
      // End tables
      // Add-equipment
      equipment_add: {
        id: null,
        name: '',
        model_name: '',
        responsible_fio: '',
        inventory: null,
        serial: '',
        positions_name: '',
        comments: '',
        price: null,
        status_name: ''
      },
      models_data: [],
      responsible_data: [],
      positions_data: [],
      status_data: [],
      model: null,
      responsible: null,
      position: null,
      status: null,
      // End Add-equipment
      // Add-manufacturer
      manufacturer_add: {
        id: null,
        name: ''
      },
      // End Add-manufacturer
      // Add-model
      model_add: {
        id: null,
        name: '',
        manufacturer_name: ''
      },
      manufacturer: [],
      manufacturer_data: [],
      // End add-model
      // Add-position
      position_add: {
        id: null,
        name: ''
      },
      // End add-position
      // Add-responsible
      responsible_add: {
        id: null,
        full: ''
      },
      // End add-responsible
      // Update equipment
      currentEquipment: null
      // End update equipment
    }
  },
  methods: {
    // get tables row and dynamic style
    rowStyleClassFn (row) {
      return row.statuses.status === 'В работе' ? 'green' : 'red'
    },
    getAllEquipment () {
      api.getAllEquipment().then((response) => {
        this.rows = response.data
      })
    },
    // end tables
    // Add-equipment methods
    getAllModel () {
      api.getAllModel()
        .then(response => {
          this.models_data = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getModel (name) {
      api.getModel(name)
        .then(response => {
          this.model = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getAllResponsible () {
      api.getAllResponsible()
        .then(response => {
          this.responsible_data = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getResponsible (fio) {
      api.getResponsible(fio)
        .then(response => {
          this.responsible = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getAllPosition () {
      api.getAllPosition()
        .then(response => {
          this.positions_data = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getPosition (name) {
      api.getPosition(name)
        .then(response => {
          this.position = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getAllStatus () {
      api.getAllStatus()
        .then(response => {
          this.status_data = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getStatus (name) {
      api.getStatus(name)
        .then(response => {
          this.status = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    createEquipment () {
      const data = {
        name: this.equipment_add.name,
        models: this.model,
        responsible: this.responsible,
        inventory: this.equipment_add.inventory,
        serial: this.equipment_add.serial,
        positions: this.position,
        comments: this.equipment_add.comments,
        price: this.equipment_add.price,
        statuses: this.status
      }
      api.createEquipment(data)
        .then(response => {
          this.equipment_add.id = response.data.id
          this.toast.success('Добавлено новое оборудование!', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false
          })
          this.getAllEquipment()
        })
        .catch(e => {
          alert(e)
        })
    },
    // End add-equipment methods
    // Add-manufacturer methods
    createManufacturer () {
      const data = {
        name: this.manufacturer_add.name
      }
      api.createManufacturer(data)
        .then(response => {
          this.manufacturer_add.id = response.data.id
          this.toast.success('Добавлен новый производитель!', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false
          })
          this.getAllManufacturer()
        })
        .catch(e => {
          alert(e)
        })
    },
    // End add-manufacturer methods
    // Add-model methods
    getAllManufacturer () {
      api.getAllManufacturer()
        .then(response => {
          this.manufacturer_data = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getManufacturer (name) {
      api.getManufacturer(name)
        .then(response => {
          this.manufacturer = response.data
        })
    },
    createModel () {
      const data = {
        name: this.model_add.name,
        manufacturers: this.manufacturer
      }
      api.createModel(data)
        .then(response => {
          this.model_add.id = response.data.id
          this.toast.success('Добавлена новая модель!', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false
          })
          this.getAllModel()
        })
        .catch(e => {
          alert(e)
        })
    },
    // End add-model methods
    // Add-position methods
    createPosition () {
      const data = {
        name: this.position_add.name
      }
      api.createPosition(data)
        .then(response => {
          this.position_add.id = response.data.id
          this.toast.success('Добавлено новое местоположение!', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false
          })
          this.getAllPosition()
        })
        .catch(e => {
          alert(e)
        })
    },
    // End add-position methods
    // Add-responsible methods
    createResponsible () {
      const data = {
        full: this.responsible_add.full
      }
      api.createResponsible(data)
        .then(response => {
          this.responsible_add.id = response.data.id
          this.toast.success('Добавлен новый владелец!', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false
          })
          this.getAllResponsible()
        })
        .catch(e => {
          alert(e)
        })
    },
    // End add-responsible methods
    // Update equipment methods
    getEquipment (id) {
      api.getEquipment(id)
        .then(response => {
          this.currentEquipment = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getUpdateModel (name) {
      api.getModel(name)
        .then(response => {
          this.currentEquipment.models = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getUpdateResponsible (fio) {
      api.getResponsible(fio)
        .then(response => {
          this.currentEquipment.responsible = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getUpdatePosition (name) {
      api.getPosition(name)
        .then(response => {
          this.currentEquipment.positions = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getUpdateStatus (name) {
      api.getStatus(name)
        .then(response => {
          this.currentEquipment.statuses = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    updateEquipment () {
      api.updateEquipment(this.currentEquipment.id, this.currentEquipment)
        .then(() => {
          this.toast.success('Данные обновленны!', {
            position: 'top-right',
            timeout: 5000,
            closeOnClick: true,
            pauseOnFocusLoss: true,
            pauseOnHover: true,
            draggable: true,
            draggablePercent: 0.6,
            showCloseButtonOnHover: false,
            hideProgressBar: true,
            closeButton: 'button',
            icon: true,
            rtl: false
          })
          this.getAllEquipment()
        })
        .catch(e => {
          alert(e)
        })
    }
  },
  created () {
    this.getAllEquipment()
    this.getAllModel()
    this.getAllResponsible()
    this.getAllPosition()
    this.getAllStatus()
    this.getAllManufacturer()
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
      :line-numbers="true"
      theme="nocturnal"
      compactMode
      :pagination-options="{
        enabled: true,
        mode: 'records'
      }"
      styleClass="vgt-table bordered condensed"
      :row-style-class="rowStyleClassFn"
    >
      <template #table-actions>
        <div>
          <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#addEquipment">
            Добавить
          </button>
        </div>
      </template>
      <template #table-row="props">
        <span v-if="props.column.field === 'update'">
<!--          <span v-for="">-->
            <button type="button" class="btn btn-success bi bi-arrow-clockwise" data-bs-toggle="modal" data-bs-target="#editEquipment" @click="getEquipment(props.row.id)">
              Редактировать
            </button>
          </span>
<!--        </span>-->
        <span v-else-if="props.column.field === 'write-off'">
          <button type="button" class="btn btn-danger bi bi-x-circle">
            В архив
          </button>
        </span>
        <span v-else>
          {{props.formattedRow[props.column.field]}}
        </span>
      </template>
    </vue-good-table>
  </div>
  <!--    Add-equipments modal-->
    <div class="modal fade" id="addEquipment" tabindex="-1" aria-labelledby="addEquipmentLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addEquipmentLabel">Добавить оборудование</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="name" class="name">Название</label>
                        <input type="text" class="form-control border border-secondary" id="name" required name="name" v-model="equipment_add.name">
                    </div>
                    <div class="mb-3">
                        <label for="model_name" class="form-label">Модель</label>
                        <select v-model="equipment_add.model_name" id="model_name" required name="model_name" class="form-control border border-secondary" @change="getModel(this.equipment_add.model_name)">
                            <option v-for="model_data in models_data" v-bind:key="model_data.id">{{model_data.name}}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#addModel">
                            Добавить модель
                        </button>
                    </div>
                    <div class="mb-3">
                        <label for="responsible_fio" class="form-label">ФИО Владельца</label>
                        <select v-model="equipment_add.responsible_fio" id="responsible_fio" required name="responsible_fio" class="form-control border border-secondary" @change="getResponsible(this.equipment_add.responsible_fio)">
                            <option v-for="response_data in responsible_data" v-bind:key="response_data.id">{{response_data.full}}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#addResponsible">
                            Добавить владельца
                        </button>
                    </div>
                    <div class="mb-3">
                        <label for="inventory" class="form-label">Инвентарный номер</label>
                        <input type="number" class="form-control border border-secondary" id="inventory" required name="inventory" v-model="equipment_add.inventory">
                    </div>
                    <div class="mb-3">
                        <label for="serial" class="form-label">Серийный номер</label>
                        <input type="text" class="form-control border border-secondary" id="serial" required name="serial" v-model="equipment_add.serial">
                    </div>
                    <div class="mb-3">
                        <label for="positions_name" class="form-label">Местоположение</label>
                        <select v-model="equipment_add.positions_name" id="positions_name" required name="positions_name" class="form-control border border-secondary" @change="getPosition(this.equipment_add.positions_name)">
                            <option v-for="position_data in positions_data" v-bind:key="position_data.id">{{position_data.name}}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#addPosition">
                            Добавить позицию
                        </button>
                    </div>
                    <div class="mb-3">
                        <label for="comments" class="form-label">Комментарий</label>
                        <input type="text" class="form-control border border-secondary" id="comments" required name="comments" v-model="equipment_add.comments">
                    </div>
                    <div class="mb-3">
                        <label for="price" class="form-label">Цена</label>
                        <input type="text" class="form-control border border-secondary" id="price" required name="price" v-model="equipment_add.price">
                    </div>
                    <div class="mb-3">
                        <label for="status_name" class="form-label">Статус</label>
                        <select v-model="equipment_add.status_name" id="status_name" required name="status_name" class="form-control border border-secondary" @change="getStatus(this.equipment_add.status_name)">
                            <option v-for="status in status_data" v-bind:key="status.id">{{status.status}}</option>
                        </select>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                    <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-dismiss="modal" @click="createEquipment">
                        Добавить оборудование
                    </button>
                </div>
            </div>
        </div>
    </div>
  <!--  End add-equipment modal-->
  <!--    Add-manufacturer modal-->
    <div class="modal fade" id="addManufacturer" tabindex="-1" aria-labelledby="addManufacturerLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addManufacturerLabel">Добавить производителя</h1>
                    <button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#addModel" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="name" class="name">Производитель</label>
                        <input type="text" class="form-control border border-secondary" id="name" required name="name" v-model="manufacturer_add.name">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addModel">Отмена</button>
                    <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#addModel" @click="createManufacturer">
                        Добавить производителя
                    </button>
                </div>
            </div>
        </div>
    </div>
  <!--  End add-manufacturer modal-->
  <!--    Add-model modal-->
    <div class="modal fade" id="addModel" tabindex="-1" aria-labelledby="addModelLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addModelLabel">Добавить модель</h1>
                    <button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#addEquipment" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="name" class="name">Название</label>
                        <input type="text" class="form-control border border-secondary" id="name" required name="name" v-model="model_add.name">
                    </div>
                    <div class="mb-3">
                        <label for="manufacturer_name" class="form-label">Производитель</label>
                        <select v-model="model_add.manufacturer_name" id="manufacturer_name" required name="manufacturer_name" class="form-control border border-secondary" @change="getManufacturer(this.model_add.manufacturer_name)">
                            <option v-for="data in manufacturer_data" v-bind:key="data.id">{{data.name}}</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#addManufacturer">
                            Добавить производителя
                        </button>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addEquipment">Отмена</button>
                    <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#addEquipment" @click="createModel">
                        Добавить модель
                    </button>
                </div>
            </div>
        </div>
    </div>
  <!--  End add-model modal-->
  <!--    Add-position modal-->
    <div class="modal fade" id="addPosition" tabindex="-1" aria-labelledby="addPositionLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addPositionLabel">Добавить позицию</h1>
                    <button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#addEquipment" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="name" class="name">Местоположение</label>
                        <input type="text" class="form-control border border-secondary" id="name" required name="name" v-model="position_add.name">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addEquipment">
                        Отмена
                    </button>
                    <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#addEquipment" @click="createPosition">
                        Добавить позицию
                    </button>
                </div>
            </div>
        </div>
    </div>
  <!--  End add-position modal-->
  <!--    Add-responsible modal-->
    <div class="modal fade" id="addResponsible" tabindex="-1" aria-labelledby="addResponsibleLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="addResponsibleLabel">Добавить владельца</h1>
                    <button type="button" class="btn-close" data-bs-toggle="modal" data-bs-target="#addEquipment" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="name" class="name">ФИО</label>
                        <input type="text" class="form-control border border-secondary" id="full" required name="full" v-model="responsible_add.full">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addEquipment">
                        Отмена
                    </button>
                    <button type="button" class="btn btn-success bi bi-plus-circle" data-bs-toggle="modal" data-bs-target="#addEquipment" @click="createResponsible">
                        Добавить владельца
                    </button>
                </div>
            </div>
        </div>
    </div>
  <!--  End add-responsible modal-->
  <!--     Update equipment modal-->
      <div class="modal fade" id="editEquipment" data-bs-config={backdrop:true} tabindex="-1" aria-labelledby="editEquipmentLabel" aria-hidden="true" v-if="currentEquipment">
          <div class="modal-dialog">
              <div class="modal-content">
                  <div class="modal-header">
                      <h1 class="modal-title fs-5" id="editEquipmentLabel">Редактирование</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="name" class="name">Название</label>
                      <input type="text" class="form-control border border-secondary" id="name" required name="name" v-model="currentEquipment.name">
                    </div>
                    <div class="mb-3">
                      <label for="model_name" class="form-label">Модель</label>
                      <select v-model="currentEquipment.models.name" id="model_name" required name="model_name" class="form-control border border-secondary" @click="getUpdateModel(currentEquipment.models.name)">
                        <option v-for="model_data in models_data" v-bind:key="model_data.id">{{model_data.name}}</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="responsible_fio" class="form-label">ФИО Владельца</label>
                      <select v-model="currentEquipment.responsible.full" id="responsible_fio" required name="responsible_fio" class="form-control border border-secondary" @click="getUpdateResponsible(this.currentEquipment.responsible.full)">
                        <option v-for="response_data in responsible_data" v-bind:key="response_data.id">{{response_data.full}}</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="inventory" class="form-label">Инвентарный номер</label>
                      <input type="number" class="form-control border border-secondary" id="inventory" required name="inventory" v-model="currentEquipment.inventory">
                    </div>
                    <div class="mb-3">
                      <label for="serial" class="form-label">Серийный номер</label>
                      <input type="text" class="form-control border border-secondary" id="serial" required name="serial" v-model="currentEquipment.serial">
                    </div>
                    <div class="mb-3">
                      <label for="positions_name" class="form-label">Местоположение</label>
                      <select v-model="currentEquipment.positions.name" id="positions_name" required name="positions_name" class="form-control border border-secondary" @click="getUpdatePosition(this.currentEquipment.positions.name)">
                        <option v-for="position_data in positions_data" v-bind:key="position_data.id">{{position_data.name}}</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <label for="comments" class="form-label">Комментарий</label>
                      <input type="text" class="form-control border border-secondary" id="comments" required name="comments" v-model="currentEquipment.comments">
                    </div>
                    <div class="mb-3">
                      <label for="price" class="form-label">Цена</label>
                      <input type="text" class="form-control border border-secondary" id="price" required name="price" v-model="currentEquipment.price">
                    </div>
                    <div class="mb-3">
                      <label for="status_name" class="form-label">Статус</label>
                      <select v-model="currentEquipment.statuses.status" id="status_name" required name="status_name" class="form-control border border-secondary" @click="getUpdateStatus(this.currentEquipment.statuses.status)">
                        <option v-for="status in status_data" v-bind:key="status.id">{{status.status}}</option>
                      </select>
                    </div>
                  </div>
                  <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
                      <button type="button" class="btn btn-success bi bi-arrow-clockwise" data-bs-dismiss="modal" @click="updateEquipment">
                        Редактировать
                      </button>
                  </div>
              </div>
          </div>
      </div>
  <!--  End update equipment modal-->
  <FooterApp/>
</template>

<style scoped>

</style>
