<template>
    <div class="emotion-table">
      <button @click="openModal" class="add-button">Добавить состояние</button>
      <table>
        <thead>
          <tr>
            <th>День</th>
            <th>Эмоциональное состояние</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(emotion, index) in emotions" :key="index">
            <td>
              <div class="day-circle">{{ emotion.day }}</div>
            </td>
            <td>
              <div class="state-circle">{{ emotion.state }}</div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>Введите ваше состояние</h3>
          <input v-model="newEmotion" placeholder="Ваше состояние..." />
          <button @click="submitEmotion">Сохранить</button>
          <button @click="closeModal">Отмена</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      emotions: {
        type: Array,
        required: true,
      },
    },
    data() {
      return {
        showModal: false,
        newEmotion: '',
      };
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      submitEmotion() {
        if (this.newEmotion.trim()) {
          this.$emit('add-emotion', this.newEmotion);
          this.closeModal();
          this.newEmotion = '';
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .emotion-table {
    background: white;
  }
  
  .day-circle {
    width: 40px;
    height: 40px;
    border: 2px solid;
    border-image: linear-gradient(45deg, #ff6b6b, #d459fd) 1;
    background: white;
  }
  
  .state-circle {
    background: linear-gradient(45deg, #ff6b6b, #d459fd);
    color: white;
    width: 40px;
    height: 40px;
  }
  
  /* Анимация добавления */
  .list-enter-active {
    transition: all 0.3s ease;
  }
  .list-enter-from {
    opacity: 0;
    transform: translateX(-30px);
  }
  </style>