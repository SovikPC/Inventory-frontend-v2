<script>
export default {
  name: 'header-app'
}
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark" aria-label="Offcanvas navbar large" _mstaria-label="449202" _msthash="32">
    <div class="container-fluid">
      <a class="navbar-brand" href="#" _msttexthash="9066083" _msthash="33">Инвентаризация</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar2" aria-controls="offcanvasNavbar2" aria-label="Toggle navigation" _msthidden="A" _mstaria-label="320099" _msthash="34">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="offcanvas offcanvas-end text-bg-dark" tabindex="-1" id="offcanvasNavbar2" aria-labelledby="offcanvasNavbar2Label">
        <div class="offcanvas-header" _msthidden="2">
          <h5 class="offcanvas-title" id="offcanvasNavbar2Label" _msttexthash="133653" _msthidden="1" _msthash="35">Инвентаризация</h5>
          <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close" _msthidden="A" _mstaria-label="59709" _msthash="36"></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav flex-grow-1 pe-3">
            <li class="nav-item">
              <a class="nav-link" aria-current="page" href="/" _msttexthash="334776" _msthash="37">Оборудование</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/users" _msttexthash="634504" _msthash="38">Пользователи</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/reports" _msttexthash="634504" _msthash="38">Отчёты</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav{
  background-color: orangered;
}
.offcanvas-header{
  background-color: orangered;
}
</style>
