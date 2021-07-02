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
            <v-divider></v-divider>
          </v-col>
        </v-row>
      </v-container>
      <div id="footer" class="text-center">
        <span> © Zorin 💖 2021 </span>
        <br />
        <span>
          Epiphyllum ✨ Built with <a href="https://nuxtjs.org">Nuxt</a> and
          <a href="https://vuetifyjs.com">Vuetify</a>
        </span>
        <br />
        <span style="visibility: hidden">Fillblock</span>
      </div>
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
