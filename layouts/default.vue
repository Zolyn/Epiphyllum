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
          <v-list-item-title> 最小化 </v-list-item-title>
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
    <v-app-bar dense fixed app elevate-on-scroll>
      <v-app-bar-nav-icon id="appbar-icon" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-file-tree</v-icon>
      </v-btn>
      <color-scheme-switch></color-scheme-switch>
      <template #extension>
        <v-app-bar-nav-icon style="visibility: hidden"></v-app-bar-nav-icon>
        <v-icon>mdi-folder</v-icon>
        <bread-crumbs-nav></bread-crumbs-nav>
        <v-spacer></v-spacer>
        <path-edit></path-edit>
        <sort-menu></sort-menu>
        <view-mode-switch></view-mode-switch>
      </template>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer absolute app padless>
      <v-container>
        <v-row justify="center" align="center" class="text-center">
          <v-col>
            <span> © Zorin 💖 2021 </span>
            <br />
            <span>
              Epiphyllum ✨ 使用 <a href="https://nuxtjs.org">Nuxt</a> 及
              <a href="https://vuetifyjs.com">Vuetify</a> 构建
            </span>
          </v-col>
        </v-row>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BreadCrumbsNav from '~/components/BreadCrumbsNav.vue'
import SortMenu from '~/components/SortMenu.vue'
import PathEdit from '~/components/PathEdit.vue'
import ViewModeSwitch from '~/components/ViewModeSwitch.vue'
import ColorSchemeSwitch from '~/components/ColorSchemeSwitch.vue'

@Component({
  components: {
    BreadCrumbsNav,
    SortMenu,
    PathEdit,
    ViewModeSwitch,
    ColorSchemeSwitch,
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
  }

  private title = 'Epiphyllum'
}
</script>
