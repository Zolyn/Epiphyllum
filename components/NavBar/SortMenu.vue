<template>
  <div id="sort-menu">
    <v-menu
      transition="slide-y-transition"
      :close-on-content-click="closeOnContentClick"
      @input="handleInput"
    >
      <template #activator="{ on: menu, attrs }">
        <v-tooltip top>
          <template #activator="{ on: tooltip }">
            <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
              <v-icon dense v-text="`mdi-${currentMenuIcon}`"></v-icon>
            </v-btn>
          </template>
          <template #default>
            <span>{{ currentToolTip }}</span>
          </template>
        </v-tooltip>
      </template>
      <v-list dense nav>
        <v-list-group
          v-for="(group, index) in listGroups"
          :key="`group-${index}`"
          :value="listGroupStatus"
          :prepend-icon="`mdi-${group.prependIcon}`"
          @click="handleGroupClick"
        >
          <template #activator>
            <v-list-item-title v-text="group.title"></v-list-item-title>
          </template>
          <template #default>
            <v-list-item
              v-for="(item, itemIndex) in group.items"
              :key="`groupItem-${itemIndex}`"
              @click="handleGroupItemClick(item)"
            >
              <v-list-item-icon>
                <v-icon v-text="`mdi-${item.icon}`"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
        </v-list-group>
        <v-list-item @click="fallback">
          <v-list-item-icon>
            <v-icon>mdi-sort</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>默认</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Group, GroupItem } from '~/epiphyllum/utils'

@Component
export default class SortMenu extends Vue {
  private closeOnContentClick = false
  private listGroupStatus: boolean | undefined = false
  private listGroups: Group[] = [
    {
      prependIcon: 'sort-alphabetical-variant',
      title: '名称',
      items: [
        {
          title: 'A-Z',
          mode: 'name-asc',
          icon: 'sort-alphabetical-ascending-variant',
        },
        {
          title: 'Z-A',
          mode: 'name-desc',
          icon: 'sort-alphabetical-descending-variant',
        },
      ],
    },
    {
      prependIcon: 'clock',
      title: '时间',
      items: [
        {
          title: '最旧',
          mode: 'time-asc',
          icon: 'sort-clock-ascending',
        },
        {
          title: '最新',
          mode: 'time-desc',
          icon: 'sort-clock-descending',
        },
      ],
    },
    {
      title: '大小',
      prependIcon: 'database',
      items: [
        {
          title: '最小',
          mode: 'size-asc',
          icon: 'sort-ascending',
        },
        {
          title: '最大',
          mode: 'size-desc',
          icon: 'sort-descending',
        },
      ],
    },
  ]

  private currentMenuIcon = 'sort'
  private currentToolTip = '排序-默认'

  private handleGroupItemClick(item: GroupItem): void {
    this.closeOnContentClick = true
    this.$store.commit('epiphyllum/changeSortMode', item.mode)
    this.currentMenuIcon = item.icon
    this.currentToolTip = `排序-${item.title}`
  }

  private handleGroupClick(): void {
    this.closeOnContentClick = false
  }

  private handleInput(bool: boolean): void {
    if (bool) {
      this.listGroupStatus = undefined
    } else {
      this.listGroupStatus = bool
    }
  }

  private fallback(): void {
    this.closeOnContentClick = true
    this.$store.commit('epiphyllum/changeSortMode', 'normal')
    this.currentMenuIcon = 'sort'
    this.currentToolTip = '排序-默认'
  }
}
</script>
