<template>
  <div id="image-preview">
    <v-card-text>
      <v-img :src="downloadLink" aspect-ratio="1.7778" contain>
        <template #placeholder>
          <v-skeleton-loader type="image"></v-skeleton-loader>
        </template>
      </v-img>
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Component } from 'vue-property-decorator'
import EpiphyllumStore from '~/epiphyllum/store'

@Component
export default class ImagePreview extends EpiphyllumStore {}
</script>
