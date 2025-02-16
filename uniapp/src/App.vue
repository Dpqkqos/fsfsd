<template>
  <div class="min-h-screen bg-gray-100 p-6">
    <div class="max-w-2xl mx-auto space-y-6">
      <h1 class="text-2xl font-bold text-purple-700">
        Личная карточка ✨
      </h1>

      <UserCard :user="userData" />
      
      <div class="space-y-2" v-if="forecast">
        <h2 class="text-xl font-bold text-purple-700">Прогноз на день</h2>
        <div class="bg-purple-100 rounded-2xl p-4 text-purple-900">
          {{ forecast }}
        </div>
      </div>

      <EmotionTable 
        :emotions="emotions"
        @emotion-added="loadData"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: null,
      emotions: [],
      forecast: ''
    }
  },
  async mounted() {
    await this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const userId = this.$tg.initDataUnsafe.user?.id
        if (!userId) return

        const [userRes, emotionsRes, forecastRes] = await Promise.all([
          this.$api.getUser(userId),
          this.$api.getEmotions(userId),
          this.$api.getForecast(userId)
        ])

        this.userData = userRes.data
        this.emotions = emotionsRes.data
        this.forecast = forecastRes.data.forecast
      } catch (error) {
        this.$tg.showAlert('Ошибка загрузки данных')
      }
    }
  }
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

.bg-gradient-purple {
  background: linear-gradient(45deg, #a855f7, #9333ea);
}
</style>
