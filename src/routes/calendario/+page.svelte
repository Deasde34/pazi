<script lang="ts">
    import { onMount } from "svelte";
    import { supabase } from "$lib/supabaseClient";
    import AsignarCitaModal from "$lib/components/citas/AsignarCitaModal.svelte";
    import type { Cita } from "$lib/types";
    import { getDaysInMonth, getMonthName } from "$lib/dateUtils";
  
    let citas: Cita[] = [];
    let calendar: Date[] = [];
  
    let currentDate = new Date();
    let currentMonth: string | number = getMonthName(currentDate.getMonth());
  
    onMount(async () => {
      updateCalendar();
    });
  
    function updateCalendar() {
      let monthDays = getDaysInMonth(
        currentDate.getMonth(),
        currentDate.getFullYear()
      );
  
      let prevMonthDays = getDaysInMonth(
        currentDate.getMonth() - 1,
        currentDate.getFullYear()
      );
  
      let nextMonthDays = getDaysInMonth(
        currentDate.getMonth() + 1,
        currentDate.getFullYear()
      );
  
      let firstDay = monthDays[0];
  
      calendar = [
        ...prevMonthDays.slice(
          prevMonthDays.length - firstDay.getDay(),
          prevMonthDays.length
        ),
        ...monthDays
      ];
  
      calendar = [
        ...calendar,
        ...nextMonthDays.slice(0, 35 - calendar.length)
      ]
  
  
    }
  
    async function getCitasForMonth() {
      const { data, error } = await supabase
        .from("citas")
        .select("*")
        .gte("fecha", new Date(currentDate.getFullYear(), currentDate.getMonth()))
        .lte(
          "fecha",
          new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
        );
      if (error) {
        console.error(error);
        return;
      }
  
      citas = data as Cita[];
    }
  
    function changeCurrentMonth(e: Event) {
      const target = e.target as HTMLSelectElement;
      const month = parseInt(target.value);
      currentMonth = getMonthName(month);
      currentDate.setMonth(month);
      updateCalendar();
    }
  </script>
  
  <div class="container py-4 py-xl-5" style="padding: 0;">
    <div
      class="row gy-4 row-cols-1 row-cols-md-2 row-cols-lg-3 text-start d-xl-flex justify-content-xl-center align-items-xl-center"
    >
      <div class="col">
        <div class="card border-0 shadow-none">
          <div
            class="card-body text-start d-flex align-items-center p-0"
            style="background: var(--bs-primary-border-subtle);"
          >
            <img
              class="rounded-circle flex-shrink-0 me-3 fit-cover"
              width="130"
              height="130"
              src="/img/psicologo.png"
              alt="psicoloco"
            />
            <div>
              <h5 class="fw-bold text-primary mb-0">María Broch</h5>
              <p class="text-muted mb-1">Psicóloga</p>
              <ul class="list-inline fs-6 text-muted w-100 mb-0">
                <li class="list-inline-item text-center">
                  <div class="d-flex flex-column align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      class="bi bi-facebook"
                    >
                      <path
                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                      />
                    </svg>
                  </div>
                </li>
                <li class="list-inline-item text-center">
                  <div class="d-flex flex-column align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      class="bi bi-instagram"
                    >
                      <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-0 shadow-none">
          <div class="card-body d-flex align-items-center p-0">
            <img
              class="rounded-circle flex-shrink-0 me-3 fit-cover"
              width="130"
              height="130"
              src="/img/nutricionista.png"
              alt="nutricionista"
            />
            <div>
              <h5 class="fw-bold text-primary mb-0">Luz Suárez</h5>
              <p class="text-muted mb-1">Nutrióloga</p>
              <ul class="list-inline fs-6 text-muted w-100 mb-0">
                <li class="list-inline-item text-center">
                  <div class="d-flex flex-column align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      class="bi bi-facebook"
                    >
                      <path
                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                      />
                    </svg>
                  </div>
                </li>
                <li class="list-inline-item text-center">
                  <div class="d-flex flex-column align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      class="bi bi-instagram"
                    >
                      <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-0 shadow-none">
          <div class="card-body d-flex align-items-center p-0">
            <img
              class="rounded-circle flex-shrink-0 me-3 fit-cover"
              width="130"
              height="130"
              src="/img/nutriologo.png"
              alt="nutriologo"
            />
            <div>
              <h5 class="fw-bold text-primary mb-0">
                <strong>Juan Russo</strong>
              </h5>
              <p class="text-muted mb-1">Nutriólogo</p>
              <ul class="list-inline fs-6 text-muted w-100 mb-0">
                <li class="list-inline-item text-center">
                  <div class="d-flex flex-column align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      class="bi bi-facebook"
                    >
                      <path
                        d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"
                      />
                    </svg>
                  </div>
                </li>
                <li class="list-inline-item text-center">
                  <div class="d-flex flex-column align-items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      class="bi bi-instagram"
                    >
                      <path
                        d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"
                      />
                    </svg>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="bootstrap_calendar">
    <div class="container py-5">
      <!-- Calendar -->
      <div class="calendar shadow bg-white p-5">
        <select
          class="form-select form-select-lg month-select"
          on:change={changeCurrentMonth}
        >
          <option
            value="0"
            selected={currentMonth === 0 || currentMonth === "Enero"}
            >Enero</option
          >
          <option
            value="1"
            selected={currentMonth === 1 || currentMonth === "Febrero"}
            >Febrero</option
          >
          <option
            value="2"
            selected={currentMonth === 2 || currentMonth === "Marzo"}
            >Marzo</option
          >
          <option
            value="3"
            selected={currentMonth === 3 || currentMonth === "Abril"}
            >Abril</option
          >
          <option
            value="4"
            selected={currentMonth === 4 || currentMonth === "Mayo"}>Mayo</option
          >
          <option
            value="5"
            selected={currentMonth === 5 || currentMonth === "Junio"}
            >Junio</option
          >
          <option
            value="6"
            selected={currentMonth === 6 || currentMonth === "Julio"}
            >Julio</option
          >
          <option
            value="7"
            selected={currentMonth === 7 || currentMonth === "Agosto"}
            >Agosto</option
          >
          <option
            value="8"
            selected={currentMonth === 8 || currentMonth === "Septiembre"}
            >Septiembre</option
          >
          <option
            value="9"
            selected={currentMonth === 9 || currentMonth === "Octubre"}
            >Octubre</option
          >
          <option
            value="10"
            selected={currentMonth === 10 || currentMonth === "Noviembre"}
            >Noviembre</option
          >
          <option
            value="11"
            selected={currentMonth === 11 || currentMonth === "Diciembre"}
            >Diciembre</option
          >
        </select>
  
        <div class="d-flex align-items-center">
          <i class="fa fa-calendar fa-3x mr-3" />
          <!-- Month select -->
          <h2 class="month font-weight-bold mb-0 text-uppercase">
            {currentMonth}
            {currentDate.getFullYear()}
          </h2>
        </div>
        <p class="font-italic text-muted mb-5">No hay citas agendadas.</p>
        <ol class="day-names list-unstyled">
          <li class="font-weight-bold text-uppercase">Domingo</li>
          <li class="font-weight-bold text-uppercase">Lunes</li>
          <li class="font-weight-bold text-uppercase">Martes</li>
          <li class="font-weight-bold text-uppercase">Miércoles</li>
          <li class="font-weight-bold text-uppercase">Jueves</li>
          <li class="font-weight-bold text-uppercase">Viernes</li>
          <li class="font-weight-bold text-uppercase">Sábado</li>
        </ol>
  
        <ol class="days list-unstyled">
          {#each calendar as day}
            <li class:outside={day.getMonth() !== currentDate.getMonth()}>
              <div class="date">{day.getDate()}</div>
            </li>
          {/each}
          <!-- <li>
            <div class="date">1</div>
          </li>
          <li>
            <div class="date">2</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">3</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">4</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">5</div>
            <AsignarCitaModal />
          </li>
  
          <li>
            <div class="date">6</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">7</div>
            <div class="event bg-warning">1 cita disponible</div>
          </li>
          <li>
            <div class="date">8</div>
          </li>
          <li>
            <div class="date">9</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">10</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">11</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">12</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">13</div>
            <div class="event bg-warning">2 citas disponibles</div>
          </li>
          <li>
            <div class="date">14</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">15</div>
          </li>
          <li>
            <div class="date">16</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">17</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">18</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">19</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">20</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">21</div>
            <div class="event bg-danger">No hay citas disponibles</div>
          </li>
          <li>
            <div class="date">22</div>
          </li>
          <li>
            <div class="date">23</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">24</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">25</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">26</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">27</div>
            <div class="event bg-info">100% disponibilidad</div>
          </li>
          <li>
            <div class="date">28</div>
            <div class="event bg-success">4 citas disponibles</div>
          </li>
          <li>
            <div class="date">29</div>
          </li>
          <li>
            <div class="date">30</div>
            <div class="event bg-success">6 citas disponibles</div>
          </li>
          <li>
            <div class="date">31</div>
            <div class="event bg-success">5 citas disponibles</div>
          </li>
          <li class="outside">
            <div class="date">1</div>
          </li>
          <li class="outside">
            <div class="date">2</div>
          </li>
          <li class="outside">
            <div class="date">3</div>
          </li>
          <li class="outside">
            <div class="date">4</div>
          </li> -->
        </ol>
      </div>
    </div>
  </div>
  