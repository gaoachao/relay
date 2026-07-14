package com.gaoachao.relay.model

import java.util.UUID

data class PanelScan(
    val id: String = UUID.randomUUID().toString(),
    val recognizedControls: List<String>,
) {
    companion object {
        fun demo(): PanelScan = PanelScan(
            recognizedControls = listOf("Power", "30s", "Start", "Cancel"),
        )
    }
}
