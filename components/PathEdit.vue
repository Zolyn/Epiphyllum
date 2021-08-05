<template>
  <div id="path-edit">
    <v-btn icon @click.stop="dialog = true">
      <v-icon v-text="pencil"></v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>路径编辑</v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="12">
                <v-autocomplete
                  v-model="inputValue"
                  :items="pathList"
                  label="更改当前路径至"
                  prepend-icon="mdi-folder"
                  :menu-props="menuProps"
                  :rules="rules"
                  hide-no-data
                  open-on-clear
                  clearable
                  @update:error="updateStatus"
                >
                </v-autocomplete>
                <!--                <v-form-->
                <!--                  v-model="valid"-->
                <!--                  lazy-validation-->
                <!--                  @submit.prevent="jumpToNewPath"-->
                <!--                >-->
                <!--                  <v-text-field-->
                <!--                    v-model="inputValue"-->
                <!--                    :rules="[rules.required]"-->
                <!--                    label="更改当前路径至"-->
                <!--                    prepend-icon="mdi-folder"-->
                <!--                    clearable-->
                <!--                  ></v-text-field>-->
                <!--                </v-form>-->
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="cancel">取消</v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!valid"
            @click="jumpToNewPath"
            >跳转！</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { resolve } from 'path'
import { Component, Watch } from 'vue-property-decorator'
import EpiphyllumStore from '~/epiphyllum/store'

type ValidateFunc = (val: string) => boolean | string

@Component
export default class PathEdit extends EpiphyllumStore {
  private dialog = false
  private pencil = 'mdi-folder-edit'
  private inputValue = '/'
  private valid = true
  private rules: ValidateFunc[] = [(val) => !!val || '需要填写']

  private menuProps = {
    transition: 'slide-y-transition',
  }

  private jumpToNewPath(): void {
    if (!this.valid) {
      return
    }

    this.dialog = false
    this.$nextTick(() => {
      this.$router.push(resolve(this.inputValue))
    })
  }

  private cancel(): void {
    this.inputValue = this.currentPath
    this.dialog = false
  }

  private updateStatus(hasError: boolean): void {
    this.valid = !hasError
  }

  @Watch('currentPath')
  private onPathChanged(): void {
    console.log('Path changed.')
    this.inputValue = this.currentPath
  }
}
</script>
