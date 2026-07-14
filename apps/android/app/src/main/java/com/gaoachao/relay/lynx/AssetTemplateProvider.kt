package com.gaoachao.relay.lynx

import android.content.Context
import com.lynx.tasm.provider.AbsTemplateProvider
import java.util.concurrent.Executors

class AssetTemplateProvider(context: Context) : AbsTemplateProvider() {
    private val appContext = context.applicationContext

    override fun loadTemplate(uri: String, callback: Callback) {
        ioExecutor.execute {
            val assetName = uri.substringAfterLast('/')
            if (assetName != RELAY_BUNDLE) {
                callback.onFailed("Unsupported embedded Lynx asset: $assetName")
                return@execute
            }

            runCatching {
                appContext.assets.open(assetName).use { it.readBytes() }
            }.onSuccess(callback::onSuccess)
                .onFailure { callback.onFailed(it.message ?: "Unable to read Lynx bundle") }
        }
    }

    private companion object {
        const val RELAY_BUNDLE = "main.lynx.bundle"
        val ioExecutor = Executors.newCachedThreadPool()
    }
}
