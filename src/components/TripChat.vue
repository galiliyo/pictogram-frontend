<template>
  <section v-if="chat && post" class="post-chat">
    <div ref="msg" class="group-chat">
      <ul v-if="loggedInUser">
        <li v-for="(msg, i) in chat.msgs" :key="i">{{msg.from}}: {{msg.txt}}</li>
        <li v-if="typingMsg">{{typingMsg.from}} {{typingMsg.txt}}</li>
      </ul>
    </div>

    <form @submit.prevent="sendMsg" class="new-msg-area flex">
      <input
        @input="sendTyping"
        @keyup="stopTyping"
        type="text"
        class="new-msg-input"
        :placeholder="placeholder"
        :disabled="!loggedInUser"
        v-model="msg"
      />
      <i class="material-icons" :disabled="!loggedInUser" type="submit">send</i>
    </form>
  </section>
</template>

<script>
export default {
  props: {
    post: Object
  },
  data() {
    return {
      msg: "",
      chat: null,
      // isTyping: false,
      timeOut: ""
    };
  },
  async created() {
    try {
      this.chat = await this.$store.dispatch({
        type: "getChat",
        id: this.post.chat._id
      });
      this.$store.dispatch({
        type: "chatJoin",
        chat: this.chat,
        user: this.loggedInUser
      });
    } catch (err) {
      console.log("cant get the chat", err);
    }
  },
  computed: {
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    placeholder() {
      if (!this.loggedInUser)
        return "Connect and start chatting with the group members";
      else return "Type a message...";
    },
    typingMsg() {
      return this.$store.getters.typingMsg;
    }
  },
  methods: {
    sendMsg() {
      this.$store.dispatch({
        type: "sendMsg",
        chat: this.chat,
        user: this.loggedInUser,
        msg: this.msg
      });
      this.$refs.msg.scrollTop = this.$refs.msg.scrollHeight;
      this.msg = "";
    },
    async sendTyping() {
      // this.isTyping = true;
      clearTimeout(this.timeOut);
      // if (this.isTyping) {
        await this.$store.dispatch({
          type: "sendTyping",
          chat: this.chat,
          user: this.loggedInUser,
        });
        this.$refs.msg.scrollTop = this.$refs.msg.scrollHeight;
      // }
    },
    stopTyping() {
      clearTimeout(this.timeOut);
      this.timeOut = setTimeout(async () => {
        this.isTyping = false;
        await this.$store.dispatch({
          type: "stopTyping",
          chat: this.chat,
          user: this.loggedInUser,
        });
      }, 1000);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../styles/components/_TripChat";
</style>