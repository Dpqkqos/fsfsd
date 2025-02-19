Вот модифицированный код с требуемыми изменениями:

```vue
<template>
  <div class="app-container">
    <!-- Профиль -->
    <transition name="slide-up" appear>
      <div class="profile-section">
        <h1 class="main-title">Личная карточка<span class="accent">✦</span></h1>
        <div class="profile-card">
          <img :src="user.avatar" class="user-avatar" alt="Аватар" />
          <div class="user-info">
            <h2 class="user-name">{{ fullName }}</h2>
            <div class="user-stats">
              <div class="stat-item">
                <span class="icon">✦</span>
                {{ user.daysOnPlatform }} дня на платформе
              </div>
              <div class="stat-item">
                <span class="icon">✦</span>
                Ваш запрос: {{ user.request }}
              </div>
              <div v-if="user.birthDate" class="stat-item">
                <span class="icon">✦</span>
                Дата рождения: {{ formattedBirthDate }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Форма регистрации -->
    <transition name="fade">
      <div 
        v-if="showRegistrationForm" 
        class="modal-overlay"
      >
        <div class="modal-content">
          <h3>Заполните ваши данные</h3>
          <div class="input-group">
            <label>Имя:</label>
            <input v-model="registrationForm.firstName" type="text">
          </div>
          <div class="input-group">
            <label>Фамилия:</label>
            <input v-model="registrationForm.lastName" type="text">
          </div>
          <div class="input-group">
            <label>Дата рождения:</label>
            <input v-model="registrationForm.birthDate" type="date">
          </div>
          <div class="input-group">
            <label>Время рождения:</label>
            <input v-model="registrationForm.birthTime" type="time">
          </div>
          <div class="modal-actions">
            <button @click="saveUserData" class="save-btn">Сохранить</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- Остальные секции остаются без изменений -->
    <!-- ... -->
  </div>
</template>

<script>
export default {
  computed: {
    fullName() {
      return [this.user.firstName, this.user.lastName].filter(Boolean).join(' ') || this.user.name
    },
    formattedBirthDate() {
      return new Date(this.user.birthDate).toLocaleDateString('ru-RU')
    },
    // ... остальные computed свойства
  },

  data() {
    return {
      showRegistrationForm: false,
      registrationForm: {
        firstName: '',
        lastName: '',
        birthDate: '',
        birthTime: ''
      },
      // ... остальные data поля
    }
  },

  mounted() {
    this.initTelegramUser()
    this.loadUserData()
    this.checkRegistration()
  },

  methods: {
    checkRegistration() {
      if (!this.user.firstName || !this.user.lastName || !this.user.birthDate) {
        this.showRegistrationForm = true
      }
    },

    saveUserData() {
      if (this.registrationForm.firstName && this.registrationForm.lastName && this.registrationForm.birthDate) {
        this.user.firstName = this.registrationForm.firstName
        this.user.lastName = this.registrationForm.lastName
        this.user.birthDate = this.registrationForm.birthDate
        this.user.birthTime = this.registrationForm.birthTime
        this.saveUserDataToStorage()
        this.showRegistrationForm = false
      }
    },

    // Модифицированный метод инициализации пользователя
    initTelegramUser() {
      if (window.Telegram?.WebApp) {
        const tg = window.Telegram.WebApp
        const user = tg.initDataUnsafe?.user
        
        if (user) {
          this.user.id = user.id
          this.user.name = [
            user.first_name,
            user.last_name,
            user.username && `@${user.username}`
          ].filter(Boolean).join(' ') || 'Пользователь'
          
          this.user.avatar = user.photo_url || this.generateAvatar(
            user.first_name || 'User'
          )
        }
        // ... остальная часть метода
      }
    },

    // ... остальные методы
  }
}
</script>

<style>
/* Базовые стили */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: linear-gradient(45deg, #ff0e6b, #ff05f7, #6c11ff);
  background-size: 400% 400%;
  animation: gradient 10s ease infinite;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
  min-height: 100vh;
  -webkit-text-size-adjust: 100%;
  -webkit-tap-highlight-color: transparent;
}

@keyframes gradient {
  0% {
    background-position: 50% 0%;
  }
  50% {
    background-position: 50% 100%;
  }
  100% {
    background-position: 50% 0%;
  }
}

.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border-radius: 16px;
}

/* Загрузчик */
.loader {
  font-size: 24px;
  text-align: center;
  padding: 20px;
  color: white;
}

/* Профиль */
.profile-section {
  text-align: center;
  margin-bottom: 20px;
}

.main-title {
  font-size: 24px;
  color: white;
}

.accent {
  color: #ffcc00;
}

.profile-card {
  display: flex;
  align-items: center;
  padding: 15px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 15px;
}

.user-info {
  text-align: left;
}

.user-name {
  font-size: 20px;
  color: white;
}

.user-stats {
  margin-top: 5px;
}

.stat-item {
  font-size: 14px;
  color: white;
  display: flex;
  align-items: center;
}

.icon {
  margin-right: 5px;
}

/* Модальные окна */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

.modal-actions {
  margin-top: 15px;
}

.request-item {
  display: block;
  width: 100%;
  padding: 10px;
  margin: 5px 0;
  border: none;
  background: #6c11ff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
}

.cancel-btn {
  background: gray;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-btn {
  background: #ff05f7;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

/* Прогноз */
.forecast-section {
  margin-top: 20px;
  text-align: center;
}

.section-title {
  font-size: 20px;
  color: white;
}

.forecast-card {
  background: rgba(255, 255, 255, 0.2);
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  margin-top: 10px;
}

.forecast-content {
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.forecast-icon {
  font-size: 24px;
  margin-right: 10px;
}

/* Эмоции */
.emotions-section {
  margin-top: 20px;
}

.emotions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.add-button {
  background: #ffcc00;
  color: black;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.emotions-table {
  margin-top: 10px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  font-weight: bold;
  color: white;
}

.emotion-row {
  display: flex;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.2);
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  color: white;
}

/* Форма регистрации */
.input-group {
  margin-bottom: 10px;
  text-align: left;
}

.input-group label {
  display: block;
  font-weight: bold;
}

.input-group input {
  width: 100%;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Анимации */
.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(40px);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.list-enter-active,
.list-leave-active {
  transition: all 0.4s ease;
}

.list-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.list-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
