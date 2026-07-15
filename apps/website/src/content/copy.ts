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
    task: {
      label: string
      title: string
      detail: string
    }
    variants: {
      lowVision: {
        stepLabel: string
        targetLabel: string
        targetNumber: string
        instruction: string
        detail: string
        action: string
        completed: string
        reset: string
      }
      oneHand: {
        handLabel: string
        leftHand: string
        rightHand: string
        stepLabel: string
        instruction: string
        detail: string
        action: string
        completed: string
        reset: string
      }
      quiet: {
        soundOff: string
        hapticsOn: string
        eyebrow: string
        instruction: string
        signals: [string, string, string]
        hapticLabel: string
        currentLabel: string
        nextLabel: string
        doneLabel: string
        detail: string
        action: string
        completed: string
        reset: string
      }
    }
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
        oneHand: '单手操作',
        quiet: '无声引导',
      },
      task: {
        label: '任务',
        title: '快速洗',
        detail: '23 分钟 · 冷水',
      },
      variants: {
        lowVision: {
          stepLabel: '第 1 / 3 步 · 23 分钟',
          targetLabel: '按键',
          targetNumber: '8',
          instruction: '按一下',
          detail: '跟随高亮光环；对准后振动两次。',
          action: '开始视觉引导',
          completed: '已确认 8 号按键',
          reset: '重新视觉引导',
        },
        oneHand: {
          handLabel: '选择操作手',
          leftHand: '左手',
          rightHand: '右手',
          stepLabel: '第 1 / 3 步',
          instruction: '将相机对准面板',
          detail: '操作始终位于拇指可及区域。',
          action: '定位 8 号按键',
          completed: '已找到 8 号按键',
          reset: '再次定位',
        },
        quiet: {
          soundOff: '声音关闭',
          hapticsOn: '振动开启',
          eyebrow: '视觉指引',
          instruction: '跟随视觉信号',
          signals: ['找到 8 号按键', '按一下', '相机确认'],
          hapticLabel: '振动节奏',
          currentLabel: '当前',
          nextLabel: '下一步',
          doneLabel: '完成',
          detail: '光环常亮表示已对准；双振表示已确认。',
          action: '开始无声引导',
          completed: '已通过画面与振动确认',
          reset: '重新无声引导',
        },
      },
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
        quiet: 'No audio',
      },
      task: {
        label: 'Task',
        title: 'Quick wash',
        detail: '23 minutes · Cold water',
      },
      variants: {
        lowVision: {
          stepLabel: 'STEP 1 / 3 · 23 MIN',
          targetLabel: 'BUTTON',
          targetNumber: '8',
          instruction: 'Press once',
          detail: 'Follow the bright ring. Two pulses when aligned.',
          action: 'Start visual guide',
          completed: 'Button 8 confirmed',
          reset: 'Replay visual guide',
        },
        oneHand: {
          handLabel: 'Choose operating hand',
          leftHand: 'Left',
          rightHand: 'Right',
          stepLabel: 'STEP 1 / 3',
          instruction: 'Point at the panel',
          detail: 'Controls stay within thumb reach.',
          action: 'Locate button 8',
          completed: 'Button 8 found',
          reset: 'Locate again',
        },
        quiet: {
          soundOff: 'Sound off',
          hapticsOn: 'Haptics on',
          eyebrow: 'Visual guide',
          instruction: 'Follow the signal',
          signals: ['Find button 8', 'Press once', 'Camera confirms'],
          hapticLabel: 'Haptic pattern',
          currentLabel: 'NOW',
          nextLabel: 'NEXT',
          doneLabel: 'DONE',
          detail: 'Solid ring = aligned. Double pulse = confirmed.',
          action: 'Start no-audio guide',
          completed: 'Confirmed on screen and by haptic',
          reset: 'Replay no-audio guide',
        },
      },
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
