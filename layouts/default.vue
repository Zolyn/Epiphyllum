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
      <v-app-bar-nav-icon id="appbaricon" @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-file-tree</v-icon>
      </v-btn>
      <v-btn icon @click="changeColorScheme">
        <v-icon v-text="getSchemeIcon"></v-icon>
      </v-btn>
      <template #extension>
        <v-app-bar-nav-icon style="visibility: hidden"></v-app-bar-nav-icon>
        <v-icon>mdi-folder</v-icon>
        <bread-crumbs-nav></bread-crumbs-nav>
        <v-spacer></v-spacer>
        <path-edit></path-edit>
        <sort-menu></sort-menu>
        <view-mode></view-mode>
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
import { Component, Watch } from 'vue-property-decorator'
import BreadCrumbsNav from '~/components/BreadCrumbsNav.vue'
import SortMenu from '~/components/SortMenu.vue'
import PathEdit from '~/components/PathEdit.vue'
import ViewMode from '~/components/ViewMode.vue'
import EpiphyllumStore from '~/epiphyllum/store'
import { ColorScheme } from '~/epiphyllum/utils'

@Component({
  components: {
    BreadCrumbsNav,
    SortMenu,
    PathEdit,
    ViewMode,
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

  private colorSchemes = ['light', 'dark', 'system']

  private get getSchemeIcon(): string {
    if (this.preferColorScheme === 'system') {
      return 'mdi-desktop-mac'
    } else if (this.$vuetify.theme.dark) {
      return 'mdi-weather-night'
    }

    return 'mdi-weather-sunny'
  }

  private title = 'Epiphyllum'

  private changeColorScheme(): void {
    this.colorSchemes.push(this.colorSchemes.shift() as string)
    this.$store.commit('epiphyllum/changeColorScheme', this.colorSchemes[0])
  }

  private getSystemColorScheme(): ColorScheme {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark'
    } else {
      return 'light'
    }
  }

  private setColorScheme(scheme: ColorScheme): void {
    if (scheme === 'system') {
      this.$vuetify.theme.dark = this.getSystemColorScheme() === 'dark'
    } else {
      this.$vuetify.theme.dark = scheme === 'dark'
    }
  }

  private mounted(): void {
    const that = this
    if (this.preferColorScheme === 'system') {
      this.colorSchemes.unshift(this.colorSchemes.pop() as string)
    } else if (this.preferColorScheme === 'dark') {
      this.colorSchemes.push(this.colorSchemes.shift() as string)
    }

    this.setColorScheme(this.preferColorScheme)
    window
      .matchMedia('(prefers-color-scheme)')
      .addEventListener('change', () => {
        if (that.preferColorScheme === 'system') {
          that.setColorScheme(that.preferColorScheme)
        }
      })
  }

  @Watch('preferColorScheme')
  private onColorSchemeChanged(): void {
    this.setColorScheme(this.preferColorScheme)
  }
}
</script>
