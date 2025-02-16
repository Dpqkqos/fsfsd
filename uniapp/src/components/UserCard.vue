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
    background: rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 20px;
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    animation: fadeIn 1s ease-in-out;
  }
  
  .card-header {
    display: flex;
    align-items: center;
  }
  
  .avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    margin-right: 20px;
    border: 2px solid white;
  }
  
  .info {
    text-align: left;
  }
  
  .forecast {
    margin-top: 10px;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  </style>