<template>
  <v-btn icon @click="changeColorScheme">
    <v-icon v-text="getSchemeIcon"></v-icon>
  </v-btn>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'vue-property-decorator'
import { ColorScheme } from '~/epiphyllum/utils'

@Component
export default class ColorSchemeSwitch extends Vue {
  private preferColorScheme: ColorScheme = 'system'
  private colorSchemes: ColorScheme[] = ['light', 'dark', 'system']

  private get getSchemeIcon(): string {
    if (this.preferColorScheme === 'system') {
      return 'mdi-desktop-mac'
    } else if (this.$vuetify.theme.dark) {
      return 'mdi-weather-night'
    }

    return 'mdi-weather-sunny'
  }

  private changeColorScheme(): void {
    this.colorSchemes.push(this.colorSchemes.shift() as ColorScheme)
    this.preferColorScheme = this.colorSchemes[0]
  }

  private setColorScheme(): void {
    const vuetifyTheme = this.$vuetify.theme

    if (this.preferColorScheme === 'system') {
      vuetifyTheme.dark = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches
    } else {
      vuetifyTheme.dark = this.preferColorScheme === 'dark'
    }
  }

  private registerListeners(): void {
    const that = this
    window
      .matchMedia(`(prefers-color-scheme: dark)`)
      .addEventListener('change', () => that.setColorScheme())
  }

  private mounted(): void {
    if (this.preferColorScheme === 'system') {
      this.colorSchemes.unshift(this.colorSchemes.pop() as ColorScheme)
    } else if (this.preferColorScheme === 'dark') {
      this.colorSchemes.push(this.colorSchemes.shift() as ColorScheme)
    }

    this.setColorScheme()
    this.registerListeners()
  }

  @Watch('preferColorScheme')
  private onColorSchemeChanged(): void {
    this.setColorScheme()
  }
}
</script>
