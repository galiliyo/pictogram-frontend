<template>
  <div class>
    <AppHeader class="colorBg" />

    <section v-if="post && owner" class="post-details main-container">
      <Login v-if="loginModal" />

      <div class="post-header">
        <div class="post-title">
          <h2 class="mb-1">
            {{post.title}},
            <span>{{post.destination}}</span>
          </h2>
          <h5>{{post.start | moment("L")}} - {{post.end | moment("L")}}</h5>
        </div>
        <div class="controls">
          <i
            class="icon icon-lg btn-icon icon-pencil-write"
            v-if="loggedInUser && loggedInUser._id === post.owner._id"
            @click="goEdit"
          ></i>
          <i
            class="icon icon-lg btn-icon icon-bin-1 ml-2"
            v-if="loggedInUser && loggedInUser._id === post.owner._id"
            @click="remove(post)"
          ></i>
          <h2 class="msg-join" v-if="!loggedInUser">LOGIN TO JOIN US!</h2>
          <button
            class="btn-main"
            v-if="loggedInUser && owner._id !== loggedInUser._id && !joining && !pending"
            @click="joinTrip"
          >join</button>
          <button
            class="btn-main"
            v-if="loggedInUser && owner._id !== loggedInUser._id && joining"
            @click="leaveTrip"
          >Leave</button>
          <button
            class="btn-main"
            v-if="loggedInUser && owner._id !== loggedInUser._id && pending"
            @click="leaveTrip"
          >Cancel request</button>
        </div>
      </div>

      <div class="post-desc flex column">
          <p class>{{post.desc}}</p>
          
          <div class="post-types">
            <IconChip  v-for="(type, i) in post.types" :key="i" :tripType="type"></IconChip>
        </div>

        <div class="bottom flex mt-4">
          <div class="bottom-organizer light flex">
            <img class="user-img-desc" :src="owner.imgUrl" />
            <div>
              <div class="text-grey">Organizer</div>
              <div class="medium">{{owner.firstName}} {{owner.lastName}}</div>
            </div>
          </div>

          <div class="bottom-meeting-place ml-2">
            <div class="text-grey light">Meeting at</div>
            <div class="medium flex">
              <i class="icon icon-pin-location-1 mr-2"></i>
              {{post.meetingPoint}}
            </div>
            <div class="medium flex">
              <i class="icon icon-time-clock-circle mr-2"></i>
              {{post.meetingTime}}
            </div>
          </div>
        </div>
      </div>
      <div class="map card">
        <google-map :location="post.destination" />
      </div>
      <!-- <div class="post-plan"></div> -->
      <div class="post-weather">
        <!-- <h3>Wether</h3> -->
        <Weather :location="post.destination" />
        <Weather :location="post.destination" @weather="setWeather" />
        <template v-if="forecastWeather">
          <div class="render-weather">
            <div v-for="(item,i) in forecastWeather" :key="i">
              <img class="weather-img" width="50" :src="item.img" />
              <p class="weather-temp">{{item.minTemp}}/{{item.maxTemp}}</p>
            </div>
          </div>
        </template>
      </div>
      <div class="post-participant">
        <button class="btn-participating" @click="toggleParticipantsModal">
          Participating
          <span>{{participantsList.length}}/{{post.participantCap}}</span>
        </button>
        <button
          class="btn-pending"
          @click="showPendingModal"
          v-if="loggedInUser && owner._id === loggedInUser._id"
        >
          Pending
          <span class="waitingList-length" v-if="waitingList">{{waitingList.length}}</span>
        </button>
        <ul class="participating-list" v-if="showParticipating">
          <Participants v-for="(user,i) in participantsList" :key="i" class="flex" :user="user" />
        </ul>
        <ul
          class="pending-list"
          v-if="showPending && loggedInUser && owner._id === loggedInUser._id"
        >
          <Pending
            v-for="(user,i) in waitingList"
            :key="i"
            class="flex"
            :user="user"
            :owner="owner"
            :post="post"
          />
        </ul>
      </div>
      <div class="post-chat">
        <TripChat :post="post" />
      </div>
    </section>
  </div>
</template>

<script>
import AppHeader from "../components/Header";
import GoogleMap from "../components/GoogleMap";
import Weather from "../components/Weather";
import TripChat from "../components/TripChat";
import Login from "../components/Login";
import Participants from "../components/Participants";
import Pending from "../components/Pending";
import IconChip from "../components/IconChip";

export default {
  data() {
    return {
      post: null,
      owner: null,
      forecastWeather: null,
      showParticipating: true,
      showPending: false
    };
  },
  async created() {
    const tripId = this.$route.params.id;
    try {
      this.post = await this.$store.dispatch({ type: "getById", tripId });
      this.owner = await this.$store.dispatch({
        type: "getUserById",
        id: this.post.owner._id
      });
      await this.$store.dispatch({
        type: "getUsers",
        tripId: { tripId: this.post._id }
      });
    } catch (err) {
      console.log("in created", err);
    }
  },
  computed: {
    loginModal() {
      return this.$store.getters.loginModal;
    },
    loggedInUser() {
      return this.$store.getters.loggedInUser;
    },
    waitingList() {
      return this.$store.getters.waitingList;
    },
    participantsList() {
      return this.$store.getters.participantsList;
    },
    joining() {
      var alreadyJoining = this.loggedInUser.joining.find(
        currTrip => currTrip.tripId === this.post._id
      );
      console.log(alreadyJoining);

      if (alreadyJoining) return true;
      else return false;
    },
    pending() {
      var pendingRequest = this.loggedInUser.pending.find(
        currTrip => currTrip.tripId === this.post._id
      );
      console.log(pendingRequest);
      if (pendingRequest) return true;
      else return false;
    }
  },
  methods: {
    goEdit() {
      this.$router.push(`/TripEdit/${this.post._id}`);
    },
    toggleParticipantsModal() {
      this.showParticipating = !this.showParticipating;
      this.showPending = !this.showPending;
    },
    showPendingModal() {
      this.showPending = !this.showPending;
      this.showParticipating = !this.showParticipating;
    },
    async remove(post) {
      const idx = this.owner.tripsOwner.findIndex(
        currTrip => currTrip.tripId === post._id
      );
      try {
        await this.$store.dispatch({ type: "remove", post });
        this.owner.tripsOwner.splice(idx, 1);
        await this.$store.dispatch({ type: "updateUser", user: this.owner });
        this.$router.push("/");
      } catch (err) {
        console.log("not remove", err);
      }
    },
    async joinTrip() {
      // find the post in tripsOwner list of the user
      const tripToUpdate = this.owner.tripsOwner.find(
        currTrip => currTrip.tripId === this.post._id
      );
      tripToUpdate.waitingList.push({
        userId: this.loggedInUser._id
      });
      this.loggedInUser.pending.push({ tripId: this.post._id });
      // socket join
      try {
        await this.$store.dispatch({
          type: "joinTrip",
          user: this.loggedInUser,
          owner: this.owner
        });
      } catch (err) {
        console.log(err);
      }

      try {
        await this.$store.dispatch({ type: "updateUser", user: this.owner });
        await this.$store.dispatch({
          type: "updateUser",
          user: this.loggedInUser
        });
        await this.$store.dispatch({
          type: "getUsers",
          tripId: { tripId: this.post._id }
        });
      } catch (err) {
        console.log("not update", err);
      }
    },
    async leaveTrip() {
      if (!this.loggedInUser) {
        // swall
        return;
      }
      // find the post in tripsOwner list of the user
      const tripToUpdate = this.owner.tripsOwner.find(
        currTrip => currTrip.tripId === this.post._id
      );
      const idxInWaitingList = tripToUpdate.waitingList.findIndex(
        currTrip => currTrip.userId === this.loggedInUser._id
      );
      if (idxInWaitingList >= 0)
        tripToUpdate.waitingList.splice(idxInWaitingList, 1);

      const idxInPending = this.loggedInUser.pending.findIndex(
        currTrip => currTrip.tripId === this.post._id
      );
      if (idxInPending >= 0) this.loggedInUser.pending.splice(idxInPending, 1);

      const idxInJoining = this.loggedInUser.joining.findIndex(
        currTrip => currTrip.tripId === this.post._id
      );
      if (idxInJoining >= 0) this.loggedInUser.joining.splice(idxInJoining, 1);

      const idxInParticipants = tripToUpdate.participants.findIndex(
        currUser => currUser.userId === this.loggedInUser._id
      );
      if (idxInParticipants >= 0)
        tripToUpdate.participants.splice(idxInParticipants, 1);

      try {
        await this.$store.dispatch({ type: "updateUser", user: this.owner });
        await this.$store.dispatch({
          type: "updateUser",
          user: this.loggedInUser
        });
        await this.$store.dispatch({
          type: "getUsers",
          tripId: { tripId: this.post._id }
        });
      } catch (err) {
        console.log("not update", err);
      }
    },
    setWeather(weather) {
      this.forecastWeather = weather;
    }
  },
  components: {
    AppHeader,
    GoogleMap,
    Weather,
    TripChat,
    Login,
    Participants,
    Pending,
    IconChip
  }
};
</script>




<style lang="scss" scoped>
@import "../styles/views/_TripDetails.scss";
</style>