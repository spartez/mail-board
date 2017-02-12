<template>
  <div class="collapsible-outer-wrapper">
    <div class="collapsible-header unselectable">
            <span class="collapsible-header-text" @click="isCollapsed = !isCollapsed">
                <span v-if="isCollapsed" class="aui-icon aui-icon-small aui-iconfont-collapsed collapsible-icon"></span>
                <span v-else
                      class="aui-icon aui-icon-small aui-iconfont-expanded collapsible-icon collapsible-icon-expanded"></span>
                <span class="collapsible-title">{{ title }}</span>
            </span>
    </div>
    <div v-show="!isCollapsed" class="collapsible-content">
      <slot></slot>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data: () => ({
        isCollapsed: false
    }),
    props: {
      title: {
        'type': String,
        'default': "Expand / collapse"
      }
    }
  }
</script>

<style scoped>
  .collapsible-outer-wrapper {
    margin: 20px 0;
  }

  .collapsible-header {
    margin-bottom: 10px;
  }

  .collapsible-header-text {
    background: rgb(247, 247, 247);;
    padding-right: 5px;
    cursor: pointer;
  }

  .collapsible-title {
    vertical-align: middle;
    color: #8c8c8c;
  }

  .collapsible-content {
    margin-left: 20px;
  }

  .collapsible-icon {

    position: relative;
    left: 2px;
  }

  .collapsible-icon:before {
    font-size: 20px;
    font-weight: bold;
    color: #777;
  }

  .collapsible-icon-expanded {
    visibility: hidden;
  }

  .collapsible-header-text:hover .collapsible-icon-expanded {
    visibility: visible;
  }
</style>
