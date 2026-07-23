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
    titlePrimary: string
    titleSecondary: string
    titleLabel: string
    lead: string
    action: string
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
    skipLink: '跳到正文',
    brandDescriptor: '设备界面助手',
    navigation: {
      demo: '体验',
      stack: '工作方式',
      github: 'GitHub',
      languageLabel: '切换到英文',
      languageName: 'EN',
    },
    hero: {
      titlePrimary: '设备再陌生，',
      titleSecondary: '也能轻松上手。',
      titleLabel: '设备再陌生，也能轻松上手。',
      lead: '对准设备，说出要做什么。Relay 会把陌生面板变成清楚、顺手的操作界面。',
      action: '看看实际效果',
      flow: '识别设备 → 理解目标 → 生成界面',
    },
    demo: {
      title: '同一台设备，换种方式操作',
      panelLabel: '原设备',
      panelDescription: '一块带有 12 个圆形按键和 23 分钟显示屏的面板，其中 8 号键已高亮。',
      generatedLabel: 'Relay 生成的界面',
      modesLabel: '选择操作方式',
      modes: {
        lowVision: '大字高对比',
        oneHand: '单手操作',
        quiet: '无声引导',
      },
      task: {
        label: '当前任务',
        title: '快速洗',
        detail: '23 分钟 · 冷水',
      },
      variants: {
        lowVision: {
          stepLabel: '第 1 步，共 3 步 · 23 分钟',
          targetLabel: '按键',
          targetNumber: '8',
          instruction: '按一下',
          detail: '跟着亮环找到 8 号键。对准后会振动两次。',
          action: '开始引导',
          completed: '已确认 8 号键',
          reset: '再来一次',
        },
        oneHand: {
          handLabel: '你习惯用哪只手？',
          leftHand: '左手',
          rightHand: '右手',
          stepLabel: '第 1 步，共 3 步',
          instruction: '把镜头对准面板',
          detail: '按钮会放在拇指够得到的位置。',
          action: '帮我找 8 号键',
          completed: '已找到 8 号键',
          reset: '再找一次',
        },
        quiet: {
          soundOff: '已静音',
          hapticsOn: '振动已开启',
          eyebrow: '无声引导',
          instruction: '跟着屏幕提示操作',
          signals: ['找到 8 号键', '按一下', '确认完成'],
          hapticLabel: '振动提示',
          currentLabel: '当前',
          nextLabel: '下一步',
          doneLabel: '完成',
          detail: '亮环常亮说明已对准。振动两次说明已确认。',
          action: '开始无声引导',
          completed: '已通过画面和振动确认',
          reset: '再来一次',
        },
      },
      disclosure: '交互演示 · 实际操作前请确认设备状态',
    },
    technology: {
      title: '生成，但不越界。',
      layers: [
        { title: 'Agent', meta: '视觉识别 · SSE · 安全校验' },
        { title: 'OpenUI', meta: '受控组件库' },
        { title: 'Lynx', meta: 'ReactLynx 运行时' },
        { title: 'Native', meta: 'iOS · Android' },
      ],
      safety: '关键操作始终交给原生端确认。',
    },
    footer: {
      line: '设备不变，界面为你而变。',
    },
  },
  en: {
    skipLink: 'Skip to main content',
    brandDescriptor: 'Interface Translator',
    navigation: {
      demo: 'Live demo',
      stack: 'How it works',
      github: 'GitHub',
      languageLabel: 'Switch language',
      languageName: '中文',
    },
    hero: {
      titlePrimary: 'Every machine,',
      titleSecondary: 'made for you.',
      titleLabel: 'Every machine, made for you.',
      lead: 'Point the camera. Say what you need. Relay turns an unfamiliar control panel into a clear, accessible interface.',
      action: 'See it adapt',
      flow: 'Camera → intent → one clear action',
    },
    demo: {
      title: 'The interface is adapting',
      panelLabel: 'What Relay sees',
      panelDescription:
        'A panel with 12 round controls and a 23-minute display. Control 8 is highlighted.',
      generatedLabel: 'What you get',
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
      disclosure: 'Interactive prototype · Confirm the device state before acting',
    },
    technology: {
      title: 'Adaptive by design. Bounded by default.',
      layers: [
        { title: 'Agent', meta: 'Vision · SSE · Guardrails' },
        { title: 'OpenUI', meta: 'Controlled component catalog' },
        { title: 'Lynx', meta: 'ReactLynx runtime' },
        { title: 'Native', meta: 'iOS · Android' },
      ],
      safety: 'Relay changes how you operate a device, never its safety boundary.',
    },
    footer: {
      line: 'A better interface for what is in front of you.',
    },
  },
} satisfies Record<Locale, SiteCopy>
