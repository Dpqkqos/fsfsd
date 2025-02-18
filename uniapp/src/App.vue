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
/* Добавленные стили для градиентных рамок */
.profile-card {
  position: relative;
  background: white;
  border-radius: 16px;
  padding: 2px;
}

.profile-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border-radius: 16px;
  padding: 2px;
  background: linear-gradient(135deg, #B566FF, #9C4FFF);
  -webkit-mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  mask: 
     linear-gradient(#fff 0 0) content-box, 
     linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

.profile-card > * {
  position: relative;
  z-index: 1;
  background: white;
  border-radius: 14px;
  padding: 1.5rem;
}

/* Перенос текста */
.user-name {
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.emotion-col {
  white-space: pre-wrap;
  word-break: break-word;
}

/* Стили для формы регистрации */
.input-group {
  margin-bottom: 1rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  color: #6B7280;
}

.input-group input {
  width: 100%;
  padding: 0.8rem;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  font-family: inherit;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background: #ffffff;
  font-family: 'Roboto', sans-serif;
  line-height: 1.6;
}

.app-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
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
  position: absolute;
}

.list-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-move {
  transition: transform 0.4s ease;
}

/* Стили профиля */
.profile-section {
  margin-bottom: 2rem;
}

.main-title {
  color: #8B3DFF;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
}

.accent {
  color: #B566FF;
  margin-left: 0.5rem;
}

.profile-card {
  background: linear-gradient(135deg, #B566FF, #9C4FFF);
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  gap: 1.5rem;
  color: white;
}

.user-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 2px solid white;
  flex-shrink: 0;
  object-fit: cover;
}

.user-info {
  min-width: 0;
}

.user-name {
  font-size: 1.4rem;
  margin-bottom: 0.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-stats {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
}

.icon {
  color: #FFD700;
}

/* Стили прогноза */
.forecast-section {
  margin-bottom: 2rem;
}

.section-title {
  color: #8B3DFF;
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.forecast-card {
  background: linear-gradient(135deg, #B566FF, #9C4FFF);
  border-radius: 16px;
  padding: 1.5rem;
  color: white;
}

.forecast-content {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.forecast-icon {
  font-size: 1.8rem;
}

/* Стили таблицы эмоций */
.emotions-section {
  margin-top: 2rem;
}

.emotions-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.add-button {
  background: linear-gradient(135deg, #B566FF, #9C4FFF);
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  cursor: pointer;
  transition: transform 0.2s;
}

.add-button:hover {
  transform: scale(1.05);
}

.emotions-table {
  border: 1px solid #E5E7EB;
  border-radius: 12px;
  overflow: hidden;
  position: relative;
}

.emotion-row {
  display: flex;
  padding: 1rem;
  border-top: 1px solid #E5E7EB;
  background: white;
}

.day-col {
  width: 20%;
  text-align: center;
  font-weight: 500;
}

.emotion-col {
  width: 80%;
  padding-left: 1rem;
}

/* Модальное окно */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(2px);
}

.modal-content {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  max-height: 90vh;
  overflow-y: auto;
}

.modal-content h3 {
  margin-bottom: 1.5rem;
  color: #8B3DFF;
}

textarea {
  width: 100%;
  height: 120px;
  padding: 0.8rem;
  border: 2px solid #E5E7EB;
  border-radius: 8px;
  margin-bottom: 1.5rem;
  resize: none;
  font-family: inherit;
  scroll-margin-bottom: 60px;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  transition: transform 0.3s ease;
}

.modal-actions.keyboard-open {
  transform: translateY(-50vh);
  padding-bottom: env(safe-area-inset-bottom);
}

.table-header {
  display: flex;
  padding: 12px;
  background: #F9FAFB;
  border-bottom: 1px solid #E5E7EB;
  font-weight: 500;
  color: #6B7280;
}

.day-col {
  border: 2px solid;
  border-radius: 5px;
  text-align: center;
}

.emotion-col {
  border: 2px solid;
  border-radius: 5px;
  text-align: center;
}

.save-btn {
  background: #8B3DFF;
  color: white;
  border: none;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: opacity 0.2s;
}

.save-btn:hover {
  opacity: 0.9;
}

.cancel-btn {
  background: none;
  border: 2px solid #E5E7EB;
  padding: 0.6rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s;
}

.cancel-btn:hover {
  background: #F8FAFC;
}
</style>
