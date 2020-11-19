<template>
  <v-app id="inspire" class="bodyStyle">
    <v-navigation-drawer
      v-model="drawer"
      app
      clipped
      temporary
      color=rgba(18,71,112,1.0)
    >
    <v-list>
      <v-list-item link @click="redirectTo('/osiris')">
        <v-list-item-action>
          <v-icon dark>mdi-view-dashboard</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="applyfont white--text">오시 정보</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
      <v-divider dark />
    <v-subheader dark class="mt-4 title">개인</v-subheader>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          @click="redirectTo(item.url)"
          link
          >
          <v-list-item-action>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider dark />
    <v-subheader v-if="isAdmin" class="mt-4 title white--text">Admin</v-subheader>
      <v-list v-if="isAdmin" dense>
        <v-list-item
          v-for="item in adminItems"
          :key="item.text"
          @click="redirectTo(item.url)"
          link
          >
          <v-list-item-action>
            <v-icon dark>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="white--text">{{ item.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color=rgba(26,97,153,1.0)
    >
      <v-app-bar-nav-icon dark @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="white--text">65LS 미친물개들의 오시리스관~</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>

    <v-footer app>
      <span>&copy; {{ new Date().getFullYear() }}  ||  버그문의: 그럴줄알고맴매챙겨따</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    props: {
      source: String,
    },
    data: () => ({
      drawer: null,
      logo: require("@/assets/logo.png"),
      isAdmin: false,
      items: [
        /*{
        icon: 'mdi-view-dashboard',
        text: '개인 정보',
        url: '/member'
      },*/
      {
        icon: 'mdi-view-dashboard',
        text: '물개 프사들',
        url: '/profile-pictures'
      },{
        icon: 'mdi-view-dashboard',
        text: '빛과 어둠 설명',
        url: '/kvk'
      },{
        icon: 'mdi-view-dashboard',
        text: '오시리스 신청',
        url: '/osiris-register'
      },
      ],
      adminItems: [{
        icon: 'mdi-view-dashboard',
        text: '계정 관리',
        url: '/user-edit'
      },{
        icon: 'mdi-view-dashboard',
        text: '맹원 관리',
        url: '/member-edit'
      },{
        icon: 'mdi-view-dashboard',
        text: '오시리스 관리',
        url: '/osiris-edit'
      },
      ]
    }),
    created () {
     // this.$vuetify.theme.dark = true
    },
    methods: {
      redirectTo(path){
        if (this.$route.path !== path) this.$router.push(path)
      }
    }
  }
</script>

<style>
.bodyStyle{
  font-family: "Sunflower", sans-serif !important;
  background-color: rgba(1,87,155,0.2) !important;
}
.theme--dark.v-divider {
  border-color: rgba(84,162,222,0.4) !important;
}

</style>
