<template>
  <v-menu
    open-on-hover
    transition="scale-transition"
    :close-delay="closeDelay"
    :close-on-content-click="closeOnContentClick"
    @input="handleInput"
  >
    <template #activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon dense v-text="`mdi-${sortStatus.icon}`"></v-icon>
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
          <v-list-item-title v-text="group.title"></v-list-item-title>
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
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Group, SortStatus } from '~/epiphyllum/utils'

@Component
export default class SortMenu extends Vue {
  private closeDelay = 100
  private closeOnContentClick = false
  private listGroupStatus: boolean | undefined = false
  private listGroups: Group[] = [
    {
      prependIcon: 'mdi-calendar',
      title: 'Sort by time',
      items: [
        {
          title: 'Ascending',
          mode: 'time-asc',
          icon: 'mdi-sort-calendar-ascending',
        },
        {
          title: 'Descending',
          mode: 'time-desc',
          icon: 'mdi-sort-calendar-descending',
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

  private sortStatus: SortStatus = {
    mode: 'normal',
    icon: 'sort',
  }

  private handleGroupItemClick() {
    this.closeOnContentClick = true
  }

  private handleGroupClick() {
    this.closeOnContentClick = false
  }

  private handleInput(bool: boolean) {
    if (bool) {
      this.listGroupStatus = undefined
    } else {
      this.listGroupStatus = bool
    }
  }
}
</script>
