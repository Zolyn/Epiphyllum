<template>
  <div id="path-edit">
    <v-btn icon @click.stop="dialog = true">
      <v-icon v-text="pencil"></v-icon>
    </v-btn>
    <v-dialog v-model="dialog" max-width="600px" persistent>
      <v-card>
        <v-card-title>Path editing</v-card-title>
        <v-card-text>
          <v-container>
            <v-row justify="center" align="center">
              <v-col cols="12">
                <v-text-field
                  v-model="inputValue"
                  label="Change path to"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false"
            >Cancel</v-btn
          >
          <v-btn color="blue darken-1" text @click="jumpToNewPath">Jump!</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PathEdit extends Vue {
  private dialog = false
  private pencil = 'mdi-pencil'
  private inputValue = '/'

  private jumpToNewPath(): void {
    this.dialog = false
    this.$nextTick(() => {
      this.$router.push(this.inputValue)
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
