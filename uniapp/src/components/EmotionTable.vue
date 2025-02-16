<template>
  <div class="emotion-table">
    <button @click="showModal = true" class="add-button">+ Добавить состояние</button>
    
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <input v-model="newEmotion" placeholder="Ваше состояние...">
        <button @click="submitEmotion">Сохранить</button>
        <button @click="showModal = false">Отмена</button>
      </div>
    </div>

    <div class="table-container">
      <div v-for="emotion in emotions" :key="emotion.id" class="emotion-row">
        <div class="day-box">{{ emotion.day }}</div>
        <div class="emotion-box">{{ emotion.state }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['emotions'],
  data() {
    return {
      showModal: false,
      newEmotion: ''
    }
  },
  methods: {
    submitEmotion() {
      if (this.newEmotion.trim()) {
        this.$emit('add-emotion', this.newEmotion.trim());
        this.showModal = false;
        this.newEmotion = '';
      }
    }
  }
}
</script>

<style>
.emotion-table {
  margin-top: 24px;
}

.add-button {
  background: linear-gradient(45deg, #FF6B6B, #D459FD);
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: transform 0.2s;
}

.add-button:hover {
  transform: translateY(-1px);
}

.table-container {
  margin-top: 16px;
}

.emotion-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
}

.day-box {
  width: 48px;
  height: 48px;
  border: 2px solid;
  border-image: linear-gradient(45deg, #FF6B6B, #D459FD) 1;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: white;
}

.emotion-box {
  flex: 1;
  background: linear-gradient(45deg, #FF6B6B, #D459FD);
  color: white;
  padding: 12px;
  border-radius: 8px;
  font-weight: 500;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 80%;
  max-width: 400px;
}
</style>