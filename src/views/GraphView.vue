<template>
  <div class="comfyui-body grid h-full w-full overflow-hidden">
    <!-- <div id="comfyui-body-top" class="comfyui-body-top">
      <TopMenubar v-if="showTopMenu" />
    </div> -->
    <div id="comfyui-body-bottom" class="comfyui-body-bottom">
      <TopMenubar v-if="showBottomMenu" />
    </div>
    <div id="comfyui-body-left" class="comfyui-body-left" />
    <div id="comfyui-body-right" class="comfyui-body-right" />
    <div id="graph-canvas-container" class="graph-canvas-container">
      <GraphCanvas @ready="onGraphReady" />
    </div>
  </div>

  <GlobalToast />
  <RerouteMigrationToast />
  <UnloadWindowConfirmDialog v-if="!isElectron()" />
  <MenuHamburger />
</template>

<script setup lang="ts">
import { useBreakpoints, useEventListener } from '@vueuse/core'
import type { ToastMessageOptions } from 'primevue/toast'
import { useToast } from 'primevue/usetoast'
import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  watch,
  watchEffect
} from 'vue'
import { useI18n } from 'vue-i18n'

import { runWhenGlobalIdle } from '@/base/common/async'
import MenuHamburger from '@/components/MenuHamburger.vue'
import UnloadWindowConfirmDialog from '@/components/dialog/UnloadWindowConfirmDialog.vue'
import GraphCanvas from '@/components/graph/GraphCanvas.vue'
import GlobalToast from '@/components/toast/GlobalToast.vue'
import RerouteMigrationToast from '@/components/toast/RerouteMigrationToast.vue'
import TopMenubar from '@/components/topbar/TopMenubar.vue'
import { useBrowserTabTitle } from '@/composables/useBrowserTabTitle'
import { useCoreCommands } from '@/composables/useCoreCommands'
import { useErrorHandling } from '@/composables/useErrorHandling'
import { useProgressFavicon } from '@/composables/useProgressFavicon'
import { SERVER_CONFIG_ITEMS } from '@/constants/serverConfig'
import { i18n } from '@/i18n'
import { useSettingStore } from '@/platform/settings/settingStore'
import { useFrontendVersionMismatchWarning } from '@/platform/updates/common/useFrontendVersionMismatchWarning'
import { useVersionCompatibilityStore } from '@/platform/updates/common/versionCompatibilityStore'
import { useWorkflowService } from '@/platform/workflow/core/services/workflowService'
import type { StatusWsMessageStatus } from '@/schemas/apiSchema'
import { api } from '@/scripts/api'
import { app } from '@/scripts/app'
import { blankGraph } from '@/scripts/defaultGraph'
import { setupAutoQueueHandler } from '@/services/autoQueueService'
import { iframeService } from '@/services/iframeService'
import { useKeybindingService } from '@/services/keybindingService'
import { useCommandStore } from '@/stores/commandStore'
import { useExecutionStore } from '@/stores/executionStore'
import { useMenuItemStore } from '@/stores/menuItemStore'
import { useModelStore } from '@/stores/modelStore'
import { useNodeDefStore, useNodeFrequencyStore } from '@/stores/nodeDefStore'
import {
  useQueuePendingTaskCountStore,
  useQueueStore
} from '@/stores/queueStore'
import { useServerConfigStore } from '@/stores/serverConfigStore'
import { useBottomPanelStore } from '@/stores/workspace/bottomPanelStore'
import { useColorPaletteStore } from '@/stores/workspace/colorPaletteStore'
import { useSidebarTabStore } from '@/stores/workspace/sidebarTabStore'
import { useWorkspaceStore } from '@/stores/workspaceStore'
import { electronAPI, isElectron } from '@/utils/envUtil'

setupAutoQueueHandler()
useProgressFavicon()
useBrowserTabTitle()

const { t } = useI18n()
const toast = useToast()
const settingStore = useSettingStore()
const executionStore = useExecutionStore()
const colorPaletteStore = useColorPaletteStore()
const queueStore = useQueueStore()
const versionCompatibilityStore = useVersionCompatibilityStore()

const breakpoints = useBreakpoints({ md: 961 })
const isMobile = breakpoints.smaller('md')
const showTopMenu = computed(() => isMobile.value || useNewMenu.value === 'Top')
const showBottomMenu = computed(
  () => !isMobile.value && useNewMenu.value === 'Bottom'
)

watch(
  () => colorPaletteStore.completedActivePalette,
  (newTheme) => {
    const DARK_THEME_CLASS = 'dark-theme'
    if (newTheme.light_theme) {
      document.body.classList.remove(DARK_THEME_CLASS)
    } else {
      document.body.classList.add(DARK_THEME_CLASS)
    }

    if (isElectron()) {
      electronAPI().changeTheme({
        color: 'rgba(0, 0, 0, 0)',
        symbolColor: newTheme.colors.comfy_base['input-text']
      })
    }
  },
  { immediate: true }
)

if (isElectron()) {
  watch(
    () => queueStore.tasks,
    (newTasks, oldTasks) => {
      // Report tasks that previously running but are now completed (i.e. in history)
      const oldRunningTaskIds = new Set(
        oldTasks.filter((task) => task.isRunning).map((task) => task.promptId)
      )
      newTasks
        .filter(
          (task) => oldRunningTaskIds.has(task.promptId) && task.isHistory
        )
        .forEach((task) => {
          electronAPI().Events.incrementUserProperty(
            `execution:${task.displayStatus.toLowerCase()}`,
            1
          )
          electronAPI().Events.trackEvent('execution', {
            status: task.displayStatus.toLowerCase()
          })
        })
    },
    { deep: true }
  )
}

watchEffect(() => {
  const fontSize = settingStore.get('Comfy.TextareaWidget.FontSize')
  document.documentElement.style.setProperty(
    '--comfy-textarea-font-size',
    `${fontSize}px`
  )
})

watchEffect(() => {
  const padding = settingStore.get('Comfy.TreeExplorer.ItemPadding')
  document.documentElement.style.setProperty(
    '--comfy-tree-explorer-item-padding',
    `${padding}px`
  )
})

watchEffect(() => {
  const locale = settingStore.get('Comfy.Locale')
  if (locale) {
    i18n.global.locale.value = locale as 'en' | 'zh' | 'ru' | 'ja'
  }
})

const useNewMenu = computed(() => {
  return settingStore.get('Comfy.UseNewMenu')
})
watchEffect(() => {
  if (useNewMenu.value === 'Disabled') {
    app.ui.menuContainer.style.setProperty('display', 'block')
    app.ui.restoreMenuPosition()
  } else {
    app.ui.menuContainer.style.setProperty('display', 'none')
  }
})

watchEffect(() => {
  queueStore.maxHistoryItems = settingStore.get('Comfy.Queue.MaxHistoryItems')
})

const init = () => {
  const coreCommands = useCoreCommands()
  useCommandStore().registerCommands(coreCommands)
  useMenuItemStore().registerCoreMenuCommands()
  useKeybindingService().registerCoreKeybindings()
  useSidebarTabStore().registerCoreSidebarTabs()
  useBottomPanelStore().registerCoreBottomPanelTabs()
  app.extensionManager = useWorkspaceStore()
}

// const queuePendingTaskCountStore = useQueuePendingTaskCountStore()
const onStatus = async (e: CustomEvent<StatusWsMessageStatus>) => {
  // queuePendingTaskCountStore.update(e)
  // await queueStore.update()
}

const onExecutionSuccess = async () => {
  await queueStore.update()
}

const reconnectingMessage: ToastMessageOptions = {
  severity: 'error',
  summary: t('g.reconnecting')
}

const onReconnecting = () => {
  if (!settingStore.get('Comfy.Toast.DisableReconnectingToast')) {
    toast.remove(reconnectingMessage)
    toast.add(reconnectingMessage)
  }
}

const onReconnected = () => {
  if (!settingStore.get('Comfy.Toast.DisableReconnectingToast')) {
    toast.remove(reconnectingMessage)
    toast.add({
      severity: 'success',
      summary: t('g.reconnected'),
      life: 2000
    })
  }
}

onMounted(() => {
  api.addEventListener('status', onStatus)
  api.addEventListener('execution_success', onExecutionSuccess)
  api.addEventListener('reconnecting', onReconnecting)
  api.addEventListener('reconnected', onReconnected)
  executionStore.bindExecutionEvents()

  try {
    init()
  } catch (e) {
    console.error('Failed to init ComfyUI frontend', e)
  }
})

onBeforeUnmount(() => {
  api.removeEventListener('status', onStatus)
  api.removeEventListener('execution_success', onExecutionSuccess)
  api.removeEventListener('reconnecting', onReconnecting)
  api.removeEventListener('reconnected', onReconnected)
  executionStore.unbindExecutionEvents()
  iframeService.destroy()
})

useEventListener(window, 'keydown', useKeybindingService().keybindHandler)

const { wrapWithErrorHandling, wrapWithErrorHandlingAsync } = useErrorHandling()

// Initialize version mismatch warning in setup context
// It will be triggered automatically when the store is ready
useFrontendVersionMismatchWarning({ immediate: true })

void nextTick(() => {
  versionCompatibilityStore.initialize().catch((error) => {
    console.warn('Version compatibility check failed:', error)
  })
})

const onGraphReady = () => {
  runWhenGlobalIdle(() => {
    // Setting values now available after comfyApp.setup.
    // Load keybindings.
    wrapWithErrorHandling(useKeybindingService().registerUserKeybindings)()

    // Load server config
    wrapWithErrorHandling(useServerConfigStore().loadServerConfig)(
      SERVER_CONFIG_ITEMS,
      settingStore.get('Comfy.Server.ServerConfigValues')
    )

    // Load model folders
    void wrapWithErrorHandlingAsync(useModelStore().loadModelFolders)()

    // Non-blocking load of node frequencies
    void wrapWithErrorHandlingAsync(
      useNodeFrequencyStore().loadNodeFrequencies
    )()

    // Node defs now available after comfyApp.setup.
    // Explicitly initialize nodeSearchService to avoid indexing delay when
    // node search is triggered
    useNodeDefStore().nodeSearchService.searchNode('')
  }, 1000)
  // 暴露对外API方法
  setupIframeAPI()
}
// iframe对外API方法
const setupIframeAPI = () => {
  let autoSaveEnabled = false
  let saveTimeout: any | null = null

  const autoSave = async () => {
    if (!autoSaveEnabled) return
    try {
      const p = await app.graphToPrompt()
      const workflowData = JSON.stringify(p.workflow, null, 2)
      // 通知父窗口自动保存
      iframeService.notify('auto-save', workflowData)
    } catch (error) {
      console.error('Auto save failed:', error)
    }
  }

  const scheduleAutoSave = () => {
    if (saveTimeout) clearTimeout(saveTimeout)
    saveTimeout = setTimeout(autoSave, 1000) // 1秒延迟保存
  }

  // 监听图形变化
  const setupAutoSaveListeners = () => {
    if (!app.graph) return

    // 监听节点变化
    app.graph.onNodeAdded = (node: any) => {
      console.log('nodeChange', 'nodeChange')
      scheduleAutoSave()
      iframeService.notify('node-added', { id: node.id, type: node.type })

      // 监听节点属性变化
      const originalOnPropertyChanged = node.onPropertyChanged
      node.onPropertyChanged = function (...args: any[]) {
        scheduleAutoSave()
        iframeService.notify('node-changed', {
          id: node.id,
          property: args[0],
          value: args[1]
        })
        return originalOnPropertyChanged?.apply(this, args)
      }
    }

    app.graph.onNodeRemoved = (node: any) => {
      scheduleAutoSave()
      iframeService.notify('node-removed', { id: node.id, type: node.type })
    }

    app.graph.onConnectionChange = (node: any) => {
      scheduleAutoSave()
      iframeService.notify('connection-changed', { nodeId: node?.id })
    }
  }

  const workflowService = useWorkflowService()

  const iframeAPI = {
    // 上传工作流 - 触发文件选择
    upload: () => {
      app.ui.loadFile()
    },

    // 导出工作流 - 使用workflowService导出
    export: async () => {
      await workflowService.exportWorkflow(`workflow_${Date.now()}`, 'workflow')
    },

    // 重置画布
    reset: () => {
      app.graph.clear()
      app.canvas.draw(true, true)
    },

    // 清空画布
    clear: () => {
      app.graph.clear()
      app.canvas.draw(true, true)
    },

    getWorkflowInfo: (): Promise<string> => {
      return useWorkflowService().getWorkflow()
    },

    // 运行工作流
    run: async () => {
      console.log('run', 'run')
      await app.queuePrompt(0, 1)
    },

    // 启用/禁用自动保存
    enableAutoSave: (enabled: boolean) => {
      autoSaveEnabled = enabled
      if (enabled) {
        setupAutoSaveListeners()
      }
    },

    // 加载工作流并刷新节点（不刷新页面）
    loadWorkflow: async (workflow: string | object) => {
      console.log('Loading workflow:', workflow)
      try {
        if (workflow) {
          const workflowData =
            typeof workflow === 'string' ? JSON.parse(workflow) : workflow
          app.graph.clear()
          await app.loadGraphData(workflowData)
        } else {
          app.graph.clear()
          await app.loadGraphData(blankGraph)
        }

        app.canvas.draw(true, true)
      } catch (error) {
        console.error('Failed to load workflow:', error)
        throw error
      }
    },

    // 获取工作流缩略图
    getThumbnail: async (): Promise<string> => {
      try {
        const canvas = app.canvas.canvas
        return canvas.toDataURL('image/png')
      } catch (error) {
        console.error('Failed to get thumbnail:', error)
        throw error
      }
    }
  }

  // 暴露到全局window对象
  ;(window as any).comfyAPI = iframeAPI

  // 初始化 iframe 服务
  iframeService.init(iframeAPI)
}
</script>

<style scoped>
.comfyui-body {
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
}

/**
  +------------------+------------------+------------------+
  |                                                        |
  |  .comfyui-body-                                        |
  |       top                                              |
  | (spans all cols)                                       |
  |                                                        |
  +------------------+------------------+------------------+
  |                  |                  |                  |
  | .comfyui-body-   |   #graph-canvas  | .comfyui-body-   |
  |      left        |                  |      right       |
  |                  |                  |                  |
  |                  |                  |                  |
  +------------------+------------------+------------------+
  |                                                        |
  |  .comfyui-body-                                        |
  |      bottom                                            |
  | (spans all cols)                                       |
  |                                                        |
  +------------------+------------------+------------------+
*/

.comfyui-body-top {
  order: -5;
  /* Span across all columns */
  grid-column: 1/-1;
  /* Position at the first row */
  grid-row: 1;
  /* Top menu bar dropdown needs to be above of graph canvas splitter overlay which is z-index: 999 */
  /* Top menu bar z-index needs to be higher than bottom menu bar z-index as by default
  pysssss's image feed is located at body-bottom, and it can overlap with the queue button, which
  is located in body-top. */
  z-index: 1001;
  display: flex;
  flex-direction: column;
}

.comfyui-body-left {
  order: -4;
  /* Position in the first column */
  grid-column: 1;
  /* Position below the top element */
  grid-row: 2;
  z-index: 10;
  display: flex;
}

.graph-canvas-container {
  width: 100%;
  height: 100%;
  order: -3;
  grid-column: 2;
  grid-row: 2;
  position: relative;
  overflow: clip;
}

.comfyui-body-right {
  order: -2;
  z-index: 10;
  grid-column: 3;
  grid-row: 2;
}

.comfyui-body-bottom {
  order: 4;
  /* Span across all columns */
  grid-column: 1/-1;
  grid-row: 3;
  /* Bottom menu bar dropdown needs to be above of graph canvas splitter overlay which is z-index: 999 */
  z-index: 1000;
  display: flex;
  flex-direction: column;
}
</style>
