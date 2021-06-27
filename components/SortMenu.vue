<template>
  <v-menu
    transition="scale-transition"
    :close-delay="closeDelay"
    :close-on-content-click="closeOnContentClick"
    @input="handleInput"
  >
    <template #activator="{ on: menu, attrs }">
      <v-tooltip top>
        <template #activator="{ on: tooltip }">
          <v-btn icon v-bind="attrs" v-on="{ ...tooltip, ...menu }">
            <v-icon dense v-text="currentMenuIcon"></v-icon>
          </v-btn>
        </template>
        Sort
      </v-tooltip>
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
          <v-list-item-title v-text="group.title"></v-list-item-title>
        </template>
        <v-list-item
          v-for="(item, itemIndex) in group.items"
          :key="'groupitem' + itemIndex"
          link
          @click="handleGroupItemClick(item)"
        >
          <v-list-item-icon>
            <v-icon v-text="item.icon"></v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title v-text="item.title"></v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
      <v-list-item @click="fallback">
        <v-list-item-icon>
          <v-icon>mdi-sort</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Normal</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Group, GroupItem } from '~/epiphyllum/utils'

@Component
export default class SortMenu extends Vue {
  private closeDelay = 100
  private closeOnContentClick = false
  private listGroupStatus: boolean | undefined = false
  private listGroups: Group[] = [
    {
      prependIcon: 'mdi-clock',
      title: 'Sort by time',
      items: [
        {
          title: 'Ascending',
          mode: 'time-asc',
          icon: 'mdi-sort-clock-ascending',
        },
        {
          title: 'Descending',
          mode: 'time-desc',
          icon: 'mdi-sort-clock-descending',
        },
      ],
    },
    {
      title: 'Sort by size',
      prependIcon: 'mdi-database',
      items: [
        {
          title: 'Ascending',
          mode: 'size-asc',
          icon: 'mdi-sort-ascending',
        },
        {
          title: 'Descending',
          mode: 'size-desc',
          icon: 'mdi-sort-descending',
        },
      ],
    },
  ]

  private currentMenuIcon = 'mdi-sort'

  private handleGroupItemClick(item: GroupItem): void {
    this.closeOnContentClick = true
    this.$store.commit('epiphyllum/changeSortMode', item.mode)
    this.currentMenuIcon = item.icon
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
    this.currentMenuIcon = 'mdi-sort'
  }
}
</script>
