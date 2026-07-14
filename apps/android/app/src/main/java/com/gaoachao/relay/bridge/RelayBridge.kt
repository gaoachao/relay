package com.gaoachao.relay.bridge

import android.app.Activity
import android.app.AlertDialog
import android.content.Context
import android.content.ContextWrapper
import android.os.Handler
import android.os.Looper
import android.view.HapticFeedbackConstants
import android.view.accessibility.AccessibilityEvent
import android.view.accessibility.AccessibilityManager
import com.lynx.jsbridge.LynxMethod
import com.lynx.jsbridge.LynxModule
import com.lynx.react.bridge.Callback
import com.lynx.tasm.behavior.LynxContext
import java.util.concurrent.atomic.AtomicBoolean

class RelayBridge(context: Context) : LynxModule(context) {
    @LynxMethod
    @Suppress("DEPRECATION")
    fun announce(message: String) {
        val hostContext = hostContext()
        Handler(Looper.getMainLooper()).post {
            val manager = hostContext.getSystemService(AccessibilityManager::class.java)
            if (!manager.isEnabled) return@post

            val event = AccessibilityEvent.obtain(AccessibilityEvent.TYPE_ANNOUNCEMENT).apply {
                className = RelayBridge::class.java.name
                packageName = hostContext.packageName
                text.add(message.compact())
            }
            manager.sendAccessibilityEvent(event)
        }
    }

    @LynxMethod
    fun requestHaptic(kind: String) {
        val activity = hostActivity() ?: return
        Handler(Looper.getMainLooper()).post {
            val feedback = when (kind) {
                "success" -> HapticFeedbackConstants.CONTEXT_CLICK
                "warning" -> HapticFeedbackConstants.LONG_PRESS
                else -> HapticFeedbackConstants.VIRTUAL_KEY
            }
            activity.window.decorView.performHapticFeedback(feedback)
        }
    }

    @LynxMethod
    fun confirmGuidance(title: String, message: String, callback: Callback) {
        val activity = hostActivity()
        if (activity == null) {
            callback(false)
            return
        }

        Handler(Looper.getMainLooper()).post {
            val completed = AtomicBoolean(false)
            fun complete(confirmed: Boolean) {
                if (completed.compareAndSet(false, true)) callback(confirmed)
            }

            AlertDialog.Builder(activity)
                .setTitle(title.compact())
                .setMessage(message.compact())
                .setNegativeButton(android.R.string.cancel) { _, _ -> complete(false) }
                .setPositiveButton(android.R.string.ok) { _, _ -> complete(true) }
                .setOnCancelListener { complete(false) }
                .show()
        }
    }

    private fun hostContext(): Context =
        (mContext as? LynxContext)?.context ?: mContext

    private fun hostActivity(): Activity? = hostContext().findActivity()

    companion object {
        const val MODULE_NAME = "RelayBridge"
        private const val MAX_COPY_LENGTH = 240

        private fun String.compact(): String = trim().take(MAX_COPY_LENGTH)
    }
}

private tailrec fun Context.findActivity(): Activity? = when (this) {
    is Activity -> this
    is ContextWrapper -> baseContext.findActivity()
    else -> null
}
