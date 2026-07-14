package com.gaoachao.relay.lynx

import androidx.compose.runtime.Composable
import androidx.compose.runtime.remember
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalConfiguration
import androidx.compose.ui.viewinterop.AndroidView
import com.gaoachao.relay.model.PanelScan
import com.lynx.tasm.LynxLoadMeta
import com.lynx.tasm.LynxView
import com.lynx.tasm.LynxViewBuilder
import com.lynx.tasm.TemplateData

@Composable
fun RelayLynxView(
    scan: PanelScan,
    modifier: Modifier = Modifier,
) {
    val configuration = LocalConfiguration.current
    val locale = configuration.locales[0]
    val initialData = remember(scan.id, locale.language) {
        mapOf<String, Any>(
            "scanId" to scan.id,
            "recognizedControls" to scan.recognizedControls,
            "locale" to if (locale.language == "zh") "zh-Hans" else "en",
            "userMode" to "default",
            "isStreaming" to false,
        )
    }

    AndroidView(
        modifier = modifier,
        factory = { context ->
            LynxViewBuilder()
                .setTemplateProvider(AssetTemplateProvider(context))
                .build(context)
                .apply {
                    val meta = LynxLoadMeta.Builder().apply {
                        setUrl(BUNDLE_URL)
                        setInitialData(TemplateData.fromMap(initialData))
                    }.build()
                    loadTemplate(meta)
                }
        },
        onRelease = LynxView::destroy,
    )
}

private const val BUNDLE_URL = "main.lynx.bundle"
