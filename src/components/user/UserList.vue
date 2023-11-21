<script>
import api from '@/api'
import { useToast } from 'vue-toastification'
import HeaderApp from '@/components/layout/Header.vue'
import FooterApp from '@/components/layout/Footer.vue'
// import { Modal } from 'bootstrap'

export default {
  name: 'users-data',
  components: { FooterApp, HeaderApp },
  setup () {
    const toast = useToast()
    return { toast }
  },
  data () {
    return {
      // table user
      columns: [
        {
          label: 'Фамилия',
          field: 'last'
        },
        {
          label: 'Имя',
          field: 'first'
        },
        {
          label: 'Отчество',
          field: 'father'
        },
        {
          label: 'Логин',
          field: 'login'
        },
        {
          label: 'Роль',
          field: 'roles.name'
        },
        {
          label: 'Редактировать',
          field: 'update'
        },
        {
          label: 'Отключить',
          field: 'blocked'
        }
      ],
      rows: [],
      // End table user
      // Add user
      user_add: {
        id: null,
        last: '',
        first: '',
        father: '',
        login: '',
        password: '',
        status: true
      },
      role_name: '',
      submitted: false,
      roles_data: [],
      role: null,
      // End add user
      // Update user
      currentUser: null
      // End update user
    }
  },
  methods: {
    // Table and dynamic
    getAllUser () {
      api.getAllUser().then(response => {
        this.rows = response.data
      })
    },
    rowStyle (row) {
      return row.status === true ? 'green' : 'red'
    },
    // End table and dynamic style
    // Add user methods
    getAllRoles () {
      api.getAllRoles()
        .then(response => {
          this.roles_data = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    getRole (name) {
      api.getRoles(name)
        .then(response => {
          this.role = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    createUser () {
      const data = {
        last: this.user_add.last,
        first: this.user_add.first,
        father: this.user_add.father,
        login: this.user_add.login,
        password: this.user_add.password,
        roles: this.role,
        status: this.user_add.status
      }
      api.createUser(data)
        .then(response => {
          this.user_add.id = response.data.id
          this.toast.success('Добавлен новый пользователь!', {
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
          this.getAllUser()
        })
        .catch(e => {
          alert(e)
        })
    },
    // Update user methods
    getUpdateRole (name) {
      api.getRoles(name)
        .then(response => {
          this.currentUser.roles = response.data
        })
    },
    getUser (id) {
      api.getUser(id)
        .then(response => {
          this.currentUser = response.data
        })
        .catch(e => {
          alert(e)
        })
    },
    updateUser () {
      api.updateUser(this.currentUser.id, this.currentUser)
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
          this.getAllUser()
        })
        .catch(e => {
          alert(e)
        })
    }
  },
  created () {
    this.getAllUser()
    this.getAllRoles()
  }
}
// document.addEventListener('DOMContentLoaded', (event) => {
//   document.querySelector('#updateUser').addEventListener('click', Update)
// })
</script>

<template>
  <HeaderApp/>
  <div class="table-responsive-sm">
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :row-style-class="rowStyle"
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
    >
      <template #table-actions>
        <div>
          <button type="button" class="btn btn-success bi bi-person-plus-fill" data-bs-toggle="modal" data-bs-target="#addUser">
            Добавить
          </button>
        </div>
      </template>
      <template #table-row="props">
          <span v-if="props.column.field === 'update'">
            <button type="button" class="btn btn-success bi bi-arrow-clockwise" data-bs-toggle="modal" data-bs-target="#editUser" @click="getUser(props.row.id)">
              Редактировать
            </button>
          </span>
        <span v-else-if="props.column.field === 'blocked'">
            <button @click="warning(props.row.id)" class="btn btn-danger bi bi-x-circle">
              Отключить
            </button>
          </span>
        <span v-else>
            {{props.formattedRow[props.column.field]}}
          </span>
      </template>
    </vue-good-table>
  </div>
  <!--     Add user modal-->
  <div class="modal fade" id="addUser" tabindex="-1" aria-labelledby="addUserLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addUserLabel">Добовление пользователя</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="mb-3">
                <label for="lastName" class="form-label">Фамилия</label>
                <input type="text" class="form-control border border-secondary" id="last" required name="last" v-model="user_add.last">
            </div>
            <div class="mb-3">
                <label for="firstName" class="form-label">Имя</label>
                <input type="text" class="form-control border border-secondary" id="first" required name="first" v-model="user_add.first">
            </div>
            <div class="mb-3">
                <label for="email" class="form-label">Отчество</label>
                <input type="text" class="form-control border border-secondary" id="father" required name="father" v-model="user_add.father">
            </div>
            <div class="mb-3">
                <label for="login" class="form-label">Логин</label>
                <input type="text" class="form-control border border-secondary" id="login" required name="login" v-model="user_add.login">
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Пароль</label>
                <input type="password" class="form-control border border-secondary" id="password" required name="password" v-model="user_add.password">
            </div>
            <div class="mb-3">
                <label for="role_name" class="form-label">Привелегии</label>
                <select v-model="role_name" id="role_name" required name="role_name" class="form-control border border-secondary" @change="getRole(this.role_name)">
                    <option v-for="role_data in roles_data" v-bind:key="role_data.id">{{role_data.name}}</option>
                </select>
            </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-success bi bi-person-plus-fill" data-bs-dismiss="modal" @click="createUser">
            Добавить
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--  End add user modal-->
  <!--     Update user modal-->
  <div class="modal fade" id="editUser" tabindex="-1" aria-labelledby="editUserLabel" aria-hidden="true" v-if="currentUser != null">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="editUserLabel">Редактирование пользователя</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="last_name" class="form-label">Фамилия</label>
            <input type="text" class="form-control border border-secondary" id="last_name" required name="last_name" v-model="currentUser.last">
          </div>
          <div class="mb-3">
            <label for="first_name" class="form-label">Имя</label>
            <input type="text" class="form-control border border-secondary" id="first_name" required name="first_name" v-model="currentUser.first">
          </div>
          <div class="mb-3">
            <label for="father_name" class="form-label">Отчество</label>
            <input type="text" class="form-control border border-secondary" id="father_name" required name="father_name" v-model="currentUser.father">
          </div>
          <div class="mb-3">
            <label for="login" class="form-label">Логин</label>
            <input type="text" class="form-control border border-secondary" id="login" required name="login" v-model="currentUser.login">
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Пароль</label>
            <input type="password" class="form-control border border-secondary" id="password" required name="password" v-model="currentUser.password">
          </div>
          <div class="mb-3">
            <label for="role_name" class="form-label">Привелегии</label>
            <select v-model="currentUser.roles.name" id="role_name" required name="role_name" class="form-control border border-secondary" @change="getUpdateRole(this.currentUser.roles.name)">
              <option v-for="role_data in roles_data" v-bind:key="role_data.id">{{role_data.name}}</option>
            </select>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Отмена</button>
          <button type="button" class="btn btn-success bi bi-arrow-clockwise" data-bs-dismiss="modal" @click="updateUser">
            Редактировать
          </button>
        </div>
      </div>
    </div>
  </div>
  <!--  End update user modal-->
  <FooterApp/>
</template>

<style>
.green{
  background-color: #33ffb8;
}
.red{
  background-color: #ff9baa;
}
</style>
