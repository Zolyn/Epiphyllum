<template>
  <v-breadcrumbs :items="breadcrumbs" large>
    <template #divider>
      <v-icon v-text="arrow"></v-icon>
    </template>
    <template #item="{ item }">
      <v-breadcrumbs-item
        :href="item.href"
        :disabled="item.disabled"
        @click.prevent="$router.push(item.href)"
      >
        {{ item.text }}
      </v-breadcrumbs-item>
    </template>
  </v-breadcrumbs>
</template>

<script lang="ts">
import { join } from 'path'
import { Component, Vue } from 'vue-property-decorator'
import { BreadCrumbs } from '~/epiphyllum/utils'

@Component
export default class BreadCrumbsNav extends Vue {
  private arrow = 'mdi-chevron-right'

  private get breadcrumbs(): BreadCrumbs {
    const path = this.$route.path
    const breadcrumbList: BreadCrumbs = []
    const pathClip = path.split('/')
    pathClip.shift()

    breadcrumbList.push({
      text: 'home',
      disabled: false,
      href: '/',
    })

    if (pathClip[0]) {
      pathClip.reduce((prev, val) => {
        const mergedVal = join(prev, val)

        breadcrumbList.push({
          text: val,
          disabled: false,
          href: mergedVal,
        })

        return mergedVal
      }, '/')
    }

    breadcrumbList[breadcrumbList.length - 1].disabled = true

    return breadcrumbList
  }
}
</script>
