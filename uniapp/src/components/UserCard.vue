<template>
  <div class="user-card">
    <img :src="user.avatar" class="avatar" alt="Аватар">
    <div class="info">
      <h2>{{ user.name }}</h2>
      <p>На платформе: {{ user.daysOnPlatform }} дней</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>

<style>
.user-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0,0,0,0.1);
}

.avatar {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 16px;
  border: 2px solid transparent;
  background-image: linear-gradient(white, white), 
                    linear-gradient(45deg, #FF6B6B, #D459FD);
  background-origin: border-box;
  background-clip: content-box, border-box;
}

.info h2 {
  margin: 0;
  font-size: 1.25rem;
  color: #333;
}

.info p {
  margin: 4px 0 0;
  color: #666;
}
</style>