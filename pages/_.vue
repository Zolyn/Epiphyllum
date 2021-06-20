<template>
  <div id="epiphyllum">
    <v-card elevation="10" rounded="lg" style="top: 2em">
      <v-row align="center" justify="center">
        <v-col cols="11">
          <v-list>
            <v-list-item>
              <v-breadcrumbs :items="breadcrumbs" large>
                <template #divider>
                  <v-icon v-text="icons.arrow"></v-icon>
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
              <v-spacer></v-spacer>
              <v-menu
                open-on-hover
                transition="scale-transition"
                :close-delay="closeDelay"
                :close-on-content-click="closeOnContentClick"
                @input="handleInput"
              >
                <template #activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon dense v-text="icons.sort"></v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-group
                    v-for="(group, index) in listGroups"
                    :key="'group' + index"
                    :value="listGroupStatus"
                    :prepend-icon="group.prependIcon"
                    @click="handleGroupClick"
                  >
                    <template #activator>
                      <v-list-item-title
                        v-text="group.title"
                      ></v-list-item-title>
                    </template>
                    <v-list-item
                      v-for="({ title, icon }, itemIndex) in group.items"
                      :key="'groupitem' + itemIndex"
                      link
                      @click="handleGroupItemClick"
                    >
                      <v-list-item-icon>
                        <v-icon v-text="icon"></v-icon>
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="title"></v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-group>
                </v-list>
              </v-menu>
            </v-list-item>
            <v-divider></v-divider>
          </v-list>
        </v-col>
        <v-col cols="11">
          <v-list>
            <v-list-item-group color="primary">
              <parent-directory></parent-directory>
              <file-list-item
                :list="currentFolderList"
                :icon="icons.folder"
              ></file-list-item>
              <file-list-item
                :list="currentFileList"
                :icon="icons.file"
              ></file-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script lang="ts">
import { join } from 'path'
import { Component } from 'vue-property-decorator'
import {
  BreadCrumbs,
  DirectoryMeta,
  FileMetaList,
  Group,
} from '~/epiphyllum/utils'
import FileListItem from '~/components/FileListItem.vue'
import ParentDirectory from '~/components/ParentDirectory.vue'
import EpiphyllumFetch from '~/epiphyllum/fetch'

@Component({
  components: {
    FileListItem,
    ParentDirectory,
  },
})
export default class FileIndexPage extends EpiphyllumFetch {
  private icons = {
    folder: 'mdi-folder',
    file: 'mdi-file-cloud',
    arrow: 'mdi-chevron-right',
    home: 'mdi-home',
    sort: 'mdi-sort',
  }

  private closeDelay = 300
  private closeOnContentClick = false
  private listGroupStatus = false
  private listGroups: Group[] = [
    {
      prependIcon: 'mdi-calendar',
      title: 'Time',
      items: [
        {
          title: 'Ascending',
          icon: 'mdi-sort-calendar-ascending',
        },
        {
          title: 'Descending',
          icon: 'mdi-sort-calendar-descending',
        },
      ],
    },
    {
      title: 'Size',
      prependIcon: 'mdi-database',
      items: [
        {
          title: 'Ascending',
          icon: 'mdi-sort-ascending',
        },
        {
          title: 'Descending',
          icon: 'mdi-sort-descending',
        },
      ],
    },
  ]

  private handleGroupItemClick() {
    this.closeOnContentClick = true
  }

  private handleGroupClick() {
    this.closeOnContentClick = false
  }

  private handleInput(bool: boolean) {
    this.listGroupStatus = !bool
  }

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

  private get currentDirMeta(): DirectoryMeta | undefined {
    return this.directoryMap.get(this.$route.path)
  }

  private get currentFolderList(): FileMetaList | undefined {
    return this.currentDirMeta?.files?.filter((val) => val.isDir)
  }

  private get currentFileList(): FileMetaList | undefined {
    return this.currentDirMeta?.files?.filter((val) => !val.isDir)
  }
}
</script>
