<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      app
      temporary
    >
      <v-list>
        <v-list-item>
          <v-list-item-action>
            <v-btn icon @click.stop="miniVariant = !miniVariant">
              <v-icon v-text="miniVariant ? icons.right : icons.left"></v-icon>
            </v-btn>
          </v-list-item-action>
          <v-list-item-title> Mini variant </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          nuxt
          exact
        >
          <v-list-item-action>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app elevate-on-scroll>
      <v-app-bar-nav-icon id="appbaricon" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <bread-crumbs-nav></bread-crumbs-nav>
      <v-spacer></v-spacer>
      <path-edit></path-edit>
      <view-mode></view-mode>
      <sort-menu></sort-menu>
      <v-btn icon @click="$vuetify.theme.dark = !$vuetify.theme.dark">
        <v-icon v-text="$vuetify.theme.dark ? icons.sun : icons.night"></v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BreadCrumbsNav from '~/components/BreadCrumbsNav.vue'
import SortMenu from '~/components/SortMenu.vue'
import PathEdit from '~/components/PathEdit.vue'
import ViewMode from '~/components/ViewMode.vue'

@Component({
  components: {
    BreadCrumbsNav,
    SortMenu,
    PathEdit,
    ViewMode,
  },
})
export default class DefaultLayout extends Vue {
  private drawer = false
  private items = [
    {
      icon: 'mdi-home',
      title: 'Home',
      to: '/',
    },
  ]

  private miniVariant = true
  private icons = {
    left: 'mdi-chevron-left',
    right: 'mdi-chevron-right',
    sun: 'mdi-weather-sunny',
    night: 'mdi-weather-night',
  }

  private title = 'Epiphyllum'
}
</script>
