<template>
  <div class="bg-white min-h-screen p-6 flex flex-col items-center">
    
    <!-- Личная карточка -->
    <div class="w-full max-w-2xl bg-gray-100 rounded-2xl p-4 flex items-center shadow-md">
      <img :src="user.avatar" alt="Аватар" class="w-16 h-16 rounded-full mr-4" />
      <div>
        <h2 class="text-xl font-bold">{{ user.name }}</h2>
        <p class="text-gray-600">На платформе: {{ user.days }} дней</p>
        <p class="text-gray-600">Последний запрос: {{ user.lastRequest }}</p>
      </div>
    </div>

    <!-- Прогноз на день -->
    <div class="w-full max-w-2xl bg-gray-100 rounded-2xl p-4 mt-4 shadow-md">
      <h3 class="text-lg font-semibold">Прогноз на день</h3>
      <p class="text-gray-700">{{ dailyForecast }}</p>
    </div>

    <!-- Ведение эмоционального состояния -->
    <div class="w-full max-w-2xl mt-4">
      <div class="flex justify-between items-center">
        <h3 class="text-lg font-semibold">Ведение эмоционального состояния</h3>
        <button @click="showModal = true" class="bg-blue-500 text-white px-4 py-2 rounded-xl">Добавить состояние</button>
      </div>
      <div class="mt-2 space-y-2">
        <div v-for="(emotion, index) in emotions" :key="index" class="flex items-center">
          <div class="w-12 h-12 flex items-center justify-center rounded-2xl border-2 border-gradient bg-white text-lg font-bold">
            {{ emotion.day }}
          </div>
          <div class="ml-4 bg-gray-100 rounded-2xl p-3 w-full">
            {{ emotion.state }}
          </div>
        </div>
      </div>
    </div>

    <!-- Модальное окно для ввода состояния -->
    <div v-if="showModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-6 rounded-xl shadow-lg w-80">
        <h3 class="text-lg font-semibold mb-2">Введите ваше состояние</h3>
        <input v-model="newEmotion" class="w-full p-2 border rounded-lg mb-4" placeholder="Ваше состояние..." />
        <div class="flex justify-end">
          <button @click="showModal = false" class="mr-2 px-4 py-2 bg-gray-400 text-white rounded-lg">Отмена</button>
          <button @click="submitEmotion" class="px-4 py-2 bg-blue-500 text-white rounded-lg">Сохранить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        avatar: '',
        name: '',
        days: 0,
        lastRequest: ''
      },
      dailyForecast: "",
      emotions: [],
      showModal: false,
      newEmotion: ""
    };
  },
  async created() {
    const response = await axios.get("/api/user/12345");
    this.user = {
      avatar: response.data.avatar,
      name: response.data.name,
      days: response.data.days_on_platform,
      lastRequest: response.data.last_request
    };
    this.dailyForecast = response.data.daily_forecast;
    this.emotions = response.data.daily_emotions;
  },
  methods: {
    async submitEmotion() {
      if (this.newEmotion.trim()) {
        await axios.post(`/api/emotion/${this.user.id}`, { emotion: this.newEmotion });
        this.emotions.push({ day: this.emotions.length + 1, state: this.newEmotion });
        this.newEmotion = "";
        this.showModal = false;
      }
    }
  }
};
</script>

<style>
.border-gradient {
  border-image: linear-gradient(45deg, #ff7e5f, #feb47b) 1;
}
</style>
