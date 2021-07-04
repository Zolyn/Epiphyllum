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
                <v-form
                  v-model="valid"
                  lazy-validation
                  @submit.prevent="jumpToNewPath"
                >
                  <v-text-field
                    v-model="inputValue"
                    :rules="[rules.required]"
                    label="更改当前路径至"
                    clearable
                  ></v-text-field>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">取消</v-btn>
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
import { Component, Vue } from 'vue-property-decorator'

type ValidateFunc = (val: string) => boolean | string

interface Rules extends Record<'required', ValidateFunc> {}

@Component
export default class PathEdit extends Vue {
  private dialog = false
  private pencil = 'mdi-pencil'
  private inputValue = '/'
  private valid = true
  private rules: Rules = {
    required: (val) => !!val || '需要填写',
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

  private mounted(): void {
    this.inputValue = this.$route.path
    this.$router.afterEach((to): void => {
      this.inputValue = to.path
    })
  }
}
</script>
