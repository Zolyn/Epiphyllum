<template>
  <div id="view-mode">
    <v-btn icon @click.stop="handleDialogClick">
      <v-icon v-text="icon"></v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="600px"
      transition="dialog-bottom-transition"
    >
      <v-card>
        <v-card-title>浏览模式</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-row>
              <v-col cols="12">
                <v-checkbox
                  v-model="checkbox1"
                  prepend-icon="mdi-file"
                  label="显示文件"
                  dense
                >
                </v-checkbox>
              </v-col>
              <v-col cols="12">
                <v-checkbox
                  v-model="checkbox2"
                  prepend-icon="mdi-folder"
                  label="显示文件夹"
                  dense
                ></v-checkbox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-title>主题</v-card-title>
        <v-card-text>
          <v-container fluid>
            <v-radio-group v-model="radio" column mandatory>
              <v-radio
                v-for="{ label, value } in options"
                :key="`radio-${value}`"
                :label="label"
                :value="value"
                @click="handleRadioClick"
              ></v-radio>
            </v-radio-group>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">关闭</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import { ColorScheme } from '~/epiphyllum/utils'
import EpiphyllumStore from '~/epiphyllum/store'

interface Option {
  label: string
  value: ColorScheme
}

@Component
export default class ViewMode extends EpiphyllumStore {
  private icon = 'mdi-eye'
  private dialog = false
  private checkbox1 = true
  private checkbox2 = true
  private radio = 'system'
  private options: Option[] = [
    {
      label: '浅色',
      value: 'light',
    },
    {
      label: '深色',
      value: 'dark',
    },
    {
      label: '跟随系统',
      value: 'system',
    },
  ]

  private handleDialogClick(): void {
    this.radio = this.preferColorScheme
    this.dialog = true
  }

  private handleRadioClick(): void {
    this.$store.commit('epiphyllum/changeColorScheme', this.radio)
  }
}
</script>
