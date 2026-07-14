export type Locale = 'zh' | 'en'
export type AccessMode = 'lowVision' | 'oneHand' | 'quiet'

export interface SiteCopy {
  skipLink: string
  brandDescriptor: string
  navigation: {
    experience: string
    approach: string
    technology: string
    languageLabel: string
    languageName: string
  }
  hero: {
    eyebrow: string
    title: string
    titleLabel: string
    lead: string
    primaryAction: string
    secondaryAction: string
    sourceLabel: string
    resultLabel: string
    productNote: string
  }
  demo: {
    title: string
    lead: string
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
  approach: {
    title: string
    lead: string
    steps: Array<{
      number: string
      title: string
      body: string
      detail: string
    }>
  }
  technology: {
    statement: string
    title: string
    lead: string
    layers: Array<{
      label: string
      title: string
      body: string
      meta: string
    }>
    platformNote: string
  }
  trust: {
    title: string
    lead: string
    principles: Array<{
      title: string
      body: string
    }>
  }
  closing: {
    title: string
    titleLabel: string
    body: string
    action: string
  }
  footer: {
    line: string
    disclaimer: string
    lynxDocs: string
    openUiDocs: string
  }
}

export const siteCopy = {
  zh: {
    skipLink: '跳到主要内容',
    brandDescriptor: '界面翻译器',
    navigation: {
      experience: '体验',
      approach: '如何工作',
      technology: '技术',
      languageLabel: '切换语言',
      languageName: 'EN',
    },
    hero: {
      eyebrow: 'OPENUI × LYNX × NATIVE',
      title: '为眼前的设备，\n生成更好用的界面。',
      titleLabel: '为眼前的设备，生成更好用的界面。',
      lead: '拍下眼前的设备面板。Relay 根据你的任务和辅助需求，现场生成一个更容易看、听、触摸和完成的操作界面。',
      primaryAction: '看看它如何工作',
      secondaryAction: '查看技术架构',
      sourceLabel: '复杂面板',
      resultLabel: '清晰操作',
      productNote: '为每个人、每台设备、每一次任务生成。',
    },
    demo: {
      title: '同一台机器，应该为每个人改变。',
      lead: '面板结构、当前任务与使用者的能力共同决定界面。试着切换辅助模式，看看同一个任务如何被重新表达。',
      panelLabel: '现实面板 · 扫描结果',
      panelDescription:
        '一块有 12 个相似圆形按键和 23 分钟显示屏的复杂面板；第 8 个按键已被识别为目标。',
      generatedLabel: 'Relay · 生成界面',
      modesLabel: '选择辅助模式',
      modes: {
        lowVision: '低视力',
        oneHand: '单手',
        quiet: '静音',
      },
      taskLabel: '当前任务',
      task: '快速洗',
      taskDetail: '预计 23 分钟 · 冷水',
      stepLabel: '第 1 步，共 3 步',
      stepTitle: '按下右侧蓝色按钮',
      stepDetail: 'Relay 会用触觉节奏提示按钮位置，并在你操作后通过相机确认状态。',
      action: '开始引导',
      completed: '这一步已确认',
      reset: '重新演示',
      disclosure: '这是交互原型。现实操作前，请确认设备本身的标签与状态。',
    },
    approach: {
      title: '从现实面板，到一次性的个人界面。',
      lead: 'Relay 不替用户猜测，也不把整套 App 交给模型。它把理解、确认和执行拆成三步。',
      steps: [
        {
          number: '01',
          title: '看懂设备',
          body: 'Native 相机获取面板结构、标签与按钮位置。识别结果保留边界框和置信度，而不是只返回一段描述。',
          detail: 'Vision / ML Kit · Camera · OCR',
        },
        {
          number: '02',
          title: '确认任务与需求',
          body: '用户确认“这是什么”和“我要做什么”，再选择大字、单手、语音、触觉或安静模式。低置信度信息必须先修正。',
          detail: 'Native Sheet · Access Profile · Consent',
        },
        {
          number: '03',
          title: '生成可执行界面',
          body: 'Agent 从受控 OpenUI 组件目录中组合任务界面，Lynx 跨端流式渲染；相机、触觉和系统确认仍由 Native 执行。',
          detail: 'Agent · OpenUI · ReactLynx · Native Modules',
        },
      ],
    },
    technology: {
      statement: '信任留给 Native。变化交给 GenUI。',
      title: '一套语义，两套原生体验。',
      lead: 'iOS 与 Android 共享任务状态、OpenUI 契约和 ReactLynx 内容面，但保留各自的导航、权限、相机和系统反馈。',
      layers: [
        {
          label: 'PLATFORM',
          title: 'iOS / Android Native Shell',
          body: '承载 Navigation、Camera、Permission、VoiceOver / TalkBack、Haptics 与不可逆操作确认。',
          meta: 'SwiftUI + UIKit · Kotlin + Jetpack',
        },
        {
          label: 'SURFACE',
          title: 'Lynx Generated Surface',
          body: '同一份 ReactLynx bundle 在两个原生容器中渲染。只共享需要动态生成的任务界面，不共享平台皮肤。',
          meta: 'LynxView · Shared state · Native Modules',
        },
        {
          label: 'CONTRACT',
          title: 'OpenUI Component Catalog',
          body: 'Agent 只能组合经过定义的语义组件、变量和动作；流式完成前保持交互禁用，工具参数由宿主再次校验。',
          meta: 'Typed components · Streaming · Tool provider',
        },
        {
          label: 'INTELLIGENCE',
          title: 'Relay Agent',
          body: '理解面板观察、任务和非诊断性的辅助偏好，返回累计 OpenUI 响应；模型密钥与工具鉴权始终留在服务端。',
          meta: 'Multimodal reasoning · SSE · Guardrails',
        },
      ],
      platformNote: '共享的是语义和能力边界，不是一套强行跨平台的视觉皮肤。',
    },
    trust: {
      title: '生成，但不越界。',
      lead: '当界面可能影响现实设备时，可解释、可确认、可取消比“更聪明”更重要。',
      principles: [
        {
          title: '组件受控',
          body: 'OpenUI 只能使用宿主注册的组件和动作，不能生成任意代码或拼接系统 API。',
        },
        {
          title: '不确定先确认',
          body: '始终展示识别目标和置信状态；低于阈值时不生成操作步骤。',
        },
        {
          title: '行动回到 Native',
          body: '权限、相机、触觉和关键确认由原生层执行，并保留取消、重试与撤销入口。',
        },
      ],
    },
    closing: {
      title: '让机器适应人，\n而不是让人记住机器。',
      titleLabel: '让机器适应人，而不是让人记住机器。',
      body: 'Relay 是一个面向 GenUI 黑客松的开源原型。我们正在用 iOS、Android、Lynx、OpenUI 与 Agent 构建第一条完整体验。',
      action: '阅读技术实现',
    },
    footer: {
      line: 'Relay · Interface Translator',
      disclaimer: '黑客松概念原型，不用于医疗诊断或无人监督的设备控制。',
      lynxDocs: 'Lynx 原生集成',
      openUiDocs: 'OpenUI 文档',
    },
  },
  en: {
    skipLink: 'Skip to main content',
    brandDescriptor: 'Interface Translator',
    navigation: {
      experience: 'Experience',
      approach: 'How it works',
      technology: 'Technology',
      languageLabel: 'Switch language',
      languageName: '中文',
    },
    hero: {
      eyebrow: 'OPENUI × LYNX × NATIVE',
      title: 'A better interface for\nwhat’s in front of you.',
      titleLabel: 'A better interface for what’s in front of you.',
      lead: 'Point your camera at a physical control panel. Relay generates an interface that is easier for you to see, hear, touch, and complete—right when you need it.',
      primaryAction: 'See how it works',
      secondaryAction: 'Explore the architecture',
      sourceLabel: 'Complex panel',
      resultLabel: 'Clear action',
      productNote: 'Generated for one person, one device, and one task.',
    },
    demo: {
      title: 'The same machine should change for each person.',
      lead: 'Panel structure, the task at hand, and a person’s access needs all shape the interface. Switch modes to see one task expressed in different ways.',
      panelLabel: 'Physical panel · scan result',
      panelDescription:
        'A complex panel with 12 similar round controls and a 23-minute display. Control 8 is identified as the target.',
      generatedLabel: 'Relay · generated interface',
      modesLabel: 'Choose an access mode',
      modes: {
        lowVision: 'Low vision',
        oneHand: 'One hand',
        quiet: 'Quiet',
      },
      taskLabel: 'Current task',
      task: 'Quick wash',
      taskDetail: 'About 23 minutes · Cold water',
      stepLabel: 'Step 1 of 3',
      stepTitle: 'Press the blue button on the right',
      stepDetail:
        'Relay uses a haptic rhythm to guide your hand, then checks the device state through the camera.',
      action: 'Start guidance',
      completed: 'Step confirmed',
      reset: 'Replay demo',
      disclosure:
        'Interactive prototype. Confirm the labels and state on the physical device before acting.',
    },
    approach: {
      title: 'From a physical panel to a personal, one-time interface.',
      lead: 'Relay does not guess on the user’s behalf or hand an entire app to a model. It separates understanding, confirmation, and action.',
      steps: [
        {
          number: '01',
          title: 'Understand the device',
          body: 'The native camera captures panel structure, labels, and control positions. Observations retain bounding boxes and confidence—not just a prose description.',
          detail: 'Vision / ML Kit · Camera · OCR',
        },
        {
          number: '02',
          title: 'Confirm the task and needs',
          body: 'The user confirms what the device is, what they want to do, and whether they need larger text, one-handed use, voice, haptics, or quiet guidance.',
          detail: 'Native Sheet · Access Profile · Consent',
        },
        {
          number: '03',
          title: 'Generate an actionable UI',
          body: 'The Agent composes from a controlled OpenUI catalog and Lynx streams it across platforms. Camera, haptics, and system confirmation remain native.',
          detail: 'Agent · OpenUI · ReactLynx · Native Modules',
        },
      ],
    },
    technology: {
      statement: 'Trust stays native. Change belongs to GenUI.',
      title: 'One semantic contract. Two native experiences.',
      lead: 'iOS and Android share task state, the OpenUI contract, and the ReactLynx surface—while keeping their own navigation, permissions, camera, and system feedback.',
      layers: [
        {
          label: 'PLATFORM',
          title: 'iOS / Android Native Shell',
          body: 'Owns navigation, camera, permission, VoiceOver / TalkBack, haptics, and confirmation for consequential actions.',
          meta: 'SwiftUI + UIKit · Kotlin + Jetpack',
        },
        {
          label: 'SURFACE',
          title: 'Lynx Generated Surface',
          body: 'The same ReactLynx bundle renders inside both native containers. It shares the generated task surface—not a forced cross-platform skin.',
          meta: 'LynxView · Shared state · Native Modules',
        },
        {
          label: 'CONTRACT',
          title: 'OpenUI Component Catalog',
          body: 'The Agent can compose only registered semantic components, variables, and actions. Interaction stays disabled until streaming completes.',
          meta: 'Typed components · Streaming · Tool provider',
        },
        {
          label: 'INTELLIGENCE',
          title: 'Relay Agent',
          body: 'Interprets panel observations, the task, and non-diagnostic access preferences, then returns a cumulative OpenUI response from the server.',
          meta: 'Multimodal reasoning · SSE · Guardrails',
        },
      ],
      platformNote:
        'We share semantics and capability boundaries—not one visual skin forced onto every platform.',
    },
    trust: {
      title: 'Generated, never unbounded.',
      lead: 'When an interface can affect a physical device, explainability, confirmation, and cancellation matter more than appearing “smart.”',
      principles: [
        {
          title: 'Controlled components',
          body: 'OpenUI can use only components and actions registered by the host. It cannot generate arbitrary code or assemble system API calls.',
        },
        {
          title: 'Uncertainty is confirmed',
          body: 'The recognized target and confidence state remain visible. Below the threshold, Relay does not generate action steps.',
        },
        {
          title: 'Actions return to native',
          body: 'Permissions, camera, haptics, and key confirmations run in the native layer, with cancel, retry, and undo paths.',
        },
      ],
    },
    closing: {
      title: 'Let machines adapt to people—\nnot the other way around.',
      titleLabel: 'Let machines adapt to people—not the other way around.',
      body: 'Relay is an open-source GenUI hackathon prototype. We are building its first end-to-end experience with iOS, Android, Lynx, OpenUI, and an Agent.',
      action: 'Read the implementation',
    },
    footer: {
      line: 'Relay · Interface Translator',
      disclaimer:
        'Hackathon concept prototype. Not for medical diagnosis or unsupervised device control.',
      lynxDocs: 'Lynx native integration',
      openUiDocs: 'OpenUI documentation',
    },
  },
} satisfies Record<Locale, SiteCopy>
