/**
 * iframe 子窗口通信服务
 */
export class IframeService {
  private api: any = null
  private messageHandler: ((event: MessageEvent) => void) | null = null

  /**
   * 初始化 iframe 通信
   */
  init(api: any) {
    this.api = api
    this.messageHandler = this.handleMessage.bind(this)
    window.addEventListener('message', this.messageHandler)

    // 通知父窗口 API 已准备就绪
    this.notifyReady()
  }

  /**
   * 销毁通信服务
   */
  destroy() {
    if (this.messageHandler) {
      window.removeEventListener('message', this.messageHandler)
      this.messageHandler = null
    }
    this.api = null
  }

  /**
   * 处理来自父窗口的消息
   */
  private async handleMessage(event: MessageEvent) {
    const { type, method, params, id } = event.data

    try {
      let result
      switch (type) {
        case 'api-call':
          if (this.api && this.api[method]) {
            result = await this.api[method](...(params || []))
          }
          break
        case 'get-status':
          result = {
            ready: !!this.api,
            methods: this.api ? Object.keys(this.api) : []
          }
          break
      }

      this.sendResponse(id, result, true)
    } catch (error: any) {
      this.sendResponse(id, null, false, error.message)
    }
  }

  /**
   * 发送响应给父窗口
   */
  private sendResponse(
    id: string,
    result: any,
    success: boolean,
    error?: string
  ) {
    if (window.parent !== window && id) {
      window.parent.postMessage(
        {
          type: 'api-response',
          id,
          result,
          success,
          error
        },
        '*'
      )
    }
  }

  /**
   * 通知父窗口 API 已准备就绪
   */
  private notifyReady() {
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: 'comfy-api-ready',
          api: this.api ? Object.keys(this.api) : []
        },
        '*'
      )
    }
  }

  /**
   * 发送事件通知给父窗口
   */
  notify(type: string, data: any) {
    if (window.parent !== window) {
      window.parent.postMessage({ type, data }, '*')
    }
  }
}

export const iframeService = new IframeService()
