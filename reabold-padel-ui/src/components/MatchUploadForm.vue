<template>
  <!-- component -->
  <div class="flex h-screen items-center justify-center">
    <div class="bg-gr border px-6 shadow-md">
      <form @submit.prevent="onSubmit">
        <div class="py-5">
          <img
            src="https://playpadel.com.au/wp-content/uploads/2022/01/logo-padel.webp"
            alt=""
          />
        </div>

        <div>
          <p>Where did you play?</p>
          <div
            class="input-errors"
            v-for="error of v$.formData.court.$errors"
            :key="error.$uid"
          >
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
        <div class="mb-4 grid grid-cols-3 gap-3">
          <div class="radio-box">
            <input
              type="radio"
              class="radio-box-content"
              name="court"
              id="court1"
              value="1"
              v-model="formData.court"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="court"
            >
              Court 1
            </label>
          </div>
          <div class="radio-box">
            <input
              type="radio"
              class="radio-box-content"
              name="court"
              id="court2"
              value="2"
              v-model="formData.court"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="court"
            >
              Court 2
            </label>
          </div>
          <div class="radio-box">
            <input
              type="radio"
              class="radio-box-content"
              name="court"
              id="court3"
              value="3"
              v-model="formData.court"
            />
            <label
              class="form-check-label inline-block text-gray-800"
              for="court"
            >
              Court 3
            </label>
          </div>
        </div>

        <p>When?</p>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <div
              class="input-errors"
              v-for="error of v$.formData.date.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <BaseInput inputType="date" v-model="formData.date" />
          </div>
          <div>
            <div
              class="input-errors"
              v-for="error of v$.formData.time.$errors"
              :key="error.$uid"
            >
              <div class="error-msg">{{ error.$message }}</div>
            </div>
            <VueTimepicker
              format="HH:mm"
              :minute-interval="15"
              v-model="formData.time"
            />
          </div>
        </div>
        <div class="block max-w-md rounded-l">
          <div>
            <p>Team 1</p>
            <div class="mb-4 grid grid-cols-2 gap-4">
              <div>
                <div
                  class="input-errors"
                  v-for="error of v$.formData.team1.player1.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <BaseInput
                  inputType="text"
                  placeholder="player"
                  v-model="formData.team1.player1"
                />
              </div>
              <div>
                <div
                  class="input-errors"
                  v-for="error of v$.formData.team1.player2.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <BaseInput
                  inputType="text"
                  placeholder="player"
                  v-model="formData.team1.player2"
                />
              </div>
            </div>
          </div>
          <div>
            <p>Team 2</p>
            <div class="mb-4 grid grid-cols-2 gap-4">
              <div>
                <div
                  class="input-errors"
                  v-for="error of v$.formData.team2.player1.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <BaseInput
                  inputType="text"
                  placeholder="player"
                  v-model="formData.team2.player1"
                />
              </div>
              <div>
                <div
                  class="input-errors"
                  v-for="error of v$.formData.team2.player2.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
                <BaseInput
                  inputType="text"
                  placeholder="player"
                  v-model="formData.team2.player2"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="block max-w-md rounded-l">
          <div>
            <p>Scores</p>
            <div class="mb-6 grid grid-cols-2 gap-4">
              <div>
                <BaseInput
                  inputType="number"
                  placeholder="Team 1 Score"
                  v-model="formData.scoreTeam1"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.formData.scoreTeam1.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>

              <div>
                <BaseInput
                  inputType="number"
                  placeholder="Team 2 Score"
                  v-model="formData.scoreTeam2"
                />
                <div
                  class="input-errors"
                  v-for="error of v$.formData.scoreTeam2.$errors"
                  :key="error.$uid"
                >
                  <div class="error-msg">{{ error.$message }}</div>
                </div>
              </div>
            </div>
          </div>
          <Notifications position="top-center" />
        </div>

        <button
          class="mt-5 w-full scale-105 rounded-[4px] border bg-blue-800 bg-gradient-to-r from-blue-500 p-2 text-white duration-300 hover:bg-slate-400"
          type="submit"
        >
          Submit Results
        </button>
      </form>
    </div>
  </div>
</template>
<script>
// import axios from "axios";
import BaseInput from "./BaseInput.vue";
import { useVuelidate } from "@vuelidate/core";
import { integer, required } from "@vuelidate/validators";
import VueTimepicker from "vue3-timepicker/src/VueTimepicker.vue";
import { useNotification } from "@kyvg/vue3-notification";

const { notify } = useNotification();

function roundToNearest(date = new Date()) {
  const minutes = 15;
  const ms = 1000 * 60 * minutes;

  // 👇️ replace Math.round with Math.ceil to always round UP
  return new Date(Math.round(date.getTime() / ms) * ms);
}

const combineDateAndTime = function (date, time) {
  let d = new Date(date);
  d.setHours(time.slice(0, 2));
  d.setMinutes(time.slice(3, 5));
  d.setSeconds(0);
  return d;
};

const stateToPayload = function ({
  court,
  team1,
  team2,
  scoreTeam1,
  scoreTeam2,
  date,
  time,
}) {
  const payload = {
    court,
    ...{ dateTime: combineDateAndTime(date, time) },
    team1: {
      player1: {
        id: team1.player1,
      },
      player2: {
        id: team1.player2,
      },
    },
    team2: {
      player1: {
        id: team2.player1,
      },
      player2: {
        id: team2.player2,
      },
    },
    matchResult: {
      wins: scoreTeam1,
      losses: scoreTeam2,
    },
    rated: true,
  };

  return JSON.stringify(payload);
};

export default {
  name: "MainUploadForm",
  setup() {
    return { v$: useVuelidate({ $autoDirty: true }) };
  },

  data() {
    return {
      formData: {
        court: null,
        date: new Date().toISOString().slice(0, 10),
        time: roundToNearest().toTimeString().slice(0, 5),
        team1: { player1: null, player2: null },
        team2: { player1: null, player2: null },
        scoreTeam1: null,
        scoreTeam2: null,
        scoringType: "GAMES",
      },
    };
  },
  validations() {
    return {
      formData: {
        court: { required },
        date: { required },
        time: { required },
        team1: { player1: { required }, player2: { required } },
        team2: { player1: { required }, player2: { required } },
        scoreTeam1: { required },
        scoreTeam2: { required, integer },
        scoringType: { required },
      },
    };
  },
  components: {
    BaseInput,
    VueTimepicker,
  },
  methods: {
    async onSubmit() {
      const result = await this.v$.$validate();

      if (!result) {
        return;
      }
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_API}/matches`, {
          method: "POST",
          body: stateToPayload(this.formData),
        }).then(() => {
          this.formData.court = null;
          this.formData.date = new Date().toISOString().slice(0, 10);
          this.formData.time = roundToNearest().toTimeString().slice(0, 5);
          this.formData.team1.player1 = null;
          this.formData.team1.player2 = null;
          this.formData.team2.player1 = null;
          this.formData.team2.player2 = null;
          this.formData.scoreTeam1 = null;
          this.formData.scoreTeam2 = null;
          this.v$.$reset();
          notify({
            type: "success",
            title: "Match uploaded. Thank you 🎾",
          });
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
<style scoped>
.radio-box {
  @apply block w-full rounded border border-solid border-gray-300 bg-clip-padding px-1 py-1.5 text-base font-normal text-gray-700 transition ease-in-out focus:border-blue-600 focus:bg-white focus:text-gray-700 focus:outline-none;
}

.radio-box-content {
  @apply float-left mt-1 mr-2 h-4 w-4 cursor-pointer appearance-none rounded-full border border-gray-300 bg-white bg-contain bg-center bg-no-repeat align-top transition duration-200 checked:border-blue-600 checked:bg-blue-600 focus:outline-none;
}

.input-errors {
  color: red;
}
</style>
