<template>
  <div class="user-card">
    <div class="card-header">
      <img :src="user.avatar" alt="Аватар" class="avatar" />
      <div class="info">
        <h2>{{ user.name }}</h2>
        <p>На платформе: {{ user.daysOnPlatform }} дней</p>
      </div>
    </div>
    <div class="forecast">
      <p><strong>Прогноз на день:</strong> {{ user.dailyForecast }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(45deg, #ff7e5f, #feb47b);
  border-radius: 20px;
  padding: 20px;
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.card-header {
  display: flex;
  align-items: center;
}

.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 10px;
}

.info {
  text-align: left;
}

.forecast {
  margin-top: 10px;
}
</style>