<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <script src="https://telegram.org/js/telegram-web-app.js"></script>
    
    <div class="max-w-2xl mx-auto space-y-6">
      <!-- Заголовок -->
      <h1 class="text-2xl font-bold text-purple-700 flex items-center gap-2">
        Личная карточка
        <span class="text-purple-400 text-lg">✨</span>
      </h1>

      <!-- Профиль -->
      <div class="bg-gradient-purple rounded-2xl p-4 text-white" v-if="user">
        <div class="flex items-center gap-4">
          <img
            :src="user.avatar"
            alt="Profile"
            class="w-16 h-16 rounded-full object-cover border-2 border-white"
          />
          <div class="space-y-2">
            <h2 class="text-xl font-semibold">{{ user.name }}</h2>
            <div class="space-y-1">
              <p class="flex items-center gap-2">
                <PlusIcon class="w-4 h-4" />
                {{ user.daysOnPlatform }} дней на платформе
              </p>
              <p class="flex items-center gap-2">
                <PlusIcon class="w-4 h-4" />
                Ваш запрос: {{ user.lastRequest }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- Прогноз -->
      <div class="space-y-2" v-if="forecast">
        <h2 class="text-xl font-bold text-purple-700">Прогноз на день</h2>
        <div class="bg-gradient-purple-light rounded-2xl p-4 flex items-center gap-3">
          <SearchIcon class="w-6 h-4 text-white" />
          <p class="text-white">{{ forecast }}</p>
        </div>
      </div>

      <!-- Эмоции -->
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-bold text-purple-700 flex items-center gap-2">
            Эмоциональный дневник
            <span class="text-purple-400 text-lg">✨</span>
          </h2>
          <button
            @click="showModal = true"
            class="bg-gradient-purple text-white px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            + Новая запись
          </button>
        </div>

        <div class="grid grid-cols-[100px,1fr] gap-4">
          <div class="header-cell">День</div>
          <div class="header-cell">Состояние</div>

          <template v-for="(emotion, index) in emotions" :key="emotion.id">
            <div class="day-cell">{{ index + 1 }}</div>
            <div class="emotion-cell">{{ emotion.state }}</div>
          </template>
        </div>
      </div>

      <!-- Модальное окно -->
      <div v-if="showModal" class="fixed inset-0 bg-black/50 flex items-center justify-center">
        <div class="bg-white rounded-2xl p-6 w-full max-w-md mx-4">
          <h3 class="text-xl font-bold mb-4">Новая запись</h3>
          <textarea
            v-model="newEmotion"
            class="w-full border rounded-xl p-3 mb-4 min-h-[100px]"
            placeholder="Опишите ваше состояние..."
          ></textarea>
          <div class="flex gap-3">
            <button
              @click="saveEmotion"
              class="bg-gradient-purple text-white flex-1 py-3 rounded-xl hover:opacity-90"
            >
              Сохранить
            </button>
            <button
              @click="showModal = false"
              class="bg-gray-100 flex-1 py-3 rounded-xl hover:bg-gray-200"
            >
              Отмена
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'
import axios from 'axios'

const user = ref(null)
const emotions = ref([])
const forecast = ref('')
const showModal = ref(false)
const newEmotion = ref('')

onMounted(async () => {
  const tg = window.Telegram.WebApp
  tg.expand()
  tg.ready()

  try {
    // Регистрация пользователя
    await axios.post(`/register/${tg.initDataUnsafe.user.id}`, {
      name: tg.initDataUnsafe.user.first_name,
      avatar: tg.initDataUnsafe.user.photo_url,
    })

    // Загрузка данных
    const [userRes, emotionsRes, forecastRes] = await Promise.all([
      axios.get(`/user/${tg.initDataUnsafe.user.id}`),
      axios.get(`/emotions/${tg.initDataUnsafe.user.id}`),
      axios.get(`/forecast/${tg.initDataUnsafe.user.id}`)
    ])

    user.value = userRes.data
    emotions.value = emotionsRes.data
    forecast.value = forecastRes.data.forecast
  } catch (error) {
    console.error('Ошибка загрузки:', error)
    tg.showAlert('Ошибка загрузки данных')
  }
})

const saveEmotion = async () => {
  try {
    const response = await axios.post(`/emotion/${window.Telegram.WebApp.initDataUnsafe.user.id}`, {
      emotion: newEmotion.value,
      date: new Date().toISOString().split('T')[0]
    })

    emotions.value.push(response.data)
    showModal.value = false
    newEmotion.value = ''
  } catch (error) {
    console.error('Ошибка сохранения:', error)
    window.Telegram.WebApp.showAlert('Ошибка сохранения записи')
  }
}
</script>

<style>
.bg-gradient-purple {
  background: linear-gradient(45deg, #a855f7, #9333ea);
}

.bg-gradient-purple-light {
  background: linear-gradient(45deg, #c084fc, #a855f7);
}

.header-cell {
  border: 2px solid #d8b4fe;
  border-radius: 1rem;
  padding: 0.75rem;
  text-align: center;
  font-weight: 600;
  color: #9333ea;
}

.day-cell {
  border: 2px solid #d8b4fe;
  border-radius: 1rem;
  padding: 0.75rem;
  text-align: center;
  font-weight: 700;
  color: #9333ea;
}

.emotion-cell {
  background: linear-gradient(45deg, #c084fc, #a855f7);
  color: white;
  border-radius: 1rem;
  padding: 0.75rem;
}
</style>