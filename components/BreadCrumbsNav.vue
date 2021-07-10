<template>
  <div id="breadcrumbs-nav">
    <v-slide-group v-model="value">
      <v-breadcrumbs :items="breadcrumbs" large>
        <template #divider>
          <v-slide-item>
            <v-icon v-text="arrow"></v-icon>
          </v-slide-item>
        </template>
        <template #item="{ item }">
          <v-slide-item>
            <v-breadcrumbs-item
              :href="item.href"
              :disabled="item.disabled"
              @click.prevent="pushRouter(item.href)"
            >
              {{ item.text }}
            </v-breadcrumbs-item>
          </v-slide-item>
        </template>
      </v-breadcrumbs>
    </v-slide-group>
  </div>
</template>

<script lang="ts">
import { join } from 'path'
import { Component, Vue } from 'vue-property-decorator'
import { BreadCrumbs } from '~/epiphyllum/utils'

@Component
export default class BreadCrumbsNav extends Vue {
  private arrow = 'mdi-chevron-right'
  private value = 1

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

  private pushRouter(path: string): void {
    this.$router.push(path)
  }

  private mounted(): void {
    this.$router.afterEach((): void => {
      this.value = Math.floor(Math.random() * 10)
    })
  }
}
</script>
