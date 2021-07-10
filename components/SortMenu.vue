<template>
  <div id="sort-menu">
    <v-menu
      transition="slide-y-transition"
      close-delay="100"
      :close-on-content-click="closeOnContentClick"
      open-on-hover
      open-delay="200"
      @input="handleInput"
    >
      <template #activator="{ on, attrs }">
        <v-btn icon v-bind="attrs" v-on="on">
          <v-icon dense v-text="currentMenuIcon"></v-icon>
        </v-btn>
      </template>
      <v-list dense nav>
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
      prependIcon: 'mdi-clock',
      title: '修改时间',
      items: [
        {
          title: '升序',
          mode: 'time-asc',
          icon: 'mdi-sort-clock-ascending',
        },
        {
          title: '降序',
          mode: 'time-desc',
          icon: 'mdi-sort-clock-descending',
        },
      ],
    },
    {
      title: '大小',
      prependIcon: 'mdi-database',
      items: [
        {
          title: '升序',
          mode: 'size-asc',
          icon: 'mdi-sort-ascending',
        },
        {
          title: '降序',
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
