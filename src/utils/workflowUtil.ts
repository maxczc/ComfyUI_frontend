import type { ComfyWorkflowJSON } from '@/schemas/comfyWorkflowSchema'
import type { ComfyNodeDef } from '@/schemas/nodeDefSchema'

export interface NodeConfig {
  node_id: number
  node_name: string
  field_name: string
  field_type: string
  field_value: any
  description: string
  field_config: Record<string, any>
}

/**
 * Get workflow ID from URL query parameters
 * @returns The workflow ID as a number, or null if not found
 */
export const getWorkflowIdFromUrl = (): number | null => {
  const urlParams = new URLSearchParams(window.location.search)
  const workflowId = urlParams.get('workflowId')
  return workflowId ? parseInt(workflowId) : null
}

/**
 * Process field type and config for node inputs
 */
function processFieldTypeAndConfig(
  inputSpec: any,
  nodeName: string,
  fieldValue?: any
): {
  fieldType: string
  fieldConfig: any
  shouldSkip: boolean
} {
  const fieldType = inputSpec[0]
  const fieldConfig = inputSpec[1] || {}
  const supportedTypes = ['STRING', 'INT', 'FLOAT', 'BOOLEAN', 'LIST']
  const modelExtensions = ['.safetensors', '.pt', '.pth', '.bin']
  let finalFieldType = fieldType || 'STRING'
  let finalFieldConfig = fieldConfig
  let shouldSkip = false

  if (Array.isArray(fieldType)) {
    if (nodeName === 'LoadImage' || nodeName === 'LoadAudio') {
      finalFieldType = nodeName
      finalFieldConfig = fieldConfig
    } else {
      finalFieldType = 'LIST'
      finalFieldConfig = { ...fieldConfig, list: fieldType }
    }
    const hasModelExtensions = [...fieldType, fieldValue].some(
      (value) =>
        typeof value === 'string' &&
        modelExtensions.some((ext) => value.endsWith(ext))
    )

    if (hasModelExtensions) {
      shouldSkip = true
    }
  } else if (!supportedTypes.includes(finalFieldType)) {
    shouldSkip = true
  }

  return {
    fieldType: finalFieldType,
    fieldConfig: finalFieldConfig,
    shouldSkip
  }
}

/**
 * Generate node configs from workflow and object info
 */
export function generateNodeConfigs(
  workflow: ComfyWorkflowJSON,
  objectInfo: Record<string, ComfyNodeDef>
): NodeConfig[] {
  const configs: NodeConfig[] = []

  for (const node of workflow.nodes) {
    const nodeDef = objectInfo[node.type]
    if (!nodeDef || !nodeDef.input || !nodeDef.input_order) continue

    let widgetsValues: Record<string, any> = {}
    if (Array.isArray(node.widgets_values)) {
      const orderedWidgetNames = [
        ...(nodeDef.input_order.required || []),
        ...(nodeDef.input_order.optional || [])
      ]
      const unconnectedWidgetNames = orderedWidgetNames.filter((widgetName) => {
        const input = node.inputs?.find((input) => input.name === widgetName)
        return !input || input.link == null
      })

      unconnectedWidgetNames.forEach((widgetName, index) => {
        if (index < node.widgets_values!.length) {
          widgetsValues[widgetName] = (node.widgets_values as any[])[index]
        }
      })
    } else if (
      typeof node.widgets_values === 'object' &&
      node.widgets_values !== null
    ) {
      widgetsValues = node.widgets_values as Record<string, any>
    }
    Object.keys(widgetsValues).forEach((widgetName) => {
      const widgetValue = widgetsValues[widgetName]
      const inputSpec =
        nodeDef.input?.required?.[widgetName] ||
        nodeDef.input?.optional?.[widgetName]

      if (inputSpec) {
        const { fieldType, fieldConfig, shouldSkip } =
          processFieldTypeAndConfig(inputSpec, node.type, widgetValue)

        if (!shouldSkip) {
          const { tooltip, ...restFieldConfig } = fieldConfig || {}
          configs.push({
            node_id: typeof node.id === 'string' ? parseInt(node.id) : node.id,
            node_name: node.type,
            field_name: widgetName,
            field_type: fieldType,
            field_value: widgetValue,
            description: tooltip || '',
            field_config: restFieldConfig
          })
        }
      }
    })
  }

  return configs
}
