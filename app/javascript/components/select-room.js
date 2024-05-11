import { createApp, ref, reactive, onMounted } from 'vue';

const SelectRoom = {
  template: `
    <form v-if="selected === 0">
      <div v-for="room in rooms">
        <label :for="room.id">{{room.name}}：</label>
        <input type="radio" :id="room.id" v-model="selected" @change="onchange" :value="room.id" />
      </div>
    </form>
    <div v-if="selected > 0">選択したRoomID:{{selected}}　ルームprofile:{{room.profile}}</div><br />
    <button @click="selectAgain" class="rounded-lg py-3 px-5 text-white inline-block font-medium cursor-pointer bg-red-300">Select again</button>
  `,
  setup() {
    const rooms = ref([]);
    const selected = ref(0);
    const room = reactive({});

    const getRooms = () => {
      fetch('/rooms.json')
        .then((response) => response.json())
        .then((data) => {
          rooms.value = data;
          console.log(data);
        });
    };

    const onchange = () => {
      console.log(`selected ${selected.value}`);
      const selectedRoom = rooms.value.find(({ id }) => id === selected.value);
      room.id = selectedRoom.id;
      room.name = selectedRoom.name;
      room.profile = selectedRoom.profile;
      console.log(`room object ${JSON.stringify(room)}`);
    };

    const selectAgain = () => {
      selected.value = 0;
    };

    onMounted(getRooms);

    return {
      rooms,
      selected,
      room,
      getRooms,
      onchange,
      selectAgain,
    };
  },
};

const app = createApp({
  components: {
    'select-room': SelectRoom,
  },
});

app.mount('#select-room');
