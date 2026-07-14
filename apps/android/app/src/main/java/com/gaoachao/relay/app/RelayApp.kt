package com.gaoachao.relay.app

import androidx.activity.compose.BackHandler
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import com.gaoachao.relay.model.PanelScan
import com.gaoachao.relay.ui.GuidanceScreen
import com.gaoachao.relay.ui.HomeScreen
import com.gaoachao.relay.ui.ScannerScreen

private enum class RelayDestination {
    Home,
    Scanner,
    Guidance,
}

@Composable
fun RelayApp() {
    var destination by rememberSaveable { mutableStateOf(RelayDestination.Home) }
    var scan by remember { mutableStateOf(PanelScan.demo()) }

    BackHandler(enabled = destination != RelayDestination.Home) {
        destination = when (destination) {
            RelayDestination.Guidance -> RelayDestination.Scanner
            RelayDestination.Scanner -> RelayDestination.Home
            RelayDestination.Home -> RelayDestination.Home
        }
    }

    when (destination) {
        RelayDestination.Home -> HomeScreen(
            onScan = { destination = RelayDestination.Scanner },
        )
        RelayDestination.Scanner -> ScannerScreen(
            onBack = { destination = RelayDestination.Home },
            onUseScan = {
                scan = it
                destination = RelayDestination.Guidance
            },
        )
        RelayDestination.Guidance -> GuidanceScreen(
            scan = scan,
            onBack = { destination = RelayDestination.Scanner },
        )
    }
}
