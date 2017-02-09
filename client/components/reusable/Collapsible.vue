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
    background: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAADCAYAAABS3WWCAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBNYWNpbnRvc2giIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NEQ5RDgxQzc2RjQ5MTFFMjhEMUNENzFGRUMwRjhBRTciIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NEQ5RDgxQzg2RjQ5MTFFMjhEMUNENzFGRUMwRjhBRTciPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo0RDlEODFDNTZGNDkxMUUyOEQxQ0Q3MUZFQzBGOEFFNyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo0RDlEODFDNjZGNDkxMUUyOEQxQ0Q3MUZFQzBGOEFFNyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PvXFWFAAAAAYSURBVHjaYvj//z8D0/Pnz/8zgFgAAQYAS5UJscReGMIAAAAASUVORK5CYII=") repeat-x scroll 0 10px;
    margin-bottom: 10px;
  }

  .collapsible-header-text {
    background: white;
    padding-right: 5px;
    cursor: pointer;
  }

  .collapsible-title {
    vertical-align: middle;
    color: #333;
    font-weight: 700;
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
