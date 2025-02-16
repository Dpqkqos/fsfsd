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
    margin-top: 20px;
  }
  
  .add-button {
    background: linear-gradient(45deg, #ff7e5f, #feb47b);
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 20px;
    cursor: pointer;
    margin-bottom: 20px;
    transition: transform 0.2s;
  }
  
  .add-button:hover {
    transform: scale(1.05);
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  th, td {
    text-align: center;
    padding: 10px;
  }
  
  .day-circle, .state-circle {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    background: white;
    color: black;
    text-align: center;
    font-weight: bold;
    transition: transform 0.2s;
  }
  
  .day-circle:hover, .state-circle:hover {
    transform: scale(1.1);
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    animation: fadeIn 0.3s ease-in-out;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    color: black;
  }
  
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  </style>