<template>
  <div id="epiphyllum">
    <v-card elevation="10" rounded="lg">
      <v-container>
        <v-row align="center" justify="center">
          <v-col cols="11">
            <v-list>
              <v-list-item-group color="primary">
                <parent-directory></parent-directory>
                <file-list-item></file-list-item>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import FileListItem from '~/components/FileListItem.vue'
import ParentDirectory from '~/components/ParentDirectory.vue'
import EpiphyllumFetch from '~/epiphyllum/fetch'

@Component({
  components: {
    FileListItem,
    ParentDirectory,
  },
})
export default class FileIndexPage extends EpiphyllumFetch {}
</script>
