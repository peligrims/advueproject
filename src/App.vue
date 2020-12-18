<template>
  <v-app>
  <v-card  height="1300">
    <v-app-bar app color="primary">
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" class="pointer">Ad application</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items >
      <v-btn color="primary" v-for="item in items" :key="item.text" :to="item.link"><v-icon>{{item.icon}}</v-icon>{{item.text}}</v-btn>
        <v-btn  @click="onLogout" text v-if="isUserLoggedIn"><v-icon left>mdi-exit-to-app</v-icon>Logout</v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-navigation-drawer v-model="drawer" absolute bottom temporary>
      <v-list nav dense>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
          <v-list-item-icon>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-icon>
          <v-list-item-title>{{item.text}}</v-list-item-title>
        </v-list-item>
      </v-list>
      <v-list-item v-if="isUserLoggedIn" @click="onLogout">
        <v-list-item-action>
          <v-icon>mdi-exit-to-app</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="'Logout'"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-card>
    <template v-if="error">
      <v-snackbar
          :timeout="5000"
          :multi-line="true"
          color="error"
          @input="closeError"
          :value="true"
      >
        {{error}}
        <v-btn text dark @click.native="closeError">Close</v-btn>
      </v-snackbar>
    </template>
    </v-app>
</template>
<script>
export default {

  data () {
    return {
      drawer: false,

    }
  },
  computed: {
    error () {
      return this.$store.getters.error
    },
    isUserLoggedIn () {
      return this.$store.getters.isUserLoggedIn
    },
    items () {
      if (this.isUserLoggedIn) {
        return [
          {text: 'Orders', icon: 'mdi-bookmark', link: '/orders'},
          {text: 'New ad', icon: 'mdi-note-plus', link: '/new'},
          {text: 'My ads', icon: 'mdi-playlist-check', link: '/list'}
        ]
      }

      return [
        {text: 'Login', icon: 'mdi-lock', link: '/login'},
        {text: 'Registration', icon: 'mdi-account', link: '/registration'}
      ]
    }
  },
  methods: {
    closeError () {
      this.$store.dispatch('clearError')
    },
    onLogout () {
      this.$store.dispatch('logoutUser')
      this.$router.push('/')
    }
  }
}
</script>
<style scoped>
.pointer {
  cursor: pointer;
}
</style>
