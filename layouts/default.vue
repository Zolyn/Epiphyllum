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
        <v-expand-x-transition>
          <sort-menu v-show="!(viewMode === 'table')"></sort-menu>
        </v-expand-x-transition>
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
import { Component } from 'vue-property-decorator'
import BreadCrumbsNav from '~/components/NavBar/BreadCrumbsNav.vue'
import SortMenu from '~/components/NavBar/SortMenu.vue'
import PathEdit from '~/components/NavBar/PathEdit.vue'
import ViewModeSwitch from '~/components/NavBar/ViewModeSwitch.vue'
import ColorSchemeSwitch from '~/components/NavBar/ColorSchemeSwitch.vue'
import EpiphyllumStore from '~/epiphyllum/store'

@Component({
  components: {
    BreadCrumbsNav,
    SortMenu,
    PathEdit,
    ViewModeSwitch,
    ColorSchemeSwitch,
  },
})
export default class DefaultLayout extends EpiphyllumStore {
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

  // 监听路径变化来更新state
  private mounted(): void {
    this.$router.afterEach((to) => {
      this.$store.commit('epiphyllum/updatePath', to.path)
    })
  }
}
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s;
}

.page-enter,
.page-leave-to {
  opacity: 0;
}

.slide-bottom-enter-active,
.slide-bottom-leave-active {
  transition: opacity 0.25s ease-in-out, transform 0.25s ease-in-out;
}

.slide-bottom-enter,
.slide-bottom-leave-to {
  opacity: 0;
  transform: translate3d(0, 15px, 0);
}
</style>
