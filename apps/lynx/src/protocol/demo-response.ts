import type { RelayLocale } from '../domain/init-data.js'

const responses: Record<RelayLocale, string> = {
  en: `root = Stack([modeBar, content, gate])
content = Stack([step, panel, choice, confidence])
modeBar = AccessModeBar(["Standard", "Voice cues"])
step = GuidedStep(1, "Find the time key", "Look for the rounded key marked 30s.", "active")
panel = PanelMap("Scanned control panel", ["time-30s"])
choice = ControlChoice("time-30s", "30 second key", "Center column, rounded edge", true)
confidence = ConfidenceNotice("Confirm the highlighted target before acting", 0.82)
gate = VerifyGate("You stay in control", "Check the real device before every physical action.", action)
action = PrimaryAction("Start camera verification", "verify_target")`,
  'zh-Hans': `root = Stack([modeBar, content, gate])
content = Stack([step, panel, choice, confidence])
modeBar = AccessModeBar(["标准", "语音提示"])
step = GuidedStep(1, "找到时间键", "找到标有 30s 的圆角按键。", "active")
panel = PanelMap("已扫描的控制面板", ["time-30s"])
choice = ControlChoice("time-30s", "30 秒键", "位于中间一列，边缘圆润", true)
confidence = ConfidenceNotice("请在执行前确认高亮位置", 0.82)
gate = VerifyGate("操作由你决定", "每一步都请以设备的实际状态为准。", action)
action = PrimaryAction("开始相机验证", "verify_target")`,
}

export function getDemoResponse(locale: RelayLocale): string {
  return responses[locale]
}
