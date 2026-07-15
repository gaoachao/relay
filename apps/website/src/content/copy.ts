export type Locale = 'zh' | 'en'
export type AccessMode = 'lowVision' | 'oneHand' | 'quiet'

export interface SiteCopy {
  skipLink: string
  brandDescriptor: string
  navigation: {
    demo: string
    stack: string
    github: string
    languageLabel: string
    languageName: string
  }
  hero: {
    title: string
    titleLabel: string
    lead: string
    flow: string
  }
  demo: {
    title: string
    panelLabel: string
    panelDescription: string
    generatedLabel: string
    modesLabel: string
    modes: Record<AccessMode, string>
    taskLabel: string
    task: string
    taskDetail: string
    stepLabel: string
    stepTitle: string
    stepDetail: string
    action: string
    completed: string
    reset: string
    disclosure: string
  }
  technology: {
    title: string
    layers: Array<{
      title: string
      meta: string
    }>
    safety: string
  }
  footer: {
    line: string
  }
}

export const siteCopy = {
  zh: {
    skipLink: '跳到主要内容',
    brandDescriptor: '界面翻译器',
    navigation: {
      demo: '演示',
      stack: '技术栈',
      github: 'GitHub',
      languageLabel: '切换语言',
      languageName: 'EN',
    },
    hero: {
      title: '让机器\n适应你。',
      titleLabel: '让机器适应你。',
      lead: '扫描设备，生成界面。',
      flow: 'Vision → OpenUI → Native',
    },
    demo: {
      title: '实时生成',
      panelLabel: '设备',
      panelDescription: '一块有 12 个圆形按键和 23 分钟显示屏的面板；第 8 个按键已高亮。',
      generatedLabel: 'OpenUI',
      modesLabel: '选择辅助模式',
      modes: {
        lowVision: '低视力',
        oneHand: '单手',
        quiet: '静音',
      },
      taskLabel: '任务',
      task: '快速洗',
      taskDetail: '23 分钟 · 冷水',
      stepLabel: '第 1 步，共 3 步',
      stepTitle: '按下右侧高亮按钮',
      stepDetail: '触觉指引位置，相机确认结果。',
      action: '开始引导',
      completed: '这一步已确认',
      reset: '重新演示',
      disclosure: '原型 · 操作前确认设备状态',
    },
    technology: {
      title: '生成有边界。',
      layers: [
        { title: 'Agent', meta: 'Vision · SSE · Guardrails' },
        { title: 'OpenUI', meta: '受控组件目录' },
        { title: 'Lynx', meta: 'ReactLynx runtime' },
        { title: 'Native', meta: 'iOS · Android' },
      ],
      safety: '关键操作始终回到 Native。',
    },
    footer: {
      line: 'Relay · Accessible GenUI',
    },
  },
  en: {
    skipLink: 'Skip to main content',
    brandDescriptor: 'Interface Translator',
    navigation: {
      demo: 'Demo',
      stack: 'Stack',
      github: 'GitHub',
      languageLabel: 'Switch language',
      languageName: '中文',
    },
    hero: {
      title: 'Machines,\nadapted.',
      titleLabel: 'Machines, adapted.',
      lead: 'Scan a device. Get the interface.',
      flow: 'Vision → OpenUI → Native',
    },
    demo: {
      title: 'Live interface relay',
      panelLabel: 'Physical panel',
      panelDescription:
        'A panel with 12 round controls and a 23-minute display. Control 8 is highlighted.',
      generatedLabel: 'OpenUI',
      modesLabel: 'Choose an access mode',
      modes: {
        lowVision: 'Low vision',
        oneHand: 'One hand',
        quiet: 'Quiet',
      },
      taskLabel: 'Task',
      task: 'Quick wash',
      taskDetail: '23 minutes · Cold water',
      stepLabel: 'Step 1 of 3',
      stepTitle: 'Press the highlighted button on the right',
      stepDetail: 'Haptics guide your hand. The camera confirms the result.',
      action: 'Start guidance',
      completed: 'Step confirmed',
      reset: 'Replay demo',
      disclosure: 'Prototype · Confirm the device state before acting',
    },
    technology: {
      title: 'Generated. Bounded.',
      layers: [
        { title: 'Agent', meta: 'Vision · SSE · Guardrails' },
        { title: 'OpenUI', meta: 'Controlled component catalog' },
        { title: 'Lynx', meta: 'ReactLynx runtime' },
        { title: 'Native', meta: 'iOS · Android' },
      ],
      safety: 'Critical actions always return to Native.',
    },
    footer: {
      line: 'Relay · Accessible GenUI',
    },
  },
} satisfies Record<Locale, SiteCopy>
