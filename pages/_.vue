<template>
  <div id="epiphyllum">
    <v-card elevation="10" rounded="lg" style="top: 2em">
      <v-row align="center" justify="center">
        <v-col cols="11">
          <v-list>
            <v-list-item>
              <bread-crumbs-nav></bread-crumbs-nav>
              <v-spacer></v-spacer>
              <sort-menu></sort-menu>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </v-col>
        <v-col cols="11">
          <v-list>
            <v-list-item-group color="primary">
              <parent-directory></parent-directory>
              <file-list-item></file-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import FileListItem from '~/components/FileListItem.vue'
import ParentDirectory from '~/components/ParentDirectory.vue'
import BreadCrumbsNav from '~/components/BreadCrumbsNav.vue'
import SortMenu from '~/components/SortMenu.vue'
import EpiphyllumFetch from '~/epiphyllum/fetch'

@Component({
  components: {
    FileListItem,
    ParentDirectory,
    BreadCrumbsNav,
    SortMenu,
  },
})
export default class FileIndexPage extends EpiphyllumFetch {}
</script>
